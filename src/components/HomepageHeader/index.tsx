import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Form from "@site/src/components/HomepageSubscribe";
import { NeatGradient } from "@firecms/neat";
import { config } from "@site/static/js/NeatConfig";
import Link from "@docusaurus/Link";
import classNames from "classnames";
import BrowserOnly from "@docusaurus/BrowserOnly";

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
  return (
    <BrowserOnly>
      {() => {
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
            <Link to="/blog">
              <button
                className={"button button--secondary theme-back-to-top-button"}
              >
                To quickly check the latest issue,
                <br />
                rotate your device or press me 🎯!{" "}
              </button>
            </Link>
          </div>
        );
      }}
    </BrowserOnly>
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
        <div className={styles.heroContent}>
          {/* Main CTA Section */}
          <div className={styles.ctaSection}>
            <div className={styles.brandSection}>
              <div className={styles.logoContainer}>
                <span className={styles.logoEmoji}>☕</span>
                <span className={styles.brandName}>{siteConfig.title}</span>
              </div>
              <div className={styles.badge}>Tech & Science Newsletter</div>
            </div>
            
            <h1 className={styles.heroTitle}>
              Stay ahead with the 
              <span className={styles.highlight}> latest tech insights</span>
            </h1>
            
            <p className={styles.heroSubtitle}>
              Join <strong>2,500+</strong> developers, engineers, and tech enthusiasts who trust 0xCAFE 
              for curated content that matters. No spam, just quality.
            </p>

            <div className={styles.valueProps}>
              <div className={styles.valueProp}>
                <span className={styles.valueIcon}>🚀</span>
                <span>Latest tech news</span>
              </div>
              <div className={styles.valueProp}>
                <span className={styles.valueIcon}>📚</span>
                <span>In-depth articles</span>
              </div>
              <div className={styles.valueProp}>
                <span className={styles.valueIcon}>💡</span>
                <span>GitHub discoveries</span>
              </div>
              <div className={styles.valueProp}>
                <span className={styles.valueIcon}>🎯</span>
                <span>Weekly delivery</span>
              </div>
            </div>

            <div className={styles.ctaContainer}>
              <Form />
              <div className={styles.socialProof}>
                <div className={styles.testimonialQuote}>
                  "Best tech newsletter I've subscribed to. Always high quality content!" 
                  <span className={styles.testimonialAuthor}>- Sarah K., Senior Developer</span>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className={styles.previewSection}>
            <div className={styles.previewHeader}>
              <h3>📰 Latest Issue Preview</h3>
              <div className={styles.previewBadge}>Fresh this week</div>
            </div>
            <LatestIssue />
          </div>
        </div>
      </div>
    </div>
  );
}
