import Product1 from '@assets/product_1.png';
import Product2 from '@assets/product_2.png';
import Product3 from '@assets/product_3.png';
import Product4 from '@assets/product_4.png';
import Product5 from '@assets/product_5.png';
import Product6 from '@assets/product_6.png';

export const Products: ShopAPI.Product[] = [
  {
    id: '1',
    about: {
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      instructions: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem"
    },
    collection: 'body-care',
    name: 'Oatmeal Body Butter',
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem',
    image: {url: Product1, alt: 'Oatmeal Body Butter'},
    quantity: 20,
    price: 22,
    variants: [
      {
        id: '1_1',
        name: '13oz',
        price: 22,
        quantity: 20
      }
    ]
  },
  {
    id: '2',
    about: {
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      instructions: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem"
    },
    collection: 'face-care',
    name: 'Face Oil',
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem',
    image: {url: Product2, alt: 'Face Oil'},
    quantity: 0,
    price: 18,
    variants: [
      {
        id: '2_1',
        name: '16oz',
        price: 18,
        quantity: 20
      },
      {
        id: '2_2',
        name: '24oz',
        price: 24,
        quantity: 20
      },
    ]
  },
  {
    id: '3',
    about: {
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      instructions: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem"
    },
    collection: 'face-care',
    name: 'Detoxifying Clay Mask',
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem',
    image: {url: Product3, alt: 'Detoxifying Clay Mask'},
    quantity: 0,
    price: 16,
    variants: [
      {
        id: '3_1',
        name: '8oz',
        price: 16,
        quantity: 20
      }
    ]
  },
  {
    id: '4',
    about: {
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      instructions: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem"
    },
    collection: 'body-care',
    name: 'Rose Parfume',
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem',
    image: {url: Product4, alt: 'Rose Parfume'},
    quantity: 0,
    price: 24,
    variants: [
      {
        id: '4_1',
        name: '16oz',
        price: 24,
        quantity: 20
      }
    ]
  },
  {
    id: '5',
    about: {
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      instructions: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem"
    },
    collection: 'body-care',
    name: 'Oatmeal Lavender Body Soap',
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem',
    image: {url: Product5, alt: 'Oatmeal Lavender Body Soap'},
    quantity: 0,
    price: 0,
    variants: [
      {
        id: '5_1',
        name: '4 bars',
        price: 15.99,
        quantity: 20
      },
      {
        id: '5_2',
        name: '6 bars',
        price: 20.99,
        quantity: 20
      },
    ]
  },
  {
    id: '6',
    about: {
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      instructions: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem"
    },
    collection: 'body-care',
    name: 'Lavender Body Oil',
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem',
    image: {url: Product6, alt: 'Lavender Body Oil'},
    quantity: 0,
    price: 0,
    variants: [
      {
        id: '6_1',
        name: '12oz',
        price: 24,
        quantity: 20
      }
    ]
  },
];

// interface Product {
//     id: number;
//     image: {
//       url: string;
//       alt: string;
//     },
//     price: number;
//     name: string;
//     desc: string;
//     about: {
//         ingredients: string[];
//         instructions: string;
//     },
//     collection: string;
//     // variations: string[];
// }
// export const Products: Product[] = [
    // {
    //     id: 1,
    //     image: {
    //         url: Product1,
    //         alt: 'Product 1'
    //     },
    //     price: 2.99,
    //     name: 'Product 1',
    //     desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem',
    //     about: {
    //         ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
    //         instructions: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem"
    //     },
    //     collection: "body-care"
    // },
//     {
//         id: 2,
//         image: {
//             url: Product2,
//             alt: 'Product 2'
//         },
//         price: 2.99,
//         name: 'Product 2',
//         desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem',
//         about: {
//             ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
//             instructions: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem"
//         },
//         collection: "face-care"
//     },
//     {
//         id: 3,
//         image: {
//             url: Product3,
//             alt: 'Product 3'
//         },
//         price: 2.99,
//         name: 'Product 3',
//         desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem',
//         about: {
//             ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
//             instructions: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem"
//         },
//         collection: "body-care"
//     },
//     {
//         id: 4,
//         image: {
//             url: Product4,
//             alt: 'Product 4'
//         },
//         price: 2.99,
//         name: 'Product 4',
//         desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem',
//         about: {
//             ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
//             instructions: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem"
//         },
//         collection: "face-care"
//     },
//     {
//         id: 5,
//         image: {
//             url: Product5,
//             alt: 'Product 5'
//         },
//         price: 2.99,
//         name: 'Product 5',
//         desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem',
//         about: {
//             ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
//             instructions: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem"
//         },
//         collection: "face-care"
//     },
//     {
//         id: 6,
//         image: {
//             url: Product6,
//             alt: 'Product 6'
//         },
//         price: 2.99,
//         name: 'Product 6',
//         desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem',
//         about: {
//             ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
//             instructions: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, doloremque at eius omnis fuga, mollitia nulla voluptas modi harum asperiores, nostrum ad aliquam exercitationem"
//         },
//         collection: "body-care"
//     },
// ];