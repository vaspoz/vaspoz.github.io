import clsx from "clsx";

import Layout from "@theme/Layout";

import Testimonial from "@site/src/components/Testimonial";
import Heading from "@theme/Heading";

import styles from "./styles.module.css";

const Testimonials = [
  {
    image: "gustavogoulart.jpg",
    name: "Gustavo Goulart",
    content: (
      <>
        Thanks for bring back the issue every weekday! I used to read while
        enjoying my morning coffee so happy that I can do it again! Very nice
        job, I&apos;m a fan!
      </>
    ),
    subscribeDate: "Sep 16, 2024",
  },
  {
    image: "miteshpatel.png",
    name: "Mitesh Patel",
    content: (
      <>
        Hey Basil, I just wanted to say how much I enjoy the 0xCAFE newsletter!
        Your witty commentary and insightful updates always make a good start to
        the day. The mix of tech news, quirky stories, puzzles and code repos
        keeps things fresh and engaging.
      </>
    ),
    subscribeDate: "May 24, 2024",
  },
  {
    image: "maurobaso.png",
    name: "Mauro Baso",
    content: (
      <>
        What I can say is that 0xCAFE newsletter is now part of my morning
        routine and the basis of my daily inspirational voyage. Too often we are
        diving so deep we forget to take a breath and look around, to remember
        to enjoy the journey as we head towards our destination. This is your
        work to me: a look at the world from the window and an inestimable tool
        for lateral thinking.
        <br />
        Thank you for your commitment, never enough appreciated.
      </>
    ),
    subscribeDate: "Jan 29, 2024",
  },
  {
    image: "andyalexis.jpg",
    name: "Andy Alexis",
    content: (
      <>
        I like all of the general interest tech articles you share; I am retired
        from programming so the repositories are no longer of interest to me,
        but I remember being excited about reading about them when I was a
        programmer. This is a high quality newsletter and I look forward to
        reading it every day.
      </>
    ),
    subscribeDate: "Jun 16, 2024",
  },
  {
    image: "michaelthomasross.jpg",
    name: "Michael Thomas Ross",
    content: <>Love your work, favourite newsletter of 40.</>,
    subscribeDate: "Jun 17, 2024",
  },
];

export default function TestimonialsSection() {
  const testimonialColumns = [[], [], []];
  Testimonials.forEach((testimonial, i) =>
    testimonialColumns[i % 3]!.push(testimonial),
  );

  return (
    <div className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container">
        <Heading as="h2" className={clsx("margin-bottom--lg", "text--center")}>
          Loved by many engineers
        </Heading>
        <div className={clsx("row", styles.testimonialsSection)}>
          {testimonialColumns.map((testimonialItems, i) => (
            <div className="col col--4" key={i}>
              {testimonialItems.map((testimonial) => (
                <Testimonial {...testimonial} key={testimonial.url} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
