<template>
  <UNotification
    class="shadow"
    id="NonLoggedInNotification"
    :timeout="0"
    :close-button="{ disabled: true, icon: '' }"
  >
    <template #title>
      <span class="block text-base text-red-500 mb-2">
        Uwaga, nie jesteś zalogowany!
      </span>
    </template>
    <template #description>
      <p class="mb-3">
        Masz już konto?
        <NuxtLink
          class="underline underline-offset-4 text-primary-500"
          to="/auth/login?from=/checkout"
        >
          Zaloguj się tutaj.
        </NuxtLink>
      </p>
      <p class="mb-1">
        Nie masz jeszcze konta?
        <NuxtLink
          class="underline underline-offset-4 text-primary-500"
          to="/auth/register?from=/checkout"
        >
          Zarejestruj się!
        </NuxtLink>
      </p>
      <p class="mb-3">Rabat już od pierwszego zamówienia!</p>
      <!-- <ul class="mt-1 mb-2 flex flex-col gap-px list-disc list-inside">
	              <li>Rabat już od pierwszego zamówienia</li>
	              <li>Darmowe zwroty</li>
	              <li>System rabatowy</li>
	              <li>I inne...</li>
	            </ul> -->
      <p>Lub kontynuuj bez logowania...</p>
    </template>
  </UNotification>
</template>
