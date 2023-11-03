export class CreateProdDTO {
    id: string;
    idShop: string;
    title: string;
    size: string;
    oldPrice: number;
    price: number;
    color: string;
    type: string;
    specification: []
    describe: string
    newProduct: boolean
    hitProduct: boolean
    structure: []
    imageSrc: []
}