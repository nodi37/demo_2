export const useActionOnUrlChange = (action: Function) => {
  const route = useRoute();

  watch(
    () => route.fullPath,
    () => {
      action();
    }
  );
};
