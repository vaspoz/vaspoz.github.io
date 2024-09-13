import clsx from "clsx";
import styles from "./styles.module.css";

export default function QuotesSection() {
  return (
    <div className={clsx("container", styles.feature)}>
      <div className="row">
        <div className="col">
          <div className="avatar avatar--vertical margin-bottom--sm">
            <img
              alt="Basil Pozdeev"
              className="avatar__photo avatar__photo--xl"
              src={"https://avatars.githubusercontent.com/u/4658186?v=4"}
              style={{ overflow: "hidden" }}
            />
            <div className="avatar__intro padding-top--sm">
              <div className="avatar__name">Basil Pozdeev</div>
              <small className="avatar__subtitle">
                The guy who actually thought this was a good idea
              </small>
            </div>
          </div>
          <p className={clsx("text--center", styles.quote)}>
            <p>
              I’ve been in the IT industry for years, and like many of you,
              being an IT engineer means never stopping learning.
              <br />
              Reading articles, news, and doomscrolling GitHub repositories
              became a daily routine.
              <br />
              Then adulthood hit and I got a bit lazy. So, what does an IT guy
              do? Automate, of course! I built a CLI tool to quickly
              <br />
              grab all the morning info I needed. Eventually, I decided to share
              it and dive into the newsletter world.
              <br />
              <br />
              Now, here we are—over a year, 400+ issues, and a thriving website.
              <br />A huge thank you to subscribe to my newsletter; your support
              keeps me energized to grow and create new content! ❤️
            </p>
          </p>
        </div>
      </div>
    </div>
  );
}
