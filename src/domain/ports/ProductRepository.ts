import {Product} from "../models/Product.ts";

export interface ProductRepository {
    getAll(): Promise<{ result: Product[], count: number }>;

    getById(id: string): Promise<Product>;

    search(query: string): Promise<Product[]>;

    getByCategory(category: string): Promise<Product[]>;
}