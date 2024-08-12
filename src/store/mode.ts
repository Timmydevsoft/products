export interface image {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  }
  
 
export interface Part{
    image: image;
    name: string;
    category: string;
    price: number;
    totalPrice: number,
    status: boolean,
    id: string,
    quantity: number
}

export interface Model{
   orderList: Part[]
}

export interface Prop {
    image: image;
    name: string;
    category: string;
    price: number;
    status: boolean;
  }
 
