import Image from "next/image";
import styles from "../styles/checkout.module.css";
import useDataContext from '../../data/hooks/UseContextData'

export function Checkout() {
  const { totalValue, dataSelectInfo, quantityValue } = useDataContext();

  return (
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
            <p>{quantityValue > 1 ? `${quantityValue} items` : `${quantityValue} item`}</p>
            <h4>Açai Natural</h4>
            <ul>
              {dataSelectInfo.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
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
  );
}
