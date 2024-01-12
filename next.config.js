/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en', 'zh_cn', 'pseudo'],
    defaultLocale: 'en'
  },
  experimental: {
    swcPlugins: [['@lingui/swc-plugin', {}]]
  }
}
