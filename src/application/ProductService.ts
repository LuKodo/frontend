import {Product} from '../domain/models/Product';
import {ProductRepository} from '../domain/ports/ProductRepository';

export class ProductService {
    constructor(private productRepository: ProductRepository) {
    }

    async getAllProducts(): Promise<{ result: Product[], count: number }> {
        return this.productRepository.getAll();
    }

    async getProductById(id: string): Promise<Product> {
        return this.productRepository.getById(id);
    }

    async searchProducts(query: string): Promise<Product[]> {
        return this.productRepository.search(query);
    }

    async getProductsByCategory(category: string): Promise<Product[]> {
        return this.productRepository.getByCategory(category);
    }
}