import { writable } from "svelte/store";
import type { IUserStore } from "./user.interface";

export const userStore = writable<IUserStore>(null);

let userValue: IUserStore = null;
userStore.subscribe((value) => {
  userValue = value;
});

export const getUser = () => {
  return userValue;
};

export function setUser(user: IUserStore) {
  userStore.set(user);
}
