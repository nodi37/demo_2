<script setup lang="ts">
import { useProductPageApi } from "~/api/productPages";

// Stores
const cartStore = useCartStore();

// Utils
const toast = useToast();

// Gathering data
const productPageApi = useProductPageApi();
const route = useRoute();
const url = (route.params.url as Array<string>).join("/");

const { data } = await useAsyncData("productPage", async () => {
  const response = await productPageApi.getProductPageByUrl(url);
  return response;
});

if (!data.value || !data.value.success) {
  showError({
    statusCode: 404,
    message: "Nie znaleziono strony",
  });
}

const {
  metaTitle,
  metaDescription,
  name,
  slug,
  category,
  gallery,
  shortDescription,
  description,
  productMap,
  parameters,
  manufacturer,
} = data.value!.data!;

// Creating meta
useSeoMeta({
  ogLocale: "pl_PL",
  title: metaTitle,
  description: metaDescription,
  ogTitle: metaTitle,
  ogDescription: metaDescription,
  ogImage: {
    alt: gallery[0].images[0].alt,
    url: gallery[0].images[0].sources.mobile,
    height: gallery[0].images[0].height,
    width: gallery[0].images[0].width,
    type: "image/webp" as any,
  },
});

useSchemaOrg([
  defineWebSite({
    url: `/${slug}`,
    name: metaTitle,
    description: metaDescription,
    inLanguage: ["pl_PL", "PL"],
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: "home", item: "/" },
      { name: category.name, item: `/${category.slug}` },
      { name },
    ],
  }),
  defineProduct({
    name: name,
    image: gallery[0].images[0]?.sources?.standard,
    offers: productMap.map((el) => ({
      availability: el.product.availability > 0 ? "InStock" : "OutOfStock",
      priceCurrency: "PLN",
      price: el.product.bruttoPrice,
      image: el.product.miniature.sources.standard,
    })),
    brand: {
      "@type": "Brand",
      name: manufacturer.name,
    },

    // aggregateRating: {
    //   ratingValue: 88,
    //   bestRating: 100,
    //   ratingCount: 20,
    // },
    // review: [
    //   {
    //     name: "Awesome product!",
    //     author: {
    //       name: "Harlan Wilton",
    //     },
    //     reviewRating: {
    //       ratingValue: 5,
    //     },
    //   },
    // ],
  }),
]);

// Page State
const chosenItem = ref(0);
const wishListModal = ref();

// Computing state
const breadcrumbs = [
  { label: "", icon: "i-heroicons-home", to: "/" },
  { label: category.name, to: `/${category.slug}` },
  { label: name },
];

const galleryImages = computed(() =>
  gallery.flatMap(({ identifier, label, images }) =>
    images.map((image, index) => ({
      id: !index ? identifier : undefined,
      label,
      image,
    }))
  )
);

const productSelectData = productMap.map((map) => {
  const {
    label,
    product: { id, miniature, availability },
  } = map;

  return {
    id,
    label,
    image: miniature,
    disabled: availability < 1,
  };
});

const selectedProduct = computed(() => productMap[chosenItem.value]);
const maximumProductQuantitySelected = computed(
  () =>
    !(
      selectedProduct.value.product.availability >
      cartStore.getCartItemQuantity(selectedProduct.value.product.id)
    ) && selectedProduct.value.product.availability > 0
);
const disableAddToCartButton = computed(
  () =>
    selectedProduct.value.product.availability < 1 ||
    maximumProductQuantitySelected.value
);

const summary = computed(() => ({
  title: name,
  // rating: 3.5,
  price: selectedProduct.value.product.bruttoPrice,
  best30DaysPrice: selectedProduct.value.product.lastLowestPrice,
}));

// Handlers

const addItemToCart = () => {
  cartStore.addItemToCart(selectedProduct.value.product);
  toast.add({
    title: "Produkt został dodany do koszyka",
    icon: "i-solar-check-circle-outline",
    color: "green",
    timeout: 1500,
  });
};

const addItemToWishList = async () => {
  const value = await wishListModal.value.open();
  console.log("Added to list: " + value);
  toast.add({
    title: "Produkt został zapisany na liście życzeń",
    icon: "i-solar-check-circle-outline",
    color: "green",
    timeout: 1500,
  });
};
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 py-6 pt-10">
    <UBreadcrumb class="mb-8" divider=">" :links="breadcrumbs" />
    <div class="md:grid grid-cols-2 gap-12 mb-8">
      <ProductGallery
        :images="galleryImages"
        :identifier="selectedProduct.identifier"
      />
      <div class="relative col-start-2 row-start-1 row-span-2">
        <div
          class="md:sticky md:top-5 mt-6 md:mt-0 md:pt-6 md:pb-8 md:pl-6 md:border-l border-l-gray-200"
        >
          <ProductSummary v-bind="summary">
            <template #summary>
              <UiRichText :content="shortDescription" />
            </template>
          </ProductSummary>
          <form>
            <ProductSelect
              :productMap="productSelectData"
              v-model="chosenItem"
              class="mb-4"
            />
            <UAlert
              v-if="selectedProduct.product.availability > 4"
              icon="i-solar-cart-check-outline"
              variant="subtle"
              title="Produkt dostępny"
              :description="`Pozostało ${selectedProduct.product.availability} sztuk w magazynie`"
              color="green"
              class="ring-green-500 bg-green-50 dark:bg-green-400"
            />
            <UAlert
              v-if="
                selectedProduct.product.availability < 5 &&
                selectedProduct.product.availability > 0
              "
              icon="i-solar-cart-plus-outline"
              variant="subtle"
              title="Ograniczona ilość"
              :description="
                selectedProduct.product.availability == 1
                  ? 'Pozostała jedna sztuka w magazynie'
                  : `Pozostało ${selectedProduct.product.availability} sztuki w magazynie`
              "
              color="amber"
              class="ring-amber-500 bg-amber-50 dark:bg-amber-400"
            />
            <UAlert
              v-if="selectedProduct.product.availability < 1"
              icon="i-solar-cart-cross-outline"
              variant="subtle"
              title="Brak tego wariantu w magazynie."
              description="Dodaj go do listy życzeń a poinforumujemy Cię kiedy się pojawi."
              color="red"
            />
            <ClientOnly>
              <ProductActions
                class="mb-1 mt-4"
                :cartDisabled="disableAddToCartButton"
                @addToCart="addItemToCart"
                @addToWishList="addItemToWishList"
              />
            </ClientOnly>
            <span class="text-xs text-red-600 whitespace-break-spaces">{{
              maximumProductQuantitySelected
                ? "W Twoim koszyku znajduje się wszystko co mamy w magazynie"
                : "&nbsp;"
            }}</span>
          </form>
        </div>
      </div>
      <section class="mt-10 md:mt-0 pt-6 border-t border-gray-100">
        <ProductParameters :items="parameters" />
        <ProductDescriptionSection class="mt-6">
          <template #content>
            <UiRichText :content="description" />
          </template>
        </ProductDescriptionSection>
        <!-- <ProductReviewsSection class="mt-10" :reviews="reviews" /> -->
        <ProductCtaButton class="mt-16 md:hidden" />
      </section>
    </div>
  </div>
  <WishListModal ref="wishListModal" />
</template>
