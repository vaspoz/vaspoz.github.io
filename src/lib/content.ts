import featureExamples from './feature-examples.json';

export const features = [
  {
    command: 'cat /dev/useless',
    title: 'Useless Fact of the Day',
    subtitle: 'Trivia you will never need, and never forget',
    examples: featureExamples.uselessFacts.slice(0, 3),
  },
  {
    command: 'git log --since=1year',
    title: 'This Day in History',
    subtitle: 'What happened on this date, with a link to read on',
    examples: featureExamples.history.slice(0, 3),
  },
  {
    command: 'news --daily',
    title: 'Daily News Updates',
    subtitle: 'The latest news in tech, business, science, and more',
    examples: featureExamples.news.slice(0, 3),
  },
  {
    command: 'sudo sabotage --corporate',
    title: 'Corporate Sabotage 101',
    subtitle: 'One field-tested tip for surviving the daily grind',
    examples: featureExamples.sabotage.slice(0, 3),
  },
  {
    command: 'git clone --trending',
    title: 'GitHub Repositories',
    subtitle: 'Daily updates on the best GitHub repositories',
    examples: featureExamples.repos.slice(0, 3),
  },
];

export const testimonials = [
  {
    image: '/testimonials/gustavogoulart.jpg',
    name: 'Gustavo Goulart',
    content: "Thanks for bring back the issue every weekday! I used to read while enjoying my morning coffee so happy that I can do it again! Very nice job, I'm a fan!",
    subscribeDate: 'Sep 16, 2024',
  },
  {
    image: '/testimonials/miteshpatel.png',
    name: 'Mitesh Patel',
    content: "Hey Basil, I just wanted to say how much I enjoy the 0xCAFE newsletter! Your witty commentary and insightful updates always make a good start to the day. The mix of tech news, quirky stories, puzzles and code repos keeps things fresh and engaging.",
    subscribeDate: 'May 24, 2024',
  },
  {
    image: '/testimonials/maurobaso.png',
    name: 'Mauro Baso',
    content: "What I can say is that 0xCAFE newsletter is now part of my morning routine and the basis of my daily inspirational voyage. Too often we are diving so deep we forget to take a breath and look around, to remember to enjoy the journey as we head towards our destination. This is your work to me: a look at the world from the window and an inestimable tool for lateral thinking. Thank you for your commitment, never enough appreciated.",
    subscribeDate: 'Jan 29, 2024',
  },
  {
    image: '/testimonials/andyalexis.jpg',
    name: 'Andy Alexis',
    content: "I like all of the general interest tech articles you share; I am retired from programming so the repositories are no longer of interest to me, but I remember being excited about reading about them when I was a programmer. This is a high quality newsletter and I look forward to reading it every day.",
    subscribeDate: 'Jun 16, 2024',
  },
  {
    image: '/testimonials/michaelthomasross.jpg',
    name: 'Michael Thomas Ross',
    content: 'Love your work, favourite newsletter of 40.',
    subscribeDate: 'Jun 17, 2024',
  },
];

export const creatorStory = `I've been in the IT industry for years, and like many of you, being an IT engineer means never stopping learning.

Reading articles, news, and doomscrolling GitHub repositories became a daily routine.

Then adulthood hit and I got a bit lazy. So, what does an IT guy do? Automate, of course! I built a CLI tool to quickly grab all the morning info I needed. Eventually, I decided to share it and dive into the newsletter world.

Now, here we are—over a year, 400+ issues, and a thriving website. A huge thank you to everyone who subscribes to my newsletter; your support keeps me energized to grow and create new content!`;

export const privacyPolicy = `# Privacy Policy

This Privacy Policy describes how we collect, use, and disclose personal information that we collect from individuals who sign up for our newsletter. By signing up for our newsletter, you consent to the collection, use, and disclosure of your personal information in accordance with this policy.

## Information we collect

When you sign up for our newsletter, we collect your email address. We may also collect other information that you voluntarily provide to us, such as your last name, location, or interests.

## How we use your information

We use your information to send you our newsletter, which may include news, updates, promotions, or other information related to our products and services. We may also use your information to improve our newsletter and to customize its content to better meet your interests.

## Disclosure of your information

We do not sell, trade, or rent your personal information to third parties. We may disclose your information to our service providers who assist us in sending our newsletter and maintaining our website. We may also disclose your information if required by law or to protect our legal rights.

## Security of your information

We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, we cannot guarantee that your information will be completely secure.

## Retention of your information

We will retain your personal information for as long as necessary to fulfill the purposes for which it was collected or as required by law. If you wish to unsubscribe from our newsletter or have your personal information deleted from our records, please contact me at basil@0xcafe.news.

## Changes to our privacy policy

We reserve the right to modify this Privacy Policy at any time. We will post the updated Privacy Policy on our website and notify you of any significant changes.

## Contact me

If you have any questions or concerns about our Privacy Policy, please contact me at basil@0xcafe.news.`;
