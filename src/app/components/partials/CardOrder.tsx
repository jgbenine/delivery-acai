"use client";
import { useState, useEffect } from "react";
import styles from "../../styles/cardOrder.module.css";
import Image from "next/image";
import { useDataContext } from "@/app/data/hooks/useContext";

export function CardOrder() {
  const [sizeSelect, setSizeSelect] = useState<number | null>();
  const [complementsSelected, setCompelmentsSelected] = useState<number[] | null>();
  const [totalValue, setTotalValue] = useState<number | null>();
  const { pedidosData } = useDataContext();

  function handleSize(event: React.ChangeEvent<HTMLInputElement>) {
    const { type, value, checked } = event.target;
    const numericValue = parseFloat(value);

    if (type === "checkbox") {
      if (checked) {
        setCompelmentsSelected((prevValues) => [
          ...(prevValues ?? []),
          numericValue,
        ]);
      } else {
        setCompelmentsSelected((prevValues) =>
          prevValues ? prevValues.filter((value) => value !== numericValue) : []
        );
      }
    } else if (type === "radio") {
      setSizeSelect(numericValue);
    }
  }

  function handleSubmitValues() {
    let valueComplements = 0;
    let valueSize = sizeSelect;
    if (complementsSelected && valueSize) {
      for (let i = 0; i < complementsSelected?.length; i++) {
        valueComplements += complementsSelected[i];
      }
      const valueTotal = valueComplements + valueSize;
      setTotalValue(valueTotal);
      console.log(totalValue)
    }
  }

  useEffect(()=>{
    console.log(totalValue)
  },[totalValue])

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
                        type="checkbox"
                        name={`fruit_${index}`}
                        id={fruit}
                        value={pedidosData.fruits.prices[index]}
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
                        type="checkbox"
                        name={`complement_${index}`}
                        id={complement}
                        value={pedidosData.complements.prices[index]}
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
        </article>
      </div>
      <div className={styles.actions}>
        <select name="" id="">
          <option value="1">1</option>
        </select>
        <button onClick={handleSubmitValues}>
          Avança
          {sizeSelect ? <p>R${sizeSelect}</p> : ""}
        </button>
      </div>
    </div>
  );
}
