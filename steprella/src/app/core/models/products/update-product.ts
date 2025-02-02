export interface UpdateProduct {
    id: number;
    price: number;
    description: string;
    categoryId: number;
    brandId: number;
    shoeModelId: number;
    featureId: number[];
    materialId: number;
    usageAreaId: number;
}
