export interface Product {
  id: number,
        active: boolean,
        category: string,
        collection: string,
        description: string,
        images: any[],
        details: {
          color: string,
          discount: number,
          id: number,
          image_id: null | number,
          price_gbp: number,
          price_ngn: number,
          price_usd: number,
          quantity: number,
          size: string,
        }[],
        likes: number,
        name: string,
        orders_count: number,
        slug: string,
        views: number,
}


export interface BrandProductsType {
    data: Product[],
      meta: {
        current_page: number,
        last_page: number,
      }
};

interface ProductImage {
  id: number;
  url?: string;
}

export interface ProductDetail {
  id: number;
  size: string;
  color: string;
  quantity: number;
  price_ngn: number;
  price_usd: number;
  price_gbp: number;
  discount: number;
  image_id: number;
  delivery_usd?: number;
  delivery_ngn?: number;
  delivery_gbp?: number;
}

interface Prod {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  orders_count: number;
  collection: string | null;
  views: number;
  likes: number;
  active: boolean;
  images: ProductImage[];
  details: ProductDetail[];
}

export interface SingleProduct {
  data: Prod[];
}
