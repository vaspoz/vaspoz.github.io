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
          trackingID: "G-REDACTED",
          anonymizeIP: true,
        },
        googleTagManager: {
          containerId: "GTM-REDACTED",
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
