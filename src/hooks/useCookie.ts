import Cookies from 'js-cookie';

export const getCookie = (key: string) => {
  return Cookies.get(key);
};

export const setCookie = (key: string, value: string) => {
  Cookies.set(key, value, { expires: 365 }); // Устанавливаем cookie на 1 год
};
