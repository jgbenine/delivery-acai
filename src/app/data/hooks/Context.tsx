"use client";
import { ReactNode, useEffect, useState, createContext, useContext } from "react";
import { fetch } from "../api/axios";

interface DataApi {
  size: string[];
  items: string[];
  prices: number[];
  deliveryTime: number[];
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
        setPedidosData(data);
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