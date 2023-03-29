import Product from "./Product";
import Timestamps from "./Timestamps";

interface ProductQty {
    product?: string;
    qty?: number;
}

interface Quote extends Timestamps {
    uuid?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    addressDetails?: string;
    city?: string;
    zip?: string;
    phone?: string;
    email?: string;
    details?: string;
    products?: ProductQty[];
    productsRef?: Product[];
    status?: string;
}

export default Quote;