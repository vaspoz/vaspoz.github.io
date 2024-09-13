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
        <ul>
          <li>
            <code>📱 Apple Announces the iPhone 16 Pro</code>
          </li>
          <li>
            <code>
              🚀 Elon Musk on pace to become world's first trillionaire by 2027
            </code>
          </li>
          <li>
            <code>
              🎇 Scientists find humans age dramatically in two bursts – at 44,
              then 60
            </code>
          </li>
          <li>
            <code>
              🔥 CrowdStrike accepts award for 'most epic fail' after global IT
              outage
            </code>
          </li>
          <li>
            <code>
              🔥 Burning Man festival fails to sell out for first time in a
              decade
            </code>
          </li>
          <li>and more...</li>
        </ul>
      </>
    ),
  },
  {
    title: "Articles",
    emoji: "📚",
    description: (
      <>
        <ul>
          <li>
            <code>
              🚀 How to start your first professional project from scratch for
              beginners
            </code>
          </li>
          <li>
            <code>🖼 How to hide files or data in a JPEG Image</code>
          </li>
          <li>
            <code>
              🤔 Should You Specialize Or Not? Solving A Developer's Dilemma
            </code>
          </li>
          <li>
            <code>👨 What You’ll Actually Do As An Engineering Manager</code>
          </li>
          <li>and more...</li>
        </ul>
      </>
    ),
  },
  {
    title: "Postmortems",
    emoji: "☠️",
    description: (
      <>
        <ul>
          <li>
            <code>
              📅 Azure (Time): A miscalculated leap year date caused invalid
              certificates and a global Azure outage lasting nearly a day.
            </code>
          </li>
          <li>
            <code>
              🛫 TUI (Config Errors): A system fault misclassified 38 female
              passengers as children, causing the aircraft's takeoff mass to be
              underestimated by 1,244 kg.
            </code>
          </li>
          <li>
            <code>
              🔥 Amazon: An automated capacity scaling triggered a surge in
              connection attempts, causing network congestion and performance
              issues
            </code>
          </li>
          <li>and more...</li>
        </ul>
      </>
    ),
  },
  {
    title: "Best Apps",
    emoji: "🚀",
    description: (
      <>
        <ul>
          <li>
            <code>🌐 D-ID Video Translate: Instant video translation</code>
          </li>
          <li>
            <code>
              📋 Seven24.ai: Seven24 captures real feedback and turns it into
              actionable tasks
            </code>
          </li>
          <li>
            <code>
              💬 TheySaid: Conversational surveys that deliver deeper insights
            </code>
          </li>
          <li>and more...</li>
        </ul>
      </>
    ),
  },
  {
    title: "GitHub Repositories",
    emoji: "👨‍💻",
    description: (
      <>
        <ul>
          <li>
            <code>
              <b>heyxyz/hey</b> (23.1k ⭐): Hey is a decentralized and
              permissionless social media app built with Lens Protocol
            </code>
          </li>
          <li>
            <code>
              <b>N64Recomp/N64Recomp</b> (6.2k ⭐): Tool to statically recompile
              N64 games into native executables
            </code>
          </li>
          <li>
            <code>
              <b>google/wireit</b> (5.4k ⭐): Wireit upgrades your npm/pnpm/yarn
              scripts to make them smarter and more efficient.
            </code>
          </li>
          <li>and more...</li>
        </ul>
      </>
    ),
  },
];

function Feature({ title, description, emoji }: FeatureItem) {
  return (
    <div className={clsx("col col--6")}>
      <div className="text--center">
        <span role="img" aria-label="news" style={{ fontSize: "3rem" }}>
          {emoji}
        </span>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
      </div>
      <p>{description}</p>
    </div>
  );
}

function FeatureV2({ title, description, emoji }: FeatureItem) {
  return (
    <div className={styles["feature-straight"]}>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>header</h1>
          </div>
          <div className="col">
            <h1>right</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
/*
    <div className={clsx("col col--6")}>
      <div className="text--center">
        <span role="img" aria-label="news" style={{ fontSize: "3rem" }}>
          {emoji}
        </span>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
      </div>
      <p>{description}</p>
    </div>
  );
}
*/
export default function HomepageFeatures(): JSX.Element {
  return (
    <>
      {FeatureList.map((props, idx) => (
        <FeatureV2 key={idx} {...props} />
      ))}
    </>
  );
}
