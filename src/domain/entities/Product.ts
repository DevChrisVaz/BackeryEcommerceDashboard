import Timestamps from "./Timestamps";

interface Product extends Timestamps {
    uuid?: string;
    name?: string;
    recipe?: string;
    description?: string;
    size?: string;
    category?: string;
    tags?: string[];
    price?: number;
    images?: any;
    inStock?: number;
    status?: string;
}

export default Product;