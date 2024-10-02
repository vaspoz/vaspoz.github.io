import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Form from "@site/src/components/HomepageSubscribe";
import { NeatGradient } from "@firecms/neat";
import { config } from "@site/static/js/NeatConfig";
import classNames from "classnames";

import CodeSection from "@site/src/components/CodeSection";
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
      </div>
      {children}
    </div>
  );
}

function Showcase() {
  const codeSnippet = `
// <schema>
let newsletterDescription = {
  name: "0xCAFE",
  frequency: "cron(0 6 * * MON,THU)",
  sections: [
    "Tech and Science news",
    "Articles",
    "Postmortems",
    "App of the day",
    "GitHub repositories",
    "Puzzles",
  ],
  audience: {
    type: [
      "software developers",
      "engineers",
      "architects",
      "tech enthusiasts",
    ],
    currentSubscribers: 1500,
  },
  stats: {
    issues: {
      base: 400,
      modificator: "moreThan",
    },
    isFree: true,
    canUnsubscribe: true,
  },
};
// </schema>
  `;
  return (
    <SystemWindow>
      <CodeSection language="js" section="schema" source={codeSnippet} />
    </SystemWindow>
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
              <li>🚀 App of the day</li>
              <li>👨‍💻 GitHub repositories</li>
            </ul>
            <Form />
          </div>
          <div className="col">
            <Showcase />
          </div>
        </div>
      </div>
    </div>
  );
}
