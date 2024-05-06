import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Daily News Updates",
    Svg: require("@site/static/img/calendar.svg").default,
    description: (
      <>
        Our newsletter is delivered to your inbox every <code>weekday</code>,
        keeping you up-to-date daily.
      </>
    ),
  },
  {
    title: "Always Free",
    Svg: require("@site/static/img/free.svg").default,
    description: (
      <>
        Stay informed without any costs. Our newsletter is always free to read.
      </>
    ),
  },
  {
    title: "Leave Anytime",
    Svg: require("@site/static/img/unsubscribe.svg").default,
    description: (
      <>
        Not interested anymore? You can easily unsubscribe from our mailing list
        at any time.
      </>
    ),
  },
  {
    title: "Spam-Free Guarantee",
    Svg: require("@site/static/img/nospam.svg").default,
    description: (
      <>
        We value your privacy and promise only to send you relevant and valuable
        content.
      </>
    ),
  },
  {
    title: "Stay on Trend",
    Svg: require("@site/static/img/fire.svg").default,
    description: (
      <>Get the latest trending news and updates directly in your inbox.</>
    ),
  },
  {
    title: "Browse Older Issues",
    Svg: require("@site/static/img/archive.svg").default,
    description: (
      <>
        Missed an issue? Access all past newsletters through our comprehensive
        archive.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
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
