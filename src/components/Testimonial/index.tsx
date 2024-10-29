import React, { type ReactNode } from "react";

import clsx from "clsx";

import styles from "./styles.module.css";

export interface Props {
  image: string;
  name: string;
  content: ReactNode;
  subscribeDate: string;
}

export default function Testimonial({
  image,
  name,
  content,
  subscribeDate,
}: Props): JSX.Element {
  return (
    <div className={clsx("card", styles.testimonial)}>
      <div className="card__header">
        <div className="avatar">
          <img
            src={require(`@site/static/testimonials/${image}`).default}
            alt={name}
            className="avatar__photo"
            width="48"
            height="48"
            loading="lazy"
          />
          <div className={clsx("avatar__intro", styles.testimonialMeta)}>
            <strong className="avatar__name">{name}</strong>
            <span>💌 Joined on {subscribeDate}</span>
          </div>
        </div>
      </div>

      <div className={clsx("card__body", styles.testimonial)}>{content}</div>

      {/* <div className="card__footer">fff</div> */}
    </div>
  );
}
