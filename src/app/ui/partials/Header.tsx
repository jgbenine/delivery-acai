import Image from 'next/image'
import styles from '../styles/header.module.css'

export function Header() {
  return (
      <header className={styles.header}>
      <div className="containerMain">
          <Image src="/assets/logo.png" alt="Logo Delivery" width={158} height={48}  />
      </div>
    </header>
  )
}
