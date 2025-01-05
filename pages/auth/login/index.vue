<script setup lang="ts">
import { object, string } from "yup";
const userDataStore = useUserDataStore();
const toast = useToast();
const formState = ref<"idle" | "loading">("idle");
const formData = reactive({
  email: "",
  password: "",
});
const schema = object({
  email: string()
    .email("To pole musi zawierać prawidłowy adres email")
    .required("Adres email jest wymagany"),
  password: string()
    .min(8, "Hasło musi posiadać conajmniej 8 znaków")
    .max(48, "Hasło nie może mieć więcej niż 48 znaków")
    .required("Hasło jest wymagane"),
});

const onSubmit = async () => {
  formState.value = "loading";
  const { success } = await userDataStore.logIn(formData);
  if (success) {
    toast.add({
      title: "Pomyślnie zalogowano!",
      icon: "i-solar-check-circle-outline",
      color: "green",
      timeout: 1000,
    });
  }

  toast.add({
    title: "Błąd logowania",
    description: "Nieprawidłowy login lub hasło!",
    color: "red",
  });
  formState.value = "idle";
};

useRedirectWhenLoggedIn();
useHead({
  title: ":: 4Ride.pl :: Logowanie",
});
</script>

<template>
  <div class="relative w-full h-full max-w-7xl mx-auto flex justify-center">
    <div class="max-w-96 w-full p-5 lg:p-8 md:mt-20">
      <h1 class="text-2xl mb-6 text-center">Zaloguj się</h1>
      <UForm
        class="flex flex-col gap-4 lg:gap-6"
        :state="formData"
        :schema="schema"
        @submit="onSubmit"
      >
        <UFormGroup
          class="block mb-1 text-primary-600 font-semibold"
          label="Adres e-mail"
          name="email"
        >
          <UInput
            :disabled="formState == 'loading'"
            v-model="formData.email"
            size="xl"
            placeholder="email@wp.pl"
            type="email"
          />
        </UFormGroup>
        <UFormGroup label="Hasło" name="password">
          <UInput
            :disabled="formState == 'loading'"
            v-model="formData.password"
            size="xl"
            placeholder="Twoje hasło"
            type="password"
          />
        </UFormGroup>
        <UFormGroup>
          <UButton
            :disabled="formState == 'loading'"
            :loading="formState == 'loading'"
            size="xl"
            class="w-full justify-center"
            type="submit"
          >
            Zaloguj się
          </UButton>
        </UFormGroup>
      </UForm>
      <NuxtLink
        class="block text-center mt-2 text-sm text-slate-400 hover:underline"
        href="/auth/forgot-password"
      >
        Zapomniałeś hasła? Kliknij tutaj.
      </NuxtLink>
    </div>
  </div>
</template>
