import Image from 'next/image'
import styles from "../../styles/checkout.module.css";
import { useDataContext } from "@/app/data/hooks/useContext";

export function Checkout() {
  const {totalValue} = useDataContext(); 

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
  )
}


