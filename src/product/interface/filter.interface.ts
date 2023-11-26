export interface ProductFilters {
    type?: string;
    idShop?: string;
    hitProduct?: boolean;
    sale?: boolean;
    newProduct?: boolean;
    _id?: { $lt: string };
}
