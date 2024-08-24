import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "☕ 0xCAFE",
  tagline: "Tech & Science Newsletter",
  favicon: "img/logo.png",

  url: "https://0xcafe.news",
  baseUrl: "/",
  organizationName: "vaspoz",
  projectName: "vaspoz.github.io",
  trailingSlash: false,
  deploymentBranch: "master",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  scripts: [
    "/js/hotjar.js",
    {
      src: "https://plausible.io/js/script.js",
      defer: true,
      "data-domain": "0xcafe.news",
    },
  ],
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        blog: {
          showReadingTime: false,
          blogSidebarCount: 20,
          blogSidebarTitle: "Last 20 Issues",
          postsPerPage: 1,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-M6CS6EMWJM",
          anonymizeIP: true,
        },
        googleTagManager: {
          containerId: "GTM-PLZHF8D9",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/social-card.png",
    colorMode: {
      disableSwitch: true,
    },
    navbar: {
      title: "0xCAFE",
      logo: {
        alt: "0xCAFE logo",
        src: "img/logo.png",
      },
      items: [
        {
          label: "Privacy",
          position: "right",
          href: "/docs/privacy",
        },
        { to: "/blog", label: "Archive", position: "right" },
        {
          type: 'html',
          position: 'right',
          value: `<a href='https://ko-fi.com/R5R6Q8N0Z' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi1.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>`,
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Privacy",
              to: "/docs/privacy",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "X",
              href: "https://twitter.com/basil_0xcafe",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/0xcafe",
            },
          ],
        },
      ],
      copyright: `${new Date().getFullYear()} Made with ❤️ in Netherlands`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
