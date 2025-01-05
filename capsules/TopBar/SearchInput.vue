<script setup lang="ts">
const loading = ref(false);
const selected = ref();
const router = useRouter();

watch(selected, (nV) => {
  router.push(`/product/${nV.id}`);
});

async function search(q: string) {
  loading.value = true;

  const users: any[] = await $fetch(
    "https://jsonplaceholder.typicode.com/users",
    { params: { q } }
  );

  loading.value = false;

  return users;
}
</script>

<template>
  <UInputMenu
    v-model="selected"
    :search="search"
    :loading="loading"
    option-attribute="name"
    trailing
    size="lg"
    by="id"
    placeholder="Szukaj..."
    trailing-icon="i-solar-minimalistic-magnifer-line-duotone"
  >
    <template #option="{ option: person }">
      <span :href="person.name">{{ person.name }}</span>
    </template>
  </UInputMenu>
</template>
