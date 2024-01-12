export const loadCatalog = async (locale: string) => {
  const catalog = await import(`@lingui/loader!locales/${locale}.po`)
  return catalog.messages
}
