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
  setSizeSelectValue: Dispatch<SetStateAction<number>>;
  setCompelmentsSelectValue: Dispatch<SetStateAction<number[]>>;
  setFruitsSelectValue: Dispatch<SetStateAction<number[]>>;

  setValueSelectInfo: Dispatch<SetStateAction<number[]>>;
  setDataSelectInfo: Dispatch<SetStateAction<string[]>>;

  sizeSelectValue: number;
  complementsSelectValue: number[];
  fruitsSelectValue: number[];
  dataSelectInfo: string[];
  valueSelectInfo: number[];

}

export const DataContext = createContext<DataContextProps | null>(null);

export function Context({ children }: DataContextProps) {
  const [pedidosData, setPedidosData] = useState<DataApi | null>(null);
  const [sizeSelectValue, setSizeSelectValue] = useState<number>(0);
  const [complementsSelectValue, setCompelmentsSelectValue] = useState<number[]>([]);
  const [fruitsSelectValue, setFruitsSelectValue] = useState<number[]>([]);
  
  const [dataSelectInfo, setDataSelectInfo] = useState<string[]>([])
  const [valueSelectInfo, setValueSelectInfo] = useState<number[]>([]);

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

  useEffect(() => {
    console.log("selected value", valueSelectInfo);
    // console.log("selected comple value", complementsSelectValue);
    // console.log("selected fruits value", fruitsSelectValue);
    console.log("DATA:", dataSelectInfo);
  }, [valueSelectInfo, dataSelectInfo]);

  return (
    <DataContext.Provider
      value={{
        pedidosData,
        children,
        setSizeSelectValue,
        sizeSelectValue,
        setCompelmentsSelectValue,
        complementsSelectValue,
        setFruitsSelectValue,
        fruitsSelectValue,
        setDataSelectInfo,
        dataSelectInfo,
        setValueSelectInfo,
        valueSelectInfo
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
