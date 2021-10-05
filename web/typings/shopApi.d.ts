declare namespace ShopAPI {
  interface Variant {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }
  interface ProductImage {
    url: string;
    alt: string;
  }
  interface ProductAbout {
    ingredients: string[];
    instructions: string;
  }
  interface Product {
    id: string;
    // about: string;
    about: ProductAbout;
    collection: string;
    name: string;
    desc: string;
    image: ProductImage;
    quantity: number;
    price: number;
    variants?: Variant[];
  }
  interface CartProduct {
    id: string;
    name: string;
    quantity: number;
    price: number;
    variants?: Variant[];
  }
}