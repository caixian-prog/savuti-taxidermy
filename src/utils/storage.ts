const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, value);
};

const getStorage = (key: string) => {
  return localStorage.getItem(key);
};

const removeStorage = (key: string) => {
  localStorage.removeItem(key);
};

export { setStorage, getStorage, removeStorage };
