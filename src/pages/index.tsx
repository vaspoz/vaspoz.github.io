import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import classNames from "classnames";

import HomepageHeader from "@site/src/components/HomepageHeader";
import Quote from "@site/src/components/Quote";
import styles from "./index.module.css";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.tagline}
      description="Sign up to stay up-to-date with the most recent advancements, encompassing everything from design to delivery"
    >
      <div className={classNames(styles.landing, styles["overflow-hidden"])}>
        <HomepageHeader />
      </div>
      <main>
        <Quote />
      </main>
    </Layout>
  );
}
