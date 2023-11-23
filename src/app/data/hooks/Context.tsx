"use client";
import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { fetch } from "../api/axios";
import { DataApiSchema } from "../api/schema";

interface DataApi {
  sizes: {
    options: string[];
    prices: number[];
  };
  fruits: {
    options: string[];
    prices: number[];
  };
  complements: {
    options: string[];
    prices: number[];
  };
  timeDelivery: number[];
  id: string;
}

interface DataContextProps {
  children: ReactNode;
  pedidosData?: DataApi | null;
  setValueSelectInfo: Dispatch<SetStateAction<number[]>>;
  setDataSelectInfo: Dispatch<SetStateAction<string[]>>;
  setTotalValue: Dispatch<SetStateAction<number>>;
  totalValue: number;
  dataSelectInfo: string[];
  valueSelectInfo: number[];
  setQuantityValue: Dispatch<SetStateAction<number>>;
  quantityValue: number;
}

export const DataContext = createContext<DataContextProps | null>(null);

export function Context({ children }: DataContextProps) {
  const [pedidosData, setPedidosData] = useState<DataApi | null>(null);
  const [dataSelectInfo, setDataSelectInfo] = useState<string[]>([]);
  const [valueSelectInfo, setValueSelectInfo] = useState<number[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [quantityValue, setQuantityValue] = useState<number>(1);

  useEffect(() => {
    async function fetchPedidos() {
      try {
        const response = await fetch.get("/pedido");
        const data = response.data;
        const validatedDataApi = DataApiSchema.parse(data[0]);
        setPedidosData(validatedDataApi);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      }
    }
    fetchPedidos();
  }, []);

  //UseEffect para realizar a soma dos valores sempre que os valores mudarem
  useEffect(() => {
    function sumValues() {
      // Soma dos valores
      const sumValuesInfo = valueSelectInfo.reduce((acc, currentValue) => acc + currentValue, 0);
      const totalValueInfo = sumValuesInfo * quantityValue;
      setTotalValue(totalValueInfo);
    }
    sumValues();
  }, [totalValue, valueSelectInfo, setTotalValue, quantityValue]);

  useEffect(() => {
    console.log("selected value", valueSelectInfo);
    console.log("DATA info:", dataSelectInfo);
  }, [valueSelectInfo, dataSelectInfo]);

  return (
    <DataContext.Provider
      value={{
        pedidosData,
        children,
        setDataSelectInfo,
        dataSelectInfo,
        setValueSelectInfo,
        valueSelectInfo,
        totalValue,
        setTotalValue,
        setQuantityValue,quantityValue
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
