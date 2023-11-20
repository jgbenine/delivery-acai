import styles from './page.module.css'
import { Header } from './components/partials/Header'
import { CardOrder } from './components/partials/CardOrder'

export default function Home() {
  return (
    <main className={styles.main}>
     <Header />
     <CardOrder />
    </main>
  )
}
