import useDataContext from "../../data/hooks/UseContextData";
import styles from "../styles/actions.module.css";
import { Undo2 } from "lucide-react";

function Actions() {
  const {
    quantityValue,
    setQuantityValue,
    totalValue,
    valueSelectInfo,
    setValueSelectInfo,
    setDataSelectInfo,
    activeTab,
    setActiveTab,
    dataSelectInfo,
  } = useDataContext();


  function decreaseQuantity() {
    setQuantityValue(Math.max(1, quantityValue - 1));
  }
  function increaseQuantity() {
    const maxLimit = 10;
    setQuantityValue((prevValue) => Math.min(prevValue + 1, maxLimit));
  }

  const tabs = ["sizes", "fruits", "complements", "checkout"];
  function nextTab() {
    const isValidTab = (value: number[] | number | undefined) =>
      value !== undefined;
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

  function previousTab() {
    const currentIndex = tabs.indexOf(activeTab);
    const previousIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    const previousTab = tabs[previousIndex];

    // Remove itens de frutas ou complementos
    if (dataSelectInfo.length > 0 && valueSelectInfo.length > 0) {
      const newDataSelectInfo = [dataSelectInfo[0]];
      const newValueSelectInfo = [valueSelectInfo[0]];
      setDataSelectInfo(newDataSelectInfo);
      setValueSelectInfo(newValueSelectInfo);
    }
    if (currentIndex >= 1) {
      setActiveTab(previousTab);
    }
  }

  return (
    <div className={styles.actions}>
      <span>
        <button className={styles.btnPrev} onClick={previousTab}>
          <Undo2 color="black" />
        </button>
      </span>
      <div className={styles.container}>
        <div className={styles.quantityControl}>
          <button onClick={decreaseQuantity}>-</button>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            disabled
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
  );
}

export default Actions;
