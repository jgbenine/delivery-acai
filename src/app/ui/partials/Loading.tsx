import Image from "next/image";
import React from "react";
import styles from "../styles/loading.module.css";

function Loading() {
  return (
   <div className={styles.loading}>
    <ul className={styles.groupCircle}>
      <li className={styles.circle}></li>
      <li className={styles.circle}></li>
      <li className={styles.circle}></li>
      <li className={styles.circle}></li>
    </ul>
   </div>
  );
}

export default Loading;
