export interface CreateProduct {
    price: number;
    description: string;
    categoryId: number;
    brandId: number;
    featureId: number[];
    materialId: number;
    usageAreaId: number;
    shoeModelId: number;
}
