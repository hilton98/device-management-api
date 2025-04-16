export interface CategoryFilters {
    page?: number,
    itemsPerPage?: number,
    id?: number,
    name?: string,
    lessThanCreatedAt?: string,
    moreThanCreatedAt?: string,
    lessThanUpdatedAt?: string,
    moreThanUpdatedAt?: string,
    createdAt?: string,
    updatedAt?: string,                        
    relations?: string[]
}