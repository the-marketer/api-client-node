// @ts-check
const { themes } = require('prism-react-renderer');

// NOTE: adjust `url`, `baseUrl`, `organizationName`, `projectName` to match the
// repository that hosts this site (defaults assume GitHub Pages at
// https://the-marketer.github.io/api-client-node/).

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'The Marketer API Client',
  tagline: 'Client documentation for Node.js / TypeScript integrations',
  favicon: 'img/favicon.ico',
  url: 'https://the-marketer.github.io',
  baseUrl: '/api-client-node/',
  organizationName: 'the-marketer',
  projectName: 'api-client-node',
  trailingSlash: false,

  onBrokenLinks: 'warn',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */ ({
        docs: {
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */ ({
      image: 'img/logo-partial.svg',
      navbar: {
        title: 'API Client Docs',
        logo: {
          alt: 'The Marketer Logo',
          src: 'img/logo-partial.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docs',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/the-marketer/api-client-node',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `© ${new Date().getFullYear()} The Marketer API Client.`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
        additionalLanguages: ['bash', 'json'],
      },
    }),
};

module.exports = config;
