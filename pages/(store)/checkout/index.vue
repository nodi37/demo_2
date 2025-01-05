<script setup lang="ts">
import { object, string } from "yup";

useHead({
  title: ":: 4Ride.pl :: Finalizacja zamówienia",
});

const orderStore = useOrderStore();
const userDataStore = useUserDataStore();

const formValidationSchema = object({
  addressId: string()
    .required("Musisz wybrać adres")
    .notOneOf(["new"], "Zapisz adres zanim złożysz zamówienie"),
  paymentType: string().required("Musisz wybrać typ płatności"),
  shippingType: string().required("Musisz wybrać sposób wysyłki"),
  pickupPointCode: string().when("shippingType", {
    is: "pickupPoint",
    then: (schema) => schema.required("Musisz wybrać punkt"),
  }),
});

// Handling input errors
const controlsErrors = reactive<Record<string, string | undefined>>({});

// Re-checking errors when values are changing
watch(orderStore.orderData, (orderDataValue) => {
  Object.keys(controlsErrors).forEach((key) => {
    const newContentForCurrentKey =
      orderDataValue[key as keyof typeof orderDataValue];
    if (newContentForCurrentKey) {
      controlsErrors[key] = undefined;
    }
  });
});

// Form error handlers
type FieldErrors = Array<{ path: string; message: string }>;

const assignErrorsToControls = (errors: FieldErrors) => {
  errors.forEach(({ path, message }) => (controlsErrors[path] = message));
};

const checkAndScrollToFailingDOMElement = (path: string) => {
  const errorElement = document.getElementById(path);
  if (!errorElement) {
    // Will throw only under development
    throw new Error(
      `checkAndScrollToFailingElement function failed. Couldn't find element with id ${path}, check your components configuration.`
    );
  }

  window.scrollTo({
    top: (errorElement?.offsetTop ?? 0) - 40,
    behavior: "smooth",
  });
};

const mainFormErrorHandler = ({ errors }: { errors: FieldErrors }) => {
  assignErrorsToControls(errors);

  const firstErroredElementPath = errors[0]?.path;
  if (!document || !window || !firstErroredElementPath) return;
  checkAndScrollToFailingDOMElement(firstErroredElementPath);
};

// Components v-ifs
const showGeoWidget = computed(
  () =>
    orderStore.orderData.shippingType == "pickupPoint" &&
    !orderStore.orderData.pickupPointCode
);
const showPickupPointData = computed(() => {
  return (
    orderStore.orderData.shippingType == "pickupPoint" &&
    orderStore.orderData.pickupPointCode
  );
});
</script>
<template>
  <div class="h-full">
    <ClientOnly>
      <div class="h-full max-w-7xl lg:pl-4 xl:px-4 mx-auto lg:flex">
        <!-- LEFT COLUMN -->
        <div class="flex-1 p-4 sm:p-8 md:p-12 lg:pl-0">
          <h1 class="font-semibold text-3xl mb-6 text-gray-700">
            Dokończ zamówienie:
          </h1>

          <NonLoggedInNotification
            v-if="userDataStore.userState !== 'loggedIn'"
            class="mb-8"
          />

          <h2 class="font-medium text-xl mb-3 text-gray-700">
            Dane do faktury i adres:
          </h2>

          <!-- Address Data -->
          <AddressControls class="mb-4" :error="controlsErrors.addressId" />

          <!-- Payment -->
          <PaymentControls class="mb-4" :error="controlsErrors.paymentType" />

          <!-- SHIPPING -->
          <ShippingTypeControls
            class="mb-4"
            :error="
              controlsErrors.shippingType || controlsErrors.pickupPointCode
            "
          />

          <InPostWidget
            v-if="showGeoWidget"
            @point-selected="orderStore.setPickupPointData"
          />

          <PickupPointInfo v-if="showPickupPointData" />
        </div>

        <!-- RIGHT COLUMN -->
        <div class="flex-1 lg:pt-10 bg-slate-50 shadow">
          <div class="sticky top-0 p-4 sm:p-8 md:p-12 pb-10 lg:pt-8">
            <h2 class="font-semibold text-2xl mb-6 text-gray-700">
              Twój koszyk:
            </h2>

            <!-- CART CONTENT -->
            <p v-if="orderStore.isCartEmpty" class="mb-10 text-gray-500">
              Nic tu nie ma...
            </p>
            <CartContent v-else class="mb-8" />

            <!-- COUPON CODE CONTROL -->
            <DiscountCodeControl class="mb-4" />

            <!-- ORDER MESSAGE -->
            <OrderMessage class="mb-4" />

            <!-- PRICING ABOVE BUTTON-->
            <PriceInfo />

            <UForm
              class="h-full"
              :state="orderStore.orderData"
              :schema="formValidationSchema"
              @submit="orderStore.submitOrder"
              @error="mainFormErrorHandler"
            >
              <!-- ORDER NOW BUTTON -->
              <UTooltip
                class="w-full"
                :text="
                  orderStore.isCartEmpty
                    ? 'Dodaj coś do koszyka aby dokończyć zamówienie'
                    : ''
                "
              >
                <UButton
                  size="xl"
                  class="mt-8 mb-3 py-4"
                  type="submit"
                  :disabled="orderStore.isCartEmpty"
                  block
                >
                  Złóż zamówienie
                </UButton>
              </UTooltip>
            </UForm>

            <!-- REDIRECT INFO -->
            <PaymentRedirectInfo
              v-if="orderStore.orderData.paymentType == 'now'"
            />
          </div>
        </div>
      </div>

      <template #fallback>
        <CheckoutSkeletonFallback />
      </template>
    </ClientOnly>
  </div>
</template>
