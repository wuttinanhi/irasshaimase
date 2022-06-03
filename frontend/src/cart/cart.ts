import type { IProduct } from "../product/IProduct";
import { cart, getCart, setCart } from "./cart-storage";
import type { ICart } from "./ICart";

export class Cart {
  /**
   * addItem - Adds a product to the cart.
   */
  public static addItem(product: IProduct, quantity: number) {
    const previousQuantity = this.getItemQuantity(product);
    this.setItem(product, previousQuantity + quantity);
  }

  /**
   * removeItem - Removes an item from the cart.
   */
  public static removeItem(product: IProduct, quantity: number) {
    const previousQuantity = this.getItemQuantity(product);
    this.setItem(product, previousQuantity - quantity);
  }

  /**
   * getToal - Calculates the total price of the cart.
   */
  public static getToal() {
    const cartTotal = this.getCart().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    return cartTotal.toFixed(2);
  }

  public static getCartStore() {
    return cart;
  }

  /**
   * getItemQuantity - Returns the quantity of a product in the cart.
   */
  public static getItemQuantity(product: IProduct): number {
    const cart = this.getCart();
    const cartItem = cart.items.find((item) => item.product.id === product.id);

    if (cartItem) {
      return cartItem.quantity;
    }

    return 0;
  }

  /**
   * setItemQuantity - Sets the quantity of a product in the cart.
   */
  public static setItem(product: IProduct, quantity: number) {
    const cart = this.getCart();
    const cartItem = cart.items.find((item) => item.product.id === product.id);

    if (cartItem) {
      // remove item if quantity <= 0
      if (quantity <= 0) {
        cart.items = cart.items.filter(
          (item) => item.product.id !== product.id
        );
      } else {
        cartItem.quantity = quantity;
      }
    } else {
      cart.items.push({ product, quantity });
    }

    this.setCart(cart);
  }

  private static getCart() {
    return getCart();
  }

  private static setCart(cart: ICart) {
    setCart(cart);
  }
}
