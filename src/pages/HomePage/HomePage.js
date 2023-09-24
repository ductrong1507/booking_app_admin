import React from "react";
import styles from "./HomePage.module.css";
import InfoBoard from "../../components/InfoBoard/InfoBoard";

export default function HomePage() {
  return (
    <main id={styles.home_page}>
      <InfoBoard />
    </main>
  );
}
