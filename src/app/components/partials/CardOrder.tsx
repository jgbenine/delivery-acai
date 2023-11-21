'use client'
import {useState} from "react";
import styles from "../../styles/cardOrder.module.css";
import Image from "next/image";
import { useDataContext } from "@/app/data/hooks/useContext";

export function CardOrder() {
  const[ sizeSelect, setSizeSelect] = useState<string>()
  const { pedidosData } = useDataContext();
  console.log(pedidosData)

  function handleSize(event :React.ChangeEvent<HTMLSelectElement>){
    const valueSelect = event.target.value;
    setSizeSelect(valueSelect)
  }

  return (
    <div className={styles.card}>
      <div className={styles.content}>
      <Image src="/assets/produto.png" width={412} height={352} alt="Produto" />
      <article>
        <h2>Açaí Natural</h2>
        <div className={styles.avaliation}>
          <Image
            src="/assets/estrela.png"
            width={17}
            height={15}
            alt="estrela"
          />
          <span className={styles.avaliationInfo}>
            <p className={styles.avaliationValue}>4.5</p>
            <p className={styles.avaliationCount}>(30+)</p>
            <a href="">Ver Avaliações</a>
          </span>
        </div>
        <p className={styles.description}>
          Super Copo de 500 ml de Açaí Tradicional - Atenção: Contém somente
          açaí puro! Ideal para quem gosta de aproveitar um açaí puro ou rechear
          do seu jeito! Obs: não trocamos nem adicionamos itens a esse copo!
        </p>
        <div className={styles.selectionsIntro}>
          <span>
            <h4>Escolha o tamanho</h4>
            <p>Escolha pelo menos 1 opção.</p>
          </span>
          <p>1/3</p>
        </div>
        <form className={styles.selectionsForm}>
          <label htmlFor="small">
            <p> Pequeno - 300ml</p>
            <span>
              R$18
              <input type="radio" name="size" id="small" value={18} onChange={() => handleSize} />
            </span>
          </label>
          <label htmlFor="mid">
            <p>Médio - 500ml</p>
            <span>
              R$20
              <input type="radio" name="size" id="mid" value={20} onChange={()=> handleSize}/>
            </span>
          </label>
          <label htmlFor="big">
            <p> Grande - 700ml</p>
            <span>
              R$22
              <input type="radio" name="size" id="big" value={22} onChange={()=>handleSize} />
            </span>
          </label>
        </form>
      </article>
      </div>
      <div className={styles.actions}>
        <select name="" id="">
          <option value="1">1</option>
        </select>
        <button>Avança
          {sizeSelect ? <p>R${sizeSelect}</p> : ''}
        </button>
      </div>
    </div>
  );
}
