import React from 'react';
import { Productofinal } from '../interfaces/interfaces';
import { Modal } from 'react-bootstrap';

interface CartProps {
  cart: Productofinal[];
  handleClose: () => void;
  show: boolean;
}

const Cart: React.FC<CartProps> = ({ cart, handleClose, show }) => {
  const totalPrice = cart.reduce((total, product) => total + (product.precioventageneral ?? 0), 0);

  return (
    <Modal show={show} onHide={handleClose}>
      <h2>Carrito</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {cart.map((product, index) => (
            <li key={index}>
              {product.nombre} - ${product.precioventageneral}
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${totalPrice}</h3>
    </Modal>
  );
};

export default Cart;
