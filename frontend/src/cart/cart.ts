import { CartAPI } from "../api/cart.api";
import type { IProduct } from "../product/IProduct";
import type { ICart, ICartItem } from "./cart.interface";
import { cart, getCart, setCart } from "./cart.store";

export class Cart {
  public static getCartStore() {
    return cart;
  }

  public static getCart() {
    return getCart();
  }

  public static setCart(cart: ICart) {
    setCart(cart);
  }

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

  public static getItem(product: IProduct): ICartItem {
    const cart = this.getCart();
    if (!cart?.items) return null;
    const cartItem = cart.items.find((item) => item.product.id === product.id);
    return cartItem;
  }

  /**
   * getToal - Calculates the total price of the cart.
   */
  public static getTotal() {
    const cart = this.getCart();
    if (!cart?.items) return 0;

    const cartTotal = cart.items.reduce((total, item) => {
      return item.available
        ? total + item.product.price * item.quantity
        : total;
    }, 0);

    return cartTotal.toFixed(2);
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

  public static getItemByProductId(productId: number) {
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
    console.log("Validating cart");

    const cart = this.getCart();

    if (!cart?.items) return;
    if (cart.items.length <= 0) return;

    const cartApi = new CartAPI();
    const request = await cartApi.validate(cart);

    if (request === null) return;

    for (const notAvailableProduct of request.products) {
      // get product by id
      const cartItem = Cart.getItemByProductId(notAvailableProduct.id);
      const product = cartItem.product;
      // set available status
      const productAvailable = notAvailableProduct.available;
      Cart.setAvailable(product, productAvailable);
      // log available status
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
    this.setCart({ shippingAddressId: null, items: [], total: 0 });
  }
}
