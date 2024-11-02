import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Form from "@site/src/components/HomepageSubscribe";
import { NeatGradient } from "@firecms/neat";
import { config } from "@site/static/js/NeatConfig";
import classNames from "classnames";

import styles from "./styles.module.css";

type SystemWindowProps = JSX.IntrinsicElements["div"];

function SystemWindow({ children, className, ...props }: SystemWindowProps) {
  return (
    <div
      {...props}
      className={classNames(
        styles["system-window"],
        styles["blue-accent"],
        styles["preview-border"],
        className,
      )}
    >
      <div className={styles["system-top-bar"]}>
        <span
          className={styles["system-top-bar-circle"]}
          style={{ backgroundColor: "#8759ff" }}
        />
        <span
          className={styles["system-top-bar-circle"]}
          style={{ backgroundColor: "#3fc4fe" }}
        />
        <span
          className={styles["system-top-bar-circle"]}
          style={{ backgroundColor: "#42ffac" }}
        />
        <span
          className={styles.text}
          style={{ paddingLeft: "10px", color: "white" }}
        >
          Latest issue
        </span>
      </div>
      {children}
    </div>
  );
}

function useIsWideScreen() {
  const [isWideScreen, setIsWideScreen] = React.useState(
    window.innerWidth >= 550,
  );

  React.useEffect(() => {
    const handleResize = () => setIsWideScreen(window.innerWidth >= 550);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isWideScreen;
}

function LatestIssue() {
  const isWideScreen = useIsWideScreen();

  return isWideScreen ? (
    <SystemWindow>
      <iframe
        width="100%"
        height="600px"
        src="https://archive.0xcafe.news/latest"
        allow="true"
        allowFullScreen
        sandbox="true"
        style={{ backgroundColor: "white" }}
      />
    </SystemWindow>
  ) : (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
        className={"button button--secondary theme-back-to-top-button"}
        onClick={() => {
          window.open("/blog", "_self");
        }}
      >
        Curious about the latest issue 👀?
        <br />
        Rotate your screen or press me!{" "}
      </button>
    </div>
  );
}

export default function HomepageHeader(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const gradientRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (gradientRef.current) {
      console.log(gradientRef.current);
      new NeatGradient({
        ref: gradientRef.current,
        ...config,
      });
    }
  }, []);

  return (
    <div className={clsx("hero hero--primary", styles.heroBanner)}>
      <canvas
        id="gradient"
        ref={gradientRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
      <div className="container">
        <div className="row">
          <div className="col">
            <span
              className={classNames(
                styles.text,
                styles["text-big"],
                styles.title,
              )}
            >
              {siteConfig.title}
            </span>
            <h1
              className={classNames(
                styles.description,
                styles.text,
                styles["text-huge"],
              )}
            >
              The only newsletter you need to stay updated with latest
            </h1>
            <ul className={classNames(styles.bullets)}>
              <li>📰 News</li>
              <li>📚 Articles</li>
              <li>☠️ Postmortems</li>
              <li>👨‍💻 GitHub repositories</li>
            </ul>
            <Form />
          </div>
          <div className="col">
            <LatestIssue />
          </div>
        </div>
      </div>
    </div>
  );
}
