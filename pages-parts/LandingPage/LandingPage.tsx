import classNames from "classnames";
import React from "react";

import styles from "../../index.module.css";
import { Header } from "./Header";

export function LandingPage() {
  return (
    <div className={classNames(styles.landing, styles["overflow-hidden"])}>
      <Header />
    </div>
  );
}
