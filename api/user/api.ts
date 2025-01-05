import type { Response } from "../shared";
import { convertUserPayload } from "./converter";
import { fakeData } from "./fakeData";

import type {
  LogInArgs,
  LogInResponseObject,
  SignUpArgs,
  SignUpResponse,
  UserData,
} from "./types";

export const useUserApi = () => {
  const API_URL = useRuntimeConfig().public.API_URL;
  //if (!API_URL) throw new Error("NO API_URL SET");

  // For demo only
  function saveToLocalStorage(key: string, value: unknown) {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  const signUpUser = async (userData: SignUpArgs) => {
    try {
      const req = await $fetch<SignUpResponse>(
        API_URL + "/api/customers?depth=999",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      return { success: true, data: req.message };
    } catch (error) {
      console.log(error);
      return { success: false, code: 999 };
    }
  };

  const logInUser = async (
    credentials: LogInArgs
  ): Promise<Response<UserData>> => {
    try {
      // const req = await $fetch<LogInResponseObject>(
      //   API_URL + "/api/customers/login?depth=999",
      //   {
      //     method: "post",
      //     credentials: "include",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(credentials),
      //   }
      // );

      const { email, password } = credentials;
      const credentialsValid =
        email == fakeData.email && password == fakeData.password;

      if (!credentialsValid) {
        return { success: false };
      }

      saveToLocalStorage("isLoggedIn", true);

      return { success: true, data: convertUserPayload(fakeData) };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  const logOut = async () => {
    try {
      // await $fetch(API_URL + "/api/customers/logout?depth=999", {
      //   method: "post",
      //   credentials: "include",
      // });

      saveToLocalStorage("isLoggedIn", false);
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  const fetchCurrentUserData = async (): Promise<Response<UserData>> => {
    try {
      // const req = await $fetch<LogInResponseObject>(
      //   API_URL + "/api/customers/me?depth=999",
      //   {
      //     method: "get",
      //     credentials: "include",
      //   }
      // );

      if (typeof localStorage == "undefined") {
        return { success: false };
      }

      const value = localStorage.getItem("isLoggedIn");

      if (value != "true") {
        return { success: false };
      }

      return { success: true, data: convertUserPayload(fakeData) };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  return {
    signUpUser,
    logInUser,
    logOut,
    fetchCurrentUserData,
  };
};
