"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { fetch } from "../api/axios";
import { DataApiSchema } from "../api/schema";
import { timeDeliveryFunction } from "../utils/timeDelivery";

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

export interface DataProps {
  setValueSelectInfo: Dispatch<SetStateAction<number[]>>;
  setDataSelectInfo: Dispatch<SetStateAction<(string | number)[]>>;
  setTotalValue: Dispatch<SetStateAction<number>>;
  totalValue: number;
  dataSelectInfo: (string | number)[];
  valueSelectInfo: number[];
  setQuantityValue: Dispatch<SetStateAction<number>>;
  quantityValue: number;
  pedidosData: DataApi | null;
  activeTab: string;
  timeDeliveryValue?: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

export interface ContextProps {
  children: ReactNode;
}

export const DataContext = createContext<DataProps | undefined>(undefined);

export function DataContextProvider({ children }: ContextProps) {
  const [pedidosData, setPedidosData] = useState<DataApi | null>(null);
  const [dataSelectInfo, setDataSelectInfo] = useState<(string | number)[]>([]);
  const [valueSelectInfo, setValueSelectInfo] = useState<number[]>([]);
  const [timeDeliveryValue, setTimeDeliveryValue] = useState<string>('');
  const [totalValue, setTotalValue] = useState<number>(0);
  const [quantityValue, setQuantityValue] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("sizes");

  useEffect(() => {
    async function fetchPedidos() {
      try {
        const response = await fetch.get("/pedido");
        const data = response.data;
        console.log(data);
        const validatedDataApi = DataApiSchema.parse(data[0]);
        setPedidosData(validatedDataApi);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      }
    }
    fetchPedidos();
  }, []);

  useEffect(() => {
    function sumValues() {
      const sumValuesInfo = valueSelectInfo.reduce(
        (acc, currentValue) => acc + currentValue,
        0
      );
      const totalValueInfo = sumValuesInfo * quantityValue;
      setTotalValue(totalValueInfo);
    }
    // Chamando função para calcular o tempo de entrega e atualizar o estado base na quantidade de itens
    const calculatedTimeDelivery = timeDeliveryFunction(quantityValue);
    setTimeDeliveryValue(calculatedTimeDelivery)
    sumValues()
  }, [valueSelectInfo, quantityValue]);

  const contextValue: DataProps = {
    setValueSelectInfo,
    setDataSelectInfo,
    setTotalValue,
    totalValue,
    dataSelectInfo,
    valueSelectInfo,
    setQuantityValue,
    quantityValue,
    pedidosData,
    activeTab,
    setActiveTab,
    timeDeliveryValue,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
}
