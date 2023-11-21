"use client";
import { useState, useEffect } from "react";
import styles from "../../styles/cardOrder.module.css";
import Image from "next/image";
import { useDataContext } from "@/app/data/hooks/useContext";

export function CardOrder() {
  const [sizeSelect, setSizeSelect] = useState<number | null>();
  const [complementsSelected, setCompelmentsSelected] = useState<
    number[] | null
  >();
  const [totalValue, setTotalValue] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>("sizes");
  const { pedidosData } = useDataContext();
  const tabs = ["sizes", "fruits", "complements"];

  function handleValuesInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { type, value, checked } = event.target;
    const numericValue = parseFloat(value);

    if (type === "checkbox") {
      if (checked) {
        //Pega os valores anteriores se houver e adiciona o novo valor selecionado
        setCompelmentsSelected((prevValues) => [
          ...(prevValues ?? []),
          numericValue,
        ]);
      } else {
        //Remove item do array se for igual ao valor já presente
        setCompelmentsSelected((prevValues) =>
          prevValues ? prevValues.filter((value) => value !== numericValue) : []
        );
      }
    } else if (type === "radio") {
      setSizeSelect(numericValue);
    }
    handleSubmitValues();
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
    }
  }

  useEffect(() => {
    if (totalValue) {
      setTotalValue(totalValue)
    }
  }, [totalValue]);

  function nextTab() {
    const currentIndex = tabs.indexOf(activeTab);
    const nextIndex = (currentIndex + 1) % tabs.length;
    setActiveTab(tabs[nextIndex])
  }

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
          {pedidosData?.sizes  && activeTab === 'sizes' ? (
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
                        onChange={(event) => handleValuesInput(event)}
                      />
                    </span>
                  </label>
                ))}
              </form>
            </>
          ) : (
            null
          )}
          {pedidosData?.fruits && activeTab === "fruits" ? (
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
                        onChange={(event) => handleValuesInput(event)}
                      />
                    </span>
                  </label>
                ))}
              </form>
            </>
          ) : null}
          {pedidosData?.complements && activeTab === "complements" ? (
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
                        onChange={(event) => handleValuesInput(event)}
                      />
                    </span>
                  </label>
                ))}
              </form>
            </>
          ) : null}
        </article>
      </div>
      <div className={styles.actions}>
        <select name="" id="">
          <option value="1">1</option>
        </select>
        <button onClick={nextTab}>
          Avança
          {sizeSelect ? <p>R${totalValue}</p> : ""}
        </button>
      </div>
      <article styles={styles.checkout}>
        <div>
        <Image
          src="/assets/produto.png"
          width={64}
          height={64}
          alt="Produto"
        />
        </div>
      </article>
    </div>
  );
}
