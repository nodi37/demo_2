<script setup lang="ts">
export type PickupPointData = {
  address: {
    line1: string;
    line2: string;
  };
  name: string;
  openingHours: string;
};

const emit = defineEmits<{
  (e: "pointSelected", value: PickupPointData): void;
}>();

const pointSelectHandler = (point: any) => {
  const { address, name, opening_hours } = point.detail;
  emit("pointSelected", { address, name, openingHours: opening_hours });
};

const removeUnnecessaryIFrameRenders = () => {
  const allOccurances = document.querySelectorAll(
    "#geowidget-v5-iframe-render"
  );
  allOccurances.forEach((node, index) => index && node.remove());
};

onMounted(() => {
  const widgetCore = document.getElementById("ip-gw-core");
  const widgetDestination = document.getElementById("ip-gw-visible");

  if (widgetCore) {
    widgetDestination?.appendChild(widgetCore);
    widgetCore.addEventListener("onpointselect", pointSelectHandler);
  }

  removeUnnecessaryIFrameRenders();
});

onBeforeUnmount(() => {
  const widgetCore = document.getElementById("ip-gw-core");
  const widgetDestination = document.getElementById("ip-gw-hidden");

  if (widgetCore) {
    widgetDestination?.appendChild(widgetCore);
    widgetCore.removeEventListener("onpointselect", pointSelectHandler);
  }

  removeUnnecessaryIFrameRenders();
});
</script>
<template>
  <div id="ip-gw-visible" class="h-[600px] overflow-hidden" />
</template>
