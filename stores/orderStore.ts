import type { DiscountCodeData } from "~/api/discountCodes";
import type { PickupPointData } from "~/components/InPostWidget/index.vue";

export const useOrderStore = defineStore(
  "orderStore",
  () => {
    // Stores
    const cartStore = useCartStore();
    const userDataStore = useUserDataStore();

    // State
    const pickupPointFullData = ref<PickupPointData | null>(null);
    const discountCodeFullData = ref<DiscountCodeData | null>(null);
    const orderData = reactive({
      isLoggedIn: false,
      shippingType: "",
      paymentType: "",
      addressId: "",
      pickupPointCode: "",
      discountCode: "",
      orderMessage: "",
    });

    // Computed getters
    const cartWorth = computed(() => cartStore.totalPrice);

    const couponDiscount = computed(() => {
      if (!discountCodeFullData.value) return 0;

      const { discountType, discountAmount, discountAmountLeft } =
        discountCodeFullData.value;

      if (discountType == "amount") {
        return discountAmountLeft;
      }

      if (discountType == "percentage") {
        return (cartStore.totalPrice * discountAmount) / 100;
      }

      return 0;
    });

    const userDiscount = computed(() =>
      userDataStore.userState == "loggedIn" &&
      discountCodeFullData.value?.discountType != "percentage"
        ? cartStore.totalPrice * 0.05 // Przenieść do API i pobrać ze stanu
        : 0
    );

    const totalDiscount = computed(
      () => userDiscount.value + couponDiscount.value
    );

    const shippingCost = computed(() => {
      if (!orderData.paymentType) return 0;
      return orderData.paymentType == "now" ? 11.99 : 16.99; // Z API
    });

    const orderTotalPrice = computed(
      () => cartStore.totalPrice + shippingCost.value - totalDiscount.value
    );

    const isDiscountCodeApplied = computed(
      () => discountCodeFullData.value != null
    );

    // Setters
    const setPickupPointData = (data: PickupPointData | null) => {
      pickupPointFullData.value = data;
      orderData.pickupPointCode = data?.name ?? "";
    };

    const setDiscountCodeData = (data: DiscountCodeData | null) => {
      discountCodeFullData.value = data;
      orderData.discountCode = data?.id ?? "";
    };

    // Actions
    const submitOrder = () => {
      console.log("submit order");
    };

    // Return
    return {
      // Data
      orderData,
      pickupPointFullData,
      discountCodeFullData,
      cartWorth,
      couponDiscount,
      userDiscount,
      totalDiscount,
      shippingCost,
      orderTotalPrice,
      isCartEmpty: computed(() => cartStore.isCartEmpty), // Verify if this is necessary
      isDiscountCodeApplied,
      // Setters
      setPickupPointData,
      setDiscountCodeData,
      // Actions
      submitOrder,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
  }
);
