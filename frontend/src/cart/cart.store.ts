import { writable } from "svelte/store";
import type { ICart } from "./cart.interface";

const localStorageCartData = localStorage.getItem("cart");
const cartData: ICart = JSON.parse(localStorageCartData) || {
  shippingAddressId: null,
  items: [],
  total: 0,
};

export const cart = writable(cartData);
let cartValue = cartData;

cart.subscribe((value) => {
  localStorage.setItem("cart", JSON.stringify(value));
  cartValue = value;
});

export const getCart = () => {
  return cartValue;
};

export const setCart = (cartData: ICart) => {
  localStorage.setItem("cart", JSON.stringify(cartData));
  cart.set(cartData);
};
