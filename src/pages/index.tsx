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

import { LandingPage } from "../../pages-parts/LandingPage/LandingPage";

import styles from "./index.module.css";

function HomepageHeader() {
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
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <canvas
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
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="subtitle">
          Only essential news, articles and GitHub repositories.
          <p>
            Join our community of{" "}
            <span className={styles.readersCounter}>~1.5k</span> daily readers
            👀
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
      <LandingPage />
      <HomepageHeader />
      <main>
        <div className={styles.titleSecondary}>
          Quick snippets from most recent issues:
        </div>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
