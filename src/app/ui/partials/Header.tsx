import Image from "next/image";
import styles from "../styles/header.module.css";
import Link from "next/link";

export function Header() {
  return (
    <header className={styles.header}>
      <div className="containerMain">
        <Link href="">
          <Image
            src="/assets/logo.png"
            alt="Logo Delivery"
            width={158}
            height={48}
          />
        </Link>
      </div>
    </header>
  );
}
