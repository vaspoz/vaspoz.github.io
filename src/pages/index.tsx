import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Form from "@site/src/components/HomepageSubscribe";
import Heading from "@theme/Heading";
import AnimatedText from "@site/src/components/AnimatedText";
import { NeatGradient } from "@firecms/neat";
import { config } from "@site/static/js/NeatConfig";
import classNames from "classnames";

import CodeSection from "@site/src/components/CodeSection";

import styles from "./index.module.css";

////////////////////////////////////
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
          style={{ backgroundColor: "var(--periwinkle)" }}
        />
        <span
          className={styles["system-top-bar-circle"]}
          style={{ backgroundColor: "var(--bright-cyan)" }}
        />
        <span
          className={styles["system-top-bar-circle"]}
          style={{ backgroundColor: "var(--sea-green)" }}
        />
      </div>
      {children}
    </div>
  );
}

function Showcase() {
  const codeSnippet = `
// <schema>
{
  date: "today",
  topics: [
    "1": "articles"
  ]
}
// </schema>
  `;
  return (
    <SystemWindow>
      <CodeSection
        language="json"
        section="schema"
        // source={require("!!raw-loader!../CommonForms/ShippingSchema")}
        source={codeSnippet}
      />
    </SystemWindow>
  );
}

function HomepageHeaderV2() {
  const { siteConfig } = useDocusaurusContext();
  const gradientRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (gradientRef.current) {
      console.log(gradientRef.current);
      const neat = new NeatGradient({
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

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  // const gradientRef = useRef<HTMLCanvasElement | null>(null);

  // useEffect(() => {
  //   if (gradientRef.current) {
  //     console.log(gradientRef.current);
  //     const neat = new NeatGradient({
  //       ref: gradientRef.current,
  //       ...config,
  //     });
  //   }
  // }, []);

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="subtitle">
          Only essential news, articles and GitHub repositories.
          <p>
            Join our community of{" "}
            <span className={styles.readersCounter}>~1.5k</span> dfffaily
            readers 👀
          </p>
        </p>
        <Form />
        Subscribe now and get the most read articles about{" "}
        <AnimatedText text="Career Development!" />
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.tagline}
      description="Sign up to stay up-to-date with the most recent advancements, encompassing everything from design to delivery"
    >
      {/* <LandingPage /> */}
      <div className={classNames(styles.landing, styles["overflow-hidden"])}>
        <HomepageHeaderV2 />
      </div>
      <main>
        <div className={styles.titleSecondary}>
          Quick snippets from most recent issues:
        </div>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
