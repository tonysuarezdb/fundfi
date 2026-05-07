import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en'],
  defaultLocale: 'en',
  // No /en/ prefix in URLs — add 'es' to locales when Spanish is needed
  localePrefix: 'never',
});
