const useRedirectWhenLoggedIn = () => {
  const route = useRoute();
  const router = useRouter();
  const userDataStore = useUserDataStore();

  const redirect = () => {
    const destination = (route?.query?.from ?? "/panel/orders") as string;
    router.push(destination);
  };

  watch(
    () => userDataStore.userState,
    (nV) => {
      if (nV === "loggedIn") {
        redirect();
      }
    }
  );

  onMounted(() => {
    if (userDataStore.userState === "loggedIn") {
      redirect();
    }
  });
};

export default useRedirectWhenLoggedIn;
