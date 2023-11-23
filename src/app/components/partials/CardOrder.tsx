"use client";
import { useState, useEffect } from "react";
import styles from "../../styles/cardOrder.module.css";
import Image from "next/image";
import { useDataContext } from "@/app/data/hooks/useContext";

export function CardOrder() {
  const [totalValue, setTotalValue] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("sizes");
  const {
    pedidosData,
    setDataSelectInfo,
    setValueSelectInfo,
    valueSelectInfo
  } = useDataContext();

  //Sempre que se altera alguma caixa de seleção sendo checkbox e radio essa função ocorre
  //Verifica se é checkbox se sim, ela adiciona o novo valor em um array se ele foi selecionado
  //e remove deixando vazio se caso ele existir e foi desselecionado
  //Se for Radio ele apenas substitui o valor
  function handleValuesInput(event: React.ChangeEvent<HTMLInputElement>, textInfo: string) {
    const { type, checked } = event.target;

    // Atualiza o estado específico (valueSelectInfo) baseado no tipo
    if (type === "radio") {
      setValueSelectInfo(checked ? [parseFloat(event.target.value)] : []);
    }

    // Atualiza o estado geral (dataSelectInfo) com base no tipo
    setDataSelectInfo((prevValues) => {
      if (type === "checkbox") {
        if (checked && textInfo) {
          return [...(prevValues || []), textInfo];
        } else {
          return (prevValues || []).filter((item) => item !== textInfo);
        }
      } else {
        return checked ? [textInfo] : prevValues || [];
      }
    });
  }

  //UseEffect para realizar a soma dos valores sempre que os valores mudarem
  useEffect(() => {
    function sumValues() {
      // Soma dos valores
      const sumValuesInfo = valueSelectInfo.reduce((acc, currentValue) => acc + currentValue, 0);
      setTotalValue(sumValuesInfo);
    }
    sumValues();
  }, [totalValue, valueSelectInfo]);

  //Lógica para navegação por Tabs
  const tabs = ["sizes", "fruits", "complements", "checkout"];
  function nextTab() {
    //Verifica se foram definidos os valores na tab.
    const isValidTab = (value: number[] | number | undefined) =>
      value !== undefined;
    //Define o valor atual do index dentro de activeTab
    //Lógica de próxima tab adicionado ao próximo item na lista.
    //seta o próximo valor como nextIndex.
    const currentIndex = tabs.indexOf(activeTab);
    const nextIndex = (currentIndex + 1) % tabs.length;
    const nextTab = tabs[nextIndex];

    //Switch opções para tab que quando é chamado verifica se a lógica permite que a próxima tab seja chamada.
    switch (activeTab) {
      case "sizes":
        checkAndSetNextTab(sizeSelectValue, nextTab);
        break;
      case "fruits":
        checkAndSetNextTab(fruitsSelectValue, nextTab);
        break;
      case "complements":
        checkAndSetNextTab(complementsSelectValue, nextTab);
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
        console.log("selecione um valor");
      }
    }
  }

  return (
    <div className={styles.card}>
      {activeTab !== "checkout" ? (
        <div className={styles.gridContent}>
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
                Super Copo de 500 ml de Açaí Tradicional - Atenção: Contém
                somente açaí puro! Ideal para quem gosta de aproveitar um açaí
                puro ou rechear do seu jeito! Obs: não trocamos nem adicionamos
                itens a esse copo!
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
                            onChange={(event) => handleValuesInput(event, size)}
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
                      <p>Escolha pelo menos 1 opção.</p>
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
            <select name="" id="">
              <option value="1">1</option>
            </select>
            <button onClick={nextTab}>
              Avança
              {totalValue ? <p>R${totalValue}</p> : <p>R$0</p>}
            </button>
          </div>
        </div>
      ) : (
        <article className={styles.checkout}>
          <div className={styles.introCheckout}>
            <div className={styles.gridCheckout}>
              <Image
                src="/assets/produto.png"
                width={80}
                height={80}
                alt="Produto"
              />
              <div>
                <ul>
                  <li>
                    <p>1 Item</p>
                  </li>
                  <h4>Açai Natural</h4>
                  <li>
                    <p>Médio</p>
                  </li>
                  <li>
                    <p>Morango</p>
                  </li>
                  <li>
                    <p>Garona, Paçoca</p>
                  </li>
                </ul>
              </div>
            </div>
            <p>#4184548</p>
          </div>
          <div className={styles.checkoutDelivery}>
            <span>
              <p>previsão de entrega</p>
              <h4>15:55 - 16:10</h4>
            </span>
            <span>
              <p>valor total</p>
              <h4>R${totalValue}</h4>
            </span>
          </div>
        </article>
      )}
    </div>
  );
}
