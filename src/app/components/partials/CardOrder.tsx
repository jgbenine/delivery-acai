"use client";
import useDataContext from "../../data/hooks/UseContextData";
import { Checkout } from "./Checkout";
import styles from "../../styles/cardOrder.module.css";
import Image from "next/image";
import Actions from "./Actions";

export function CardOrder() {

  const {
    valueSelectInfo,
    activeTab,
    setDataSelectInfo,
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
            <Actions />
          </div>
        ) : (
          <Checkout />
        )}
      </div>
    </div>
  );
}
