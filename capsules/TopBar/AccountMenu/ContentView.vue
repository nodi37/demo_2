<script setup lang="ts">
const userDataStore = useUserDataStore();
const router = useRouter();
const toast = useToast();
const items = [
  { text: "Zamówienia", href: "/panel/orders" },
  { text: "Listy życzeń", href: "/panel/wish-lists" },
  { text: "Moje adresy", href: "/panel/addresses" },
  { text: "Ustawienia konta", href: "/panel/account" },
];

const handleLogout = async () => {
  const { success } = await userDataStore.logOut();
  if (success) {
    toast.add({
      title: "Zostałeś wylogowany!",
      icon: "i-solar-check-circle-outline",
      color: "green",
      timeout: 1500,
    });
    router.push("/");
  } else {
    toast.add({
      title: "Coś poszło nie tak!",
      description: "To wina serwera. Spróbuj ponownie!",
      icon: "i-solar-check-circle-outline",
      color: "red",
      timeout: 1500,
    });
  }
};
</script>
<template>
  <nav>
    <ul>
      <li class="border-b" v-for="item in items">
        <NuxtLink
          class="py-2 px-4 block hover:underline decoration-primary-500 transition-all"
          :href="item.href"
        >
          {{ item.text }}
        </NuxtLink>
      </li>
      <li>
        <UButton
          class="py-2 px-4"
          color="red"
          variant="link"
          @click="handleLogout"
        >
          Wyloguj się
        </UButton>
      </li>
    </ul>
  </nav>
</template>
