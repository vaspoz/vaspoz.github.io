import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  subtitle: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  emoji: string;
  id?: number;
  examples: string[];
  issueID: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Daily News Updates",
    subtitle: "The latest news in tech, business, science, and more",
    Svg: require("@site/static/img/news.svg").default,
    emoji: "📰",
    issueID: "401",
    examples: [
      "📱 Apple Announces the iPhone 16 Pro",
      "🚀 Elon Musk on pace to become world's first trillionaire by 2027",
      "🎇 Scientists find humans age dramatically in two bursts – at 44, then 60",
      "🔥 CrowdStrike accepts award for 'most epic fail' after global IT outage",
      "🔥 Burning Man festival fails to sell out for first time in a decade",
      "and more...",
    ],
  },
  {
    title: "Articles",
    subtitle: "Articles on a variety of tech topics",
    Svg: require("@site/static/img/articles.svg").default,
    emoji: "📚",
    issueID: "386",
    examples: [
      "🚀 How to start your first professional project from scratch for beginners",
      "🖼 How to hide files or data in a JPEG Image",
      "🤔 Should You Specialize Or Not? Solving A Developer's Dilemma",
      "👨 What You’ll Actually Do As An Engineering Manager",
      "and more...",
    ],
  },
  {
    title: "Postmortems",
    subtitle: "Learn from the mistakes of the Big Techs",
    Svg: require("@site/static/img/postmortem.svg").default,
    emoji: "☠️",
    issueID: "395",
    examples: [
      "📅 Azure (Time): A miscalculated leap year date caused invalid certificates and a global Azure outage lasting nearly a day.",
      "🛫 TUI (Config Errors): A system fault misclassified 38 female passengers as children, causing the aircraft's takeoff mass to be underestimated by 1,244 kg.",
      "🔥 Amazon: An automated capacity scaling triggered a surge in connection attempts, causing network congestion and performance issues",
      "and more...",
    ],
  },
  {
    title: "Best Apps",
    subtitle: "The best apps to use for your business and daily life",
    Svg: require("@site/static/img/appoftheday.svg").default,
    emoji: "🚀",
    issueID: "404",
    examples: [
      "🌐 D-ID Video Translate: Instant video translation",
      "📋 Seven24.ai: Seven24 captures real feedback and turns it into actionable tasks",
      "💬 TheySaid: Conversational surveys that deliver deeper insights",
      "and more...",
    ],
  },
  {
    title: "GitHub Repositories",
    subtitle: "Daily updates on the best GitHub repositories",
    Svg: require("@site/static/img/github.svg").default,
    emoji: "👨‍💻",
    issueID: "399",
    examples: [
      "👨‍💻 heyxyz/hey (23.1k ⭐): Hey is a decentralized and permissionless social media app built with Lens Protocol",
      "👨‍💻 N64Recomp/N64Recomp (6.2k ⭐): Tool to statically recompile N64 games into native executables",
      "👨‍💻 google/wireit (5.4k ⭐): Wireit upgrades your npm/pnpm/yarn scripts to make them smarter and more efficient.",
      "and more...",
    ],
  },
];

function Feature({
  id,
  Svg,
  title,
  subtitle,
  examples,
  emoji,
  issueID,
}: FeatureItem) {
  let className = id % 2 === 0 ? "straight" : "alternate";
  console.log("className", className);

  return (
    <div className={clsx(styles[className], styles.feature)}>
      <div className="container row">
        {id % 2 === 0 ? (
          <EvenRow
            Svg={Svg}
            emoji={emoji}
            title={title}
            subtitle={subtitle}
            examples={examples}
            issueID={issueID}
          />
        ) : (
          <OddRow
            Svg={Svg}
            emoji={emoji}
            title={title}
            subtitle={subtitle}
            examples={examples}
            issueID={issueID}
          />
        )}
      </div>
    </div>
  );
}

function EvenRow({ Svg, emoji, title, subtitle, examples, issueID }) {
  return (
    <>
      <div className="col">
        <div className="text--center">
          <Svg className={styles.featureSvg} />
        </div>
      </div>
      <div className="col">
        <div className={styles.icon}>{emoji}</div>
        <h1>{title}</h1>
        <p className={styles.description}>{subtitle}</p>
        <ul>
          {examples.map((example, index) => (
            <li key={index}>{example}</li>
          ))}
        </ul>
        <button
          className={"button button--secondary"}
          onClick={() =>
            window.open(`http://0xcafe.news/blog/issue-${issueID}`, "_blank")
          }
        >
          Check one of the issues 👉🏼
        </button>
      </div>
    </>
  );
}

function OddRow({ Svg, emoji, title, subtitle, examples, issueID }) {
  return (
    <>
      <div className={clsx("col", styles.featureOddRow)}>
        <div className={styles.icon}>{emoji}</div>
        <h1>{title}</h1>
        <p className={styles.description}>{subtitle}</p>
        <ul>
          {examples.map((example, index) => (
            <li key={index}>{example}</li>
          ))}
        </ul>
        <button
          className={"button button--secondary"}
          onClick={() =>
            window.open(`http://0xcafe.news/blog/issue-${issueID}`, "_blank")
          }
        >
          Check one of the issues 👉🏼
        </button>
      </div>
      <div className="col">
        <div className="text--center">
          <Svg className={styles.featureSvg} />
        </div>
      </div>
    </>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <>
      {FeatureList.map((props, idx) => (
        <Feature key={idx} {...props} id={idx} />
      ))}
    </>
  );
}
