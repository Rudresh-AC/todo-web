import localforage from "localforage";

const storage = localforage.createInstance({
  name: "myAppStorage",
});

export const setItem = async (key, value) => {
  await storage.setItem(key, value);
};

export const getItem = async (key) => {
  return await storage.getItem(key);
};

export const removeItem = async (key) => {
  await storage.removeItem(key);
};
