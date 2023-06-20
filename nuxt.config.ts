// https://nuxt.com/docs/api/configuration/nuxt-config

import get_http_adapter_instance from './.nest/nest.js';
const is_dev = process.env.NODE_ENV === 'development';
const frontend_url = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/`;
const backend_url = is_dev
  ? `${process.env.PROTOCOL}://${process.env.HOST}:${
      Number(process.env.PORT) + 1
    }/`
  : `${frontend_url}`;

export default async () => {
  return defineNuxtConfig({
    alias: {
      '@/prisma/*': './prisma/*',
    },
    devtools: { enabled: true },
    workspaceDir: '.',
    srcDir: 'client/',
    modules: [
      '@nuxtjs/i18n',
      '@nuxtjs/apollo',
      '@nuxtjs/tailwindcss',
      '@nuxtjs/color-mode',
      'dayjs-nuxt',
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt',
    ],
    serverHandlers: is_dev
      ? []
      : [{ route: '/', handler: await get_http_adapter_instance() }],

    apollo: {
      autoImports: true,
      authType: 'Bearer',
      authHeader: 'Authorization',
      tokenStorage: 'cookie',
      proxyCookies: true,
      clients: {
        default: {
          httpEndpoint: `${backend_url}graphql`,
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
      baseUrl: frontend_url,
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

    pinia: {
      autoImports: ['defineStore'],
    },

    piniaPersistedstate: {
      cookieOptions: {
        maxAge: 60 * 60 * 24 * 30,
      },
    },
  });
};
