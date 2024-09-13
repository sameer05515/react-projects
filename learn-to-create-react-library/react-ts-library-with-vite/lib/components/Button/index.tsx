import React from "react";
import styles from "./index.module.css";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={styles.button} {...props} />;
}
