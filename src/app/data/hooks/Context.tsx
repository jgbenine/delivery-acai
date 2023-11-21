"use client";
import { ReactNode, useEffect, useState, createContext, useContext } from "react";
import { fetch } from "../api/axios";

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
}

export const DataContext = createContext<DataContextProps | null>(null);

export function Context({ children }: DataContextProps) {
  const [pedidosData, setPedidosData] = useState<DataApi | null>(null);

  useEffect(() => {
    async function fetchPedidos() {
      try {
        const response = await fetch.get("/pedido");
        const data = response.data;
        console.log(data[0])
        setPedidosData(data[0]);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    }
    fetchPedidos();
  }, []);

  return (
    <DataContext.Provider value={{ pedidosData, children }}>{children}</DataContext.Provider>
  );
}