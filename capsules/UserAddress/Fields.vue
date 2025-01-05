<script setup lang="ts">
export type AddressFieldsModel = {
  type: "personal" | "company";
  nip: string;
  phone: string;
  fullName: string;
  street: string;
  postcode: string;
  city: string;
};

defineProps<{
  disabled?: boolean;
}>();

const addressType = defineModel<"personal" | "company">({
  default: "personal",
});
const nip = defineModel<string>("nip");
const phone = defineModel<string>("phone");
const fullName = defineModel<string>("fullName");
const street = defineModel<string>("street");
const postcode = defineModel<string>("postcode");
const city = defineModel<string>("city");

const addressTypeOptions = [
  { label: "Osoba fizyczna", value: "personal" },
  { label: "Firma", value: "company" },
];
</script>
<template>
  <UFormGroup
    class="block mb-1 text-primary-600 font-semibold"
    label="Typ"
    name="addressType"
  >
    <USelect
      :disabled="disabled"
      option-attribute="label"
      :options="addressTypeOptions"
      v-model="addressType"
      size="xl"
    />
  </UFormGroup>
  <UFormGroup label="Imię i nazwisko/Nazwa firmy" name="fullName">
    <UInput
      :disabled="disabled"
      v-model="fullName"
      size="xl"
      placeholder="Jan Kowalski"
      type="text"
    />
  </UFormGroup>
  <UFormGroup v-if="addressType == 'company'" name="nip">
    <template #label>
      <span class="block mb-1"> NIP ({{ (nip ?? "").length }} /12)</span>
    </template>
    <UInput
      :disabled="disabled"
      v-model="nip"
      size="xl"
      placeholder="Jan Kowalski"
      type="text"
    />
  </UFormGroup>
  <UFormGroup label="Numer telefonu" name="phone">
    <UInput
      :disabled="disabled"
      v-model="phone"
      size="xl"
      placeholder="555 666 777"
      type="text"
      inputmode="tel"
    />
  </UFormGroup>
  <UFormGroup label="Ulica" name="street">
    <UInput
      :disabled="disabled"
      v-model="street"
      size="xl"
      placeholder="Przykładowa 4a"
      type="text"
    />
  </UFormGroup>
  <UFormGroup label="Kod pocztowy" name="postcode">
    <UInput
      :disabled="disabled"
      v-model="postcode"
      size="xl"
      placeholder="01-001"
      type="text"
    />
  </UFormGroup>
  <UFormGroup label="Miasto" name="city">
    <UInput
      :disabled="disabled"
      v-model="city"
      size="xl"
      placeholder="Warszawa"
      type="text"
    />
  </UFormGroup>
</template>
