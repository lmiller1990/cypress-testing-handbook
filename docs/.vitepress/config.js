export default {
  title: 'Cypress Testing Handbook',
  description: 'Just playing around.',
  // base: '/cypress-testing-handbook/',
  themeConfig: {
    sidebar: [
      {
        text: 'Basics',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Testing Props', link: '/testing-props' },
          { text: 'Computed Properties', link: '/computed-properties' },
        ]
      },
      {
        text: 'Integrating with Third Party Libraries',
        items: [
          { text: 'Vuetify', link: '/vuetify' },
        ]
      },

    ]
  }
}
