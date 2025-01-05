<script setup lang="ts">
useHead({
  script: [
    {
      key: "inpost-pickuppoint-geowidget",
      src: "https://geowidget.inpost.pl/inpost-geowidget.js",
      async: true,
      defer: true,
    },
  ],
  link: [
    {
      rel: "stylesheet",
      href: "https://geowidget.inpost.pl/inpost-geowidget.css",
    },
  ],
});

const token = useRuntimeConfig().public.GEO_WIDGET_TOKEN;

const geoWidgetSettings = {
  id: "ip-gw-core",
  token,
  language: "pl",
  config: "parcelcollect",
  onpoint: "onpointselect",
};
</script>
<template>
  <div class="hidden" id="ip-gw-hidden">
    <component is="inpost-geowidget" v-bind="geoWidgetSettings" />
  </div>
</template>
