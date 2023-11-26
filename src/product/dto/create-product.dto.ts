export class CreateProdDTO {
    id: string;
    idShop: string;
    title: string;
    size: string;
    oldPrice: number;
    price: number;
    color: string;
    type: string;
    describe: string
    newProduct: boolean
    hitProduct: boolean
    sale: boolean
    videoUrl: string
    imageSrc: []
}