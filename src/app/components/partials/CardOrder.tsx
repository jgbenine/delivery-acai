"use client";
import { useState } from "react";
import useDataContext from "../../data/hooks/UseContextData";
import { Checkout } from "./Checkout";
import styles from "../../styles/cardOrder.module.css";
import Image from "next/image";

export function CardOrder() {
  const [activeTab, setActiveTab] = useState<string>("sizes");

  const {
    valueSelectInfo,
    quantityValue,
    setTotalValue,
    setDataSelectInfo,
    totalValue,
    setQuantityValue,
    pedidosData,
    setValueSelectInfo,
    dataSelectInfo
  } = useDataContext();

  function handleValuesInput(event: React.ChangeEvent<HTMLInputElement>, textInfo: string) {
    const { type, checked, value } = event.target;
    const numericValue = parseFloat(value);

    // Verifica se é um radio ou checkbox
    if (type === 'radio') {
      // Se for radio, substitui o valor no array
      setValueSelectInfo([numericValue]);
      setDataSelectInfo([textInfo]);
    } else if (type === 'checkbox') {
      // Se for checkbox, verifica se está marcado ou desmarcado
      if (checked) {
        // Adiciona valor ao array se estiver marcado
        setValueSelectInfo([...valueSelectInfo, numericValue]);
        setDataSelectInfo([...dataSelectInfo, textInfo]);
      } else {
        // Remove valor do array se estiver desmarcado
        setValueSelectInfo(valueSelectInfo.filter(val => val !== numericValue));
        setDataSelectInfo(dataSelectInfo.filter(data => data !== textInfo));
      }
    }
  }

  //Lógica para navegação por Tabs
  const tabs = ["sizes", "fruits", "complements", "checkout"];

  function nextTab() {
    //Verifica se foram definidos os valores na tab.
    const isValidTab = (value: number[] | number | undefined) =>
      value !== undefined;
    //Define o valor atual do index dentro de activeTab
    //Lógica de próxima tab adicionado ao próximo item na lista.
    const currentIndex = tabs.indexOf(activeTab);
    const nextIndex = (currentIndex + 1) % tabs.length;
    const nextTab = tabs[nextIndex];

    //Switch opções para tab que quando é chamado verifica se a lógica permite que a próxima tab seja chamada.
    switch (activeTab) {
      case "sizes":
        checkAndSetNextTab(valueSelectInfo[0], nextTab);
        break;
      case "fruits":
        checkAndSetNextTab(valueSelectInfo[1], nextTab);
        break;
      case "complements":
        checkAndSetNextTab(valueSelectInfo[1], nextTab);
        break;
      case "checkout":
        checkAndSetNextTab(totalValue, nextTab);
        break;
      default:
        console.log("Tab inválida");
    }

    //Verifica e seta nova tab verificando se isValidTab existe e é true permitindo a set da próxima tab
    function checkAndSetNextTab(
      value: number[] | number | undefined,
      nextTab: string
    ) {
      if (isValidTab(value)) {
        setActiveTab(nextTab);
      } else {
        console.log("selecione um valor para avançar o pedido");
      }
    }
  }

  //Funções para acrescentar mais de um pedido(item)
  function decreaseQuantity() {
    setQuantityValue(Math.max(1, quantityValue - 1));
  }

  function increaseQuantity() {
    setQuantityValue(quantityValue + 1);
  }

  return (
    <div className="containerMain">
      <div className={styles.card}>
        {activeTab !== "checkout" ? (
          <div className={styles.container}>
            <div className={styles.content}>
              <span className={styles.wrapperImg}>
                <Image
                  src="/assets/produto.png"
                  width={412}
                  height={352}
                  alt="Produto"
                />
              </span>
              <article>
                <div className={styles.introView}>
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
                </div>
                <p className={styles.description}>
                  Super Copo de 500 ml de Açaí Tradicional - Atenção: Contém
                  somente açaí puro! Ideal para quem gosta de aproveitar um açaí
                  puro ou rechear do seu jeito! Obs: não trocamos nem
                  adicionamos itens a esse copo!
                </p>
                {pedidosData?.sizes && activeTab === "sizes" ? (
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
                              onChange={(event) =>
                                handleValuesInput(event, size)
                              }
                            />
                          </span>
                        </label>
                      ))}
                    </form>
                  </>
                ) : null}
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
                              onChange={(event) =>
                                handleValuesInput(event, fruit)
                              }
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
                        <p>Escolha até 3 opções.</p>
                      </span>
                      <p>3/3</p>
                    </div>
                    <form className={styles.selectionsForm}>
                      {pedidosData.complements.options.map(
                        (complement, index) => (
                          <label key={index} htmlFor={complement}>
                            <p>{complement}</p>
                            <span>
                              +R${pedidosData.complements.prices[index]}
                              <input
                                type="checkbox"
                                name={`complement_${index}`}
                                id={complement}
                                value={pedidosData.complements.prices[index]}
                                onChange={(event) =>
                                  handleValuesInput(event, complement)
                                }
                              />
                            </span>
                          </label>
                        )
                      )}
                    </form>
                  </>
                ) : null}
              </article>
            </div>
            <div className={styles.actions}>
              <div className={styles.quantityControl}>
                <button onClick={decreaseQuantity}>-</button>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantityValue}
                  onChange={(e) =>
                    setQuantityValue(parseInt(e.target.value, 10) || 1)
                  }
                />
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button onClick={nextTab} className={styles.btnNext}>
                Avançar
                {totalValue ? <p>R${totalValue}</p> : <p>R$0</p>}
              </button>
            </div>
          </div>
        ) : (
          <Checkout />
        )}
      </div>
    </div>
  );
}
