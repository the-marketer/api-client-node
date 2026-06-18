// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'intro',
    'overview',
    'quickstart',
    'authentication',
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'orders',
        'subscribers',
        'campaigns',
        'products',
        'transactionals',
        'reports',
        'events',
        'coupons',
        'loyalty',
        'reviews',
        'app-push',
      ],
    },
    'credentials-utilities',
    'errors',
    'claude-skill',
    {
      type: 'category',
      label: 'Framework Integrations',
      items: ['integrations/nestjs', 'integrations/nodemailer'],
    },
  ],
};

module.exports = sidebars;
