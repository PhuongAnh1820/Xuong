export interface IProduct {
    id?: number 
    name: string
    categoryId: string
    price: number
    quantity: number,

    description: string
    discount: number
    featured: boolean
    countInStock: number
}
