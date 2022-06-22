import { CartAPI } from "../api/cart.api";
import type { IProduct } from "../product/IProduct";
import type { ICart, ICartItem } from "./cart.interface";
import { cart, getCart, setCart } from "./cart.store";

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

  static getItem(product: IProduct): ICartItem {
    const cart = this.getCart();
    const cartItem = cart.items.find((item) => item.product.id === product.id);
    return cartItem;
  }

  /**
   * getToal - Calculates the total price of the cart.
   */
  public static getToal() {
    const cartTotal = this.getCart().items.reduce(
      (total, item) =>
        item.available ? total + item.product.price * item.quantity : total,
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
    const cartItem = this.getItem(product);

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
      cart.items.push({ product, quantity, available: true });
    }

    this.setCart(cart);
  }

  private static getCart() {
    return getCart();
  }

  private static setCart(cart: ICart) {
    setCart(cart);
  }

  public static getItemById(productId: number) {
    const cart = this.getCart();
    const cartItem = cart.items.find((item) => item.product.id === productId);
    return cartItem;
  }

  public static setAvailable(product: IProduct, available: boolean) {
    const cart = this.getCart();
    const cartItem = cart.items.find((item) => item.product.id === product.id);

    if (cartItem) {
      cartItem.available = available;
    }

    this.setCart(cart);
  }

  public static async validate() {
    console.log("========== Validating cart ==========");

    const cart = this.getCart();
    if (cart.items.length <= 0) return;

    const api = new CartAPI();
    const request = await api.validate(cart);

    if (request === null) return;

    for (const notAvailableProduct of request.products) {
      const cartItem = Cart.getItemById(notAvailableProduct.id);
      const product = cartItem.product;

      const productAvailable = notAvailableProduct.available;
      Cart.setAvailable(product, productAvailable);

      if (productAvailable == false) {
        console.log(`product ${product.name} is not available`);
      }
    }
  }

  public static setShippingAddressId(id: number) {
    const cart = this.getCart();
    cart.shippingAddressId = id;
    this.setCart(cart);
  }

  public static getShippingAddressId() {
    const cart = this.getCart();
    return cart.shippingAddressId;
  }

  public static emptyCart() {
    this.setCart(null);
  }
}
