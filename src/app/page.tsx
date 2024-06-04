import styles from './page.module.css';
import { Header } from "./ui/partials/Header";
import { CardOrder } from "./ui/partials/CardOrder";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <CardOrder />
    </main>
  );
}
