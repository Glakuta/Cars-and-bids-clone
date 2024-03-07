/* eslint-disable react-hooks/rules-of-hooks */
import { useCookies } from "react-cookie";

export const getCookieAuth = (cookieName: string) => {
  const [cookies, setCookie] = useCookies([cookieName]);

  const setAuthCookie = (id: string, token: string) => {
    if (!cookies[cookieName]) {
      setCookie(cookieName, { id, token }, { path: "/" });
    }
  };

  const getAuthCookie = () => {
    return cookies[cookieName] || null;
  };

  return { setAuthCookie, getAuthCookie };
};
