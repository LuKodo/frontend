import axios from 'axios';
import {Product} from '../../domain/models/Product';
import {ProductRepository} from '../../domain/ports/ProductRepository';

export class ProductApi implements ProductRepository {
    private baseUrl: string;

    constructor() {
        this.baseUrl = import.meta.env.VITE_API_URL;
    }

    async getAll(): Promise<{ result: Product[], count: number }> {
        const response = await axios.post(`${this.baseUrl}/products_admin`, {
            "limit": 20,
            "offset": 1,
            "sede": 'SURT',
            "categoria": 'FRUTAS Y VERDURAS',
            "paginapromo": "SI",
        });
        return response.data;
    }

    async getById(id: string): Promise<Product> {
        const response = await axios.get(`${this.baseUrl}/products/${id}`);
        return response.data;
    }

    async search(query: string): Promise<Product[]> {
        const response = await axios.get(`${this.baseUrl}/products/search`, {
            params: {q: query}
        });
        return response.data;
    }

    async getByCategory(category: string): Promise<Product[]> {
        const response = await axios.get(`${this.baseUrl}/products/category/${category}`);
        return response.data;
    }
}