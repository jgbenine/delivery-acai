"use client";
import { useState } from "react";
import styles from "../../styles/cardOrder.module.css";
import Image from "next/image";
import { useDataContext } from "@/app/data/hooks/useContext";

export function CardOrder() {
  const [sizeSelect, setSizeSelect] = useState<number>();
  const { pedidosData, setSizeValueOrder } = useDataContext();
  // const pedidosSize = pedidosData?sizes[0];

  function handleSize(event: React.ChangeEvent<HTMLInputElement>) {
    const valueSelect = event.target.value;
    const numericValue = parseFloat(valueSelect);
    console.log(numericValue)
    setSizeSelect(numericValue);
  }

  // function onSubmitSize() {}

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <Image
          src="/assets/produto.png"
          width={412}
          height={352}
          alt="Produto"
        />
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
            açaí puro! Ideal para quem gosta de aproveitar um açaí puro ou
            rechear do seu jeito! Obs: não trocamos nem adicionamos itens a esse
            copo!
          </p>
          {pedidosData?.sizes ? (
            <>
              <div className={styles.selectionsIntro}>
                <span>
                  <h4>Escolha o tamanho</h4>
                  <p>Escolha pelo menos 1 opção.</p>
                </span>
                <p>1/3</p>
              </div>
              <form className={styles.selectionsForm}>
                {pedidosData.sizes.options.map((size, index) => (
                  <label key={index} htmlFor={size}>
                    <p>{size}</p>
                    <span>
                      R${pedidosData.sizes.prices[index]}
                      <input
                        type="radio"
                        name="size"
                        id={size}
                        value={pedidosData.sizes.prices[index]}
                        onChange={(event) => handleSize(event)}
                      />
                    </span>
                  </label>
                ))}
              </form>
            </>
          ) : (
            <p>Carregando dados...</p>
          )}
          {pedidosData?.fruits ? (
            <>
              <div className={styles.selectionsIntro}>
                <span>
                  <h4>Escolha as frutas</h4>
                  <p>Escolha pelo menos 1 opção.</p>
                </span>
                <p>2/3</p>
              </div>
              <form className={styles.selectionsForm}>
                {pedidosData.fruits.options.map((fruit, index) => (
                  <label key={index} htmlFor={fruit}>
                    <p>{fruit}</p>
                    <span>
                      +R${pedidosData.fruits.prices[index]}
                      <input
                        type="radio"
                        name={`fruit_${index}`}
                        id={fruit}
                        value={pedidosData.fruits.prices[index]}
                        // onChange={(event) => handleSize(event)}
                      />
                    </span>
                  </label>
                ))}
              </form>
            </>
          ) : (
            <p>Carregando dados...</p>
          )}
          {pedidosData?.complements ? (
            <>
              <div className={styles.selectionsIntro}>
                <span>
                  <h4>Escolha os complementos</h4>
                  <p>Escolha pelo menos 1 opção.</p>
                </span>
                <p>3/3</p>
              </div>
              <form className={styles.selectionsForm}>
                {pedidosData.complements.options.map((complement, index) => (
                  <label key={index} htmlFor={complement}>
                    <p>{complement}</p>
                    <span>
                      +R${pedidosData.complements.prices[index]}
                      <input
                        type="radio"
                        name={`complement_${index}`}
                        id={complement}
                        value={pedidosData.complements.prices[index]}
                        // onChange={(event) => handleSize(event)}
                      />
                    </span>
                  </label>
                ))}
              </form>
            </>
          ) : (
            <p>Carregando dados...</p>
          )}
        </article>
      </div>
      <div className={styles.actions}>
        <select name="" id="">
          <option value="1">1</option>
        </select>
        <button>
          Avança
          {sizeSelect ? <p>R${sizeSelect}</p> : ""}
        </button>
      </div>
    </div>
  );
}
