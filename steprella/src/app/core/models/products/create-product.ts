export interface CreateProduct {
    price: number;
    description: string;
    categoryId: number;
    brandId: number;
    featuresId: number[];
    materialId: number;
    usageAreaId: number;
    shoeModelId: number;
}
