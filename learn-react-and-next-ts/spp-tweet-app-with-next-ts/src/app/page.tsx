import Image from "next/image";
import styles from "./page.module.css";
import Playground from "@/components/Playground";

export default function Home() {
  return (
    <div className={styles.page}>
      <Playground/>
    </div>
  );
}