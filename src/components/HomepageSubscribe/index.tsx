import styles from "./styles.module.css";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import React from "react";

const url =
  "https://news.us21.list-manage.com/subscribe/post?u=feba530ea1bb640b3bbbc4977&amp;id=e90c057e68&amp;f_id=00cff5e6f0";

const CustomForm = ({ status, message, onValidated }) => {
  let email;
  const submit = () =>
    email &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
    });

  const [hover, setHover] = React.useState(false);

  return (
    <>
      {status === "error" && (
        <div
          style={{ color: "red" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" ? (
        <div>
          <div className={styles.subscribe_form}>
            <div className={styles.subscribe_success}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.subscribe_success_icon}
                fill="none"
                viewBox="0 0 24 24"
                stroke="#10B981"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div
                className={styles.subscribe_success_message}
                dangerouslySetInnerHTML={{ __html: message }}
              />
            </div>
          </div>
          <div style={{ color: "#10b981" }}>
            You'll receive a link to the Guide in your welcome email.
          </div>
        </div>
      ) : (
        <div className={styles.subscribe_form}>
          <div className={styles.subscribe_form_input_group}>
            <input
              ref={(node) => (email = node)}
              type="email"
              placeholder="Your email"
              name="EMAIL"
              className={styles.subscribe_form_input}
              autoFocus
            />
            <button
              className={
                "button button--primary button--lg " +
                styles.subscribe_form_button +
                " " +
                (hover ? styles.subscribe_form_button_hover : "")
              }
              onClick={submit}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              ✔️ Subscribe
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default function Form(): JSX.Element {
  return (
    <>
      <MailchimpSubscribe
        url={url}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
          />
        )}
      />{" "}
    </>
  );
}
