import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  description: JSX.Element;
  emoji: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Daily News Updates",
    emoji: "📰",
    description: (
      <>
        Stay updated with the latest happenings in the tech world. Get concise
        and informative news updates delivered to your inbox every day.
      </>
    ),
  },
  {
    title: "Articles",
    emoji: "📚",
    description: (
      <>
        Dive deep into insightful articles that cover a wide range of topics
        from tech trends to personal development. Stay informed and inspired
        with every read.
      </>
    ),
  },
  {
    title: "Postmortems",
    emoji: "☠️",
    description: (
      <>
        Discover the lessons learned from the biggest failures in the tech
        industry.
      </>
    ),
  },
  {
    title: "Best Apps",
    emoji: "🚀",
    description: (
      <>
        Discover a new app every day that can boost your productivity, enhance
        your creativity, or just make life a little easier. Stay ahead with our
        top picks!
      </>
    ),
  },
  {
    title: "GitHub Repositories",
    emoji: "👨‍💻",
    description: (
      <>
        Explore trending GitHub repositories and discover the best open-source
        projects to contribute to and learn from.
      </>
    ),
  },
];

function Feature({ title, description, emoji }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <span role="img" aria-label="news" style={{ fontSize: "3rem" }}>
          {emoji}
        </span>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
