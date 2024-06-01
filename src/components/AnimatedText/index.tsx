import styles from "./styles.module.css";

export default function AnimatedText({ text }): JSX.Element {
  return (
    <span className={styles.animated_text_container}>
      <p className={styles.animated_text}>{text}</p>
    </span>
  );
}
