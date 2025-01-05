import { useUserApi, type UserData } from "~/api/user";
import type { LogInArgs } from "~/api/user/types";

export const useUserDataStore = defineStore("userDataStore", () => {
  const userApi = useUserApi();
  const userState = ref<"unauthenticated" | "loading" | "loggedIn">(
    "unauthenticated"
  );
  const userData = reactive<UserData>({
    id: "",
    email: "",
    marketingConsent: false,
    cart: [],
  });

  const logIn = async (args: LogInArgs) => {
    userState.value = "loading";
    const { success, data } = await userApi.logInUser(args);
    if (success) {
      Object.assign(userData, data);
      userState.value = "loggedIn";
    } else {
      userState.value = "unauthenticated";
    }
    return { success: success };
  };

  const logOut = async () => {
    userState.value = "loading";
    const { success } = await userApi.logOut();
    if (success) {
      userState.value = "unauthenticated";
      Object.assign(userData, { id: "", email: "" });
    }
    return { success };
  };

  const reloadCurrentUserData = async () => {
    userState.value = "loading";
    const { success, data } = await userApi.fetchCurrentUserData();
    if (success) {
      Object.assign(userData, data);
      userState.value = "loggedIn";
    } else {
      userState.value = "unauthenticated";
    }
  };

  const init = async () => {
    await reloadCurrentUserData();
  };

  return {
    userState,
    userData,
    logIn,
    logOut,
    reloadCurrentUserData,
    init,
  };
});
