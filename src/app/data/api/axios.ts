import axios from "axios"

export const fetch = axios.create({
  baseURL: 'https://655b690dab37729791a90f15.mockapi.io/peca_acai',
  headers:{
    accept: 'application/json',
  },
})