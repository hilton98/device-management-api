export interface DeviceFilters {
    page?: number,
    itemsPerPage?: number,
    id?: number;    
    categoryId?: number;
    categoryIds?: number[];
    categoryName?: string;
    color?: string;
    partNumber?: number;
    colors?: string[];
    partNumbers?: number[],
    relations?: string[]
}