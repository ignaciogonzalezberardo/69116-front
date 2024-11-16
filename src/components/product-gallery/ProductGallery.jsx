import { useState, useEffect } from 'react';
import ProductCard from '../product-card/ProductCard';
import './ProductGallery.css';
import axios from 'axios';
import { useUser } from '../../context/UserContex';

const URL2 = import.meta.env.VITE_LOCAL_SERVER_;

export default function ProductGallery() {
  const [products, setProducts] = useState([]);
  const {  logout } = useUser(); // Aquí llamas a useUser correctamente

  useEffect(() => {
    getProducts();
  }, []); // El efecto debe estar correctamente configurado para ejecutarse una sola vez

  async function getProducts() {
    try {
      const response = await axios.get(`${URL2}/products`);
      console.log(response);
      setProducts(response.data.products);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Usuario no autorizado');
        logout();
        return;
      }
      console.log(error);
    }
  }

  return (
    <section className="product-section">
      <div className="container-card">
        {products.map((producto) => (
          <ProductCard key={producto._id} prod={producto} /> // Usar _id como key
        ))}
      </div>
    </section>
  );
}
