// https://nuxt.com/docs/api/configuration/nuxt-config

const base_url = 'http://localhost:3000';

export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src/',
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/apollo',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'dayjs-nuxt',
  ],

  apollo: {
    clients: {
      default: {
        httpEndpoint: `${base_url}/graphql`,
      },
    },
  },

  i18n: {
    langDir: 'locales',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        isCatchallLocale: true,
        file: 'en-US.json',
      },
      {
        code: 'de',
        iso: 'de-DE',
        name: 'Deutsch',
        file: 'de-DE.json',
      },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'en',
    },
    baseUrl: base_url,
    lazy: true,
  },

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },

  dayjs: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    defaultTimezone: 'Europe/Berlin',
    plugins: ['localizedFormat', 'timezone'],
  },

  tailwindcss: {
    configPath: 'tailwind.config.ts',
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
