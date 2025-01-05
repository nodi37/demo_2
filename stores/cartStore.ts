import { useProductApi, type ProductData } from "~/api/products";
import type { UserData } from "~/api/user";

export const useCartStore = defineStore(
  "cartStore",
  () => {
    const productApi = useProductApi();
    const storeState = ref<"" | "initialized">("");
    const cartData = ref<UserData["cart"]>([]);
    const currentUserId = ref("");

    const itemsCount = computed(() =>
      cartData.value.reduce((pV, cV) => pV + cV.quantity, 0)
    );

    const isCartEmpty = computed(() => cartData.value.length < 1);

    const totalPrice = computed(() =>
      cartData.value.reduce(
        (pV, cV) => pV + cV.quantity * cV.product.bruttoPrice,
        0
      )
    );

    const getCartItemQuantity = (id: string) => {
      const currentItem = cartData.value.find((item) => item.product.id == id);
      return currentItem?.quantity ?? 0;
    };

    const addItemToCart = (
      product: ProductData,
      quantity: number = 1,
      priceWhenAdded?: number
    ) => {
      const currentItem = cartData.value.find(
        (item) => item.product.id == product.id
      );

      if (currentItem) {
        increaseItemQuantity(product.id);
        return;
      }

      cartData.value.push({
        quantity,
        priceWhenAdded: priceWhenAdded ? priceWhenAdded : product.bruttoPrice,
        product: product,
      });
    };

    const removeItemFromCart = (id: string) => {
      const filteredItems = cartData.value.filter(
        (item) => item.product.id !== id
      );
      cartData.value = filteredItems;
    };

    const decreaseItemQuantity = (id: string) => {
      const currentItem = cartData.value.find((item) => item.product.id == id);
      if (!currentItem) return;
      const newQuantityValue = currentItem.quantity - 1;
      if (newQuantityValue < 1) return;
      currentItem.quantity = newQuantityValue;
    };

    const increaseItemQuantity = (id: string) => {
      const currentItem = cartData.value.find((item) => item.product.id == id);
      if (!currentItem) return;
      currentItem.quantity += 1;
    };

    // Internal Methods
    const saveCartOnServer = async () => {
      console.log("save cart on server");
    };

    const reloadCartProductsData = async () => {
      cartData.value.forEach(async (item) => {
        const { success, data: updatedProductData } =
          await productApi.getProductById(item.product.id);

        return {
          ...item,
          withdrawn: !success,
          product: success ? updatedProductData : item.product,
        };
      });
    };

    const mergeLocalAndRemoteCarts = (remoteCartData: UserData["cart"]) => {
      remoteCartData.forEach((cartItem) => {
        const { product, quantity, priceWhenAdded } = cartItem;
        const cartItemQuantity = getCartItemQuantity(cartItem.product.id);
        if (cartItemQuantity > 0) return;
        addItemToCart(product, quantity, priceWhenAdded);
      });
    };

    const init = async (userData: UserData) => {
      storeState.value = "";
      currentUserId.value = userData.id;

      if (isCartEmpty.value) {
        cartData.value = userData.cart;
      }

      if (!isCartEmpty.value && userData.cart.length > 0) {
        mergeLocalAndRemoteCarts(userData.cart);
      }

      await reloadCartProductsData();
      if (userData.id) {
        await saveCartOnServer();
      }
      storeState.value = "initialized";
    };

    // Watch for changes and save data
    watch(
      () => cartData,
      () => {
        if (storeState.value == "initialized" && currentUserId.value) {
          saveCartOnServer();
        }
      }
    );

    return {
      // Getters
      cartData,
      itemsCount,
      totalPrice,
      isCartEmpty,
      getCartItemQuantity,
      // Methods
      addItemToCart,
      removeItemFromCart,
      decreaseItemQuantity,
      increaseItemQuantity,
      // Initializer
      init,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
  }
);
