import { createEffect, createSignal } from "solid-js";
import Swal from "sweetalert2";
import { getImage } from "../../shared/utils/checkImage";
import { TipoImagen } from "../../admin/domain/entities/TipoImagenEnum";
import { Productofinal } from "../../admin/domain/entities/ProductoFinal";
import { getDefaultImage } from "../../admin/presentation/components/PromoImage";
import { formatPrice } from "../../shared/utils/formatPrice";
import { Badge, Button, Card } from "solid-bootstrap";
import { IconShoppingCart } from "@tabler/icons-solidjs";
import { useCart } from "../../modules/store/presentation/hooks/useCart";

export const ProductCard = ({ product }: { product: Productofinal }) => {
    const [imagePath, setImagePath] = createSignal('');
    const { addToCart } = useCart()

    const getImagePath = async () => {
        return await getImage(product.codigo, TipoImagen.PRODUCT);
    }

    createEffect(() => {
        getImagePath()
            .then(response => {
                setImagePath(response)
            })
    }, [product]);

    const addProduct = () => {
        addToCart({ product, quantity: 1 }, 'add');
        Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        }).fire({
            icon: 'success',
            title: 'Agregado al carrito'
        })
    }

    return (
        <Card class="mb-4 border-0 rounded-6">
            <Card.Header class={'bg-white border-0'}>
                <Badge bg="warning" class="small fw-bold mb-1">{product.categoria}</Badge>
            </Card.Header>
            <img
                loading="lazy"
                alt={product.codigo || 'Product Image'}
                class='main-image p-4'
                src={imagePath() ? imagePath() : getDefaultImage(281)}
            />

            <Card.Body>
                <span class="text-warning fw-bold fs-5">{formatPrice(product.precioventageneral ?? 0)}</span>
                <p class="small fw-bold w-100" style={{
                    height: '40px',
                    overflow: 'hidden',
                    "text-overflow": 'ellipsis',
                    "white-space": 'normal',
                    '-webkit-line-clamp': 2,
                    '-webkit-box-orient': 'vertical',
                    display: '-webkit-box',
                }}>{product.nombre}</p>
                <Button onClick={() => addProduct()} class="w-100 fw-bold mt-2 rounded-pill" variant={'warning'} size={'sm'}>Agregar <IconShoppingCart size={15} /></Button>
            </Card.Body>
        </Card>
    )
}