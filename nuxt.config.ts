import { Configuration } from '@nuxt/types';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
    }
  }
}

const description = 'This is a demo Nuxt-TS app.';

const config: Configuration = {
  head: {
    title: 'Simple Shop',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: description
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: '/objectFitPolyfill.basic.min.js', defer: true }]
  },

  meta: {
    lang: 'en',
    name: 'Simple Shop',
    description,
    author: 'Robert Piosik',
    theme_color: '#000'
  },

  manifest: {
    name: 'Simple Shop',
    short_name: 'Simple Shop',
    description,
    background_color: '#fff',
    theme_color: '#000'
  },

  css: ['normalize.css/normalize.css', 'assets/css/style.css'],

  styleResources: {
    scss: ['assets/scss/mixins.scss', 'assets/scss/variables.scss']
  },

  modules: ['@nuxtjs/pwa', '@nuxtjs/sitemap', '@nuxtjs/style-resources'],

  buildModules: ['@nuxt/typescript-build', 'nuxt-typed-vuex'],

  build: {
    extend(config, ctx) {},
    loaders: {
      cssModules: {
        modules: {
          localIdentName:
            process.env.NODE_ENV === 'development'
              ? '[name]__[local]'
              : '[hash:base64:5]'
        }
      }
    },
    transpile: [/typed-vuex/],
    postcss: {
      preset: {
        autoprefixer: {
          grid: 'autoplace'
        }
      }
    }
  },

  sitemap: {
    hostname: 'https://nuxt-ts-shop.netlify.com',
    gzip: true
  },

  modern: 'client',

  generate: {
    fallback: true,
    dir: '../out'
  },

  rootDir: 'src/',

  env: {
    nodeEnv: process.env.NODE_ENV
  },

  server: {
    port: '3000',
    host: '0.0.0.0'
  }
};

export default config;
