import { useContext } from 'react';
import { DataContext, DataProps } from './Context';

function useDataContext(): DataProps {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("Componente fora do contexto do DataContext");
  }

  return context;
}

export default useDataContext;