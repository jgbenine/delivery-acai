import {DataContext} from './Context'
import {useContext} from 'react'

export function useDataContext() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext deve ser utilizado dentro de um provedor DataContext");
  }
  return context;
}