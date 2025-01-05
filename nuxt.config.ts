// @ts-nocheck
import { logoDark } from "./config/logos";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxt/fonts",
    "nuxt-schema-org",
    "pinia-plugin-persistedstate/nuxt",
  ],
  experimental: {
    componentIslands: true,
  },
  hooks: {
    "pages:extend"(pages) {
      const pagesToRemove: NuxtPage[] = [];
      pages.forEach((page) => {
        if (page.path.includes("component")) pagesToRemove.push(page);
      });

      pagesToRemove.forEach((page: NuxtPage) => {
        pages.splice(pages.indexOf(page), 1);
      });
    },
  },
  components: [
    "~/components",
    "~/capsules",
    {
      path: "~/pages",
      pattern: "**/components/**",
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      GEO_WIDGET_TOKEN: process.env.GEO_WIDGET_TOKEN,
    },
  },
  app: {
    head: {
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/favicon/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },
  schemaOrg: {
    defaults: false,
    meta: {
      host: "https://4Ride.pl",
    },
    identity: {
      "@type": "Organization",
      name: "4Ride.pl",
      logo: logoDark.sources.standard,
      url: "https://4Ride.pl",
      sameAs: [
        // Facebook
        // TikTok
        // Instagram
        // YouTube
      ],
    },
  },
  // prerender: {
  //   routes: ["/product/epoca-surf-pokrowiec-rl2289542"],
  // Dodać tu fetcha z payloada!
  // },
  // tailwindcss: {
  //   config: {
  //     theme: {
  //       extend: {

  //       },
  //     },
  //   },
  // },
});
