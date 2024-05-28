import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Form from "@site/src/components/HomepageSubscribe";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="subtitle">
          Get your daily dose of tech with quick news 📰, must-read articles 📚,
          and interesting GitHub repositories 💻—all packed into a concise
          15-minute read. 📧✨
          <p>
            Join our community of{" "}
            <span className={styles.readersCounter}>~715</span> daily readers 👀
          </p>
        </p>
        <Form />
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
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
