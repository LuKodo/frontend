import {useEffect, useState} from 'react';
import {ProductService} from '../../application/ProductService.ts';
import {ProductApi} from '../../infrastructure/api/ProductApi.ts';
import {Product as ProductModel} from '../../domain/models/Product.ts';
import {Product} from "./Product.tsx";

const productService = new ProductService(new ProductApi());

export const ProductList = () => {
    const [products, setProducts] = useState<{ result: ProductModel[], count: number }>({
        result: [],
        count: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getAllProducts();
                setProducts(data);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError('Error al cargar los productos');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-64">Cargando...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <section className={"mt-8"}>
            <div className="row">
                <div className="gi-shop-rightside col-lg-12 col-md-12 margin-b-30">
                    <div className="shop-pro-content">
                        <div className="shop-pro-inner">
                            <div className="row">
                                {products.result.map((item: ProductModel, index: number) => (
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-6 mb-6 gi-product-box pro-gl-content"
                                         key={index}>
                                        <Product product={item}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )};