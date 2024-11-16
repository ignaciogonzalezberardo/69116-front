import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useOrder } from '../../context/OrderContex';

const URL = "http://localhost:3000";

export default function ProductDetail() {
  const { addProduct } = useOrder();
  const [product, setProduct] = useState(null); // Cambié el estado inicial a null para controlar la carga
  const { id } = useParams(); // Capturamos el id de la URL
  console.log('Product ID:', id);  // Verifica si el id es correcto

  // Efecto que se ejecuta cuando el id cambia
  useEffect(() => {
    if (id) {
      getProductById(id); // Llamamos la función para obtener el producto por ID
    }
  }, [id]);

  // Función para obtener el producto por su ID
  async function getProductById(id) {
    try {
      const response = await axios.get(`${URL}/products/${id}`);
      setProduct(response.data); // Asignamos el producto directamente desde la respuesta
    } catch (error) {
      alert('Error al obtener el producto');
      console.log(error);
    }
  }

  if (!product) {
    return <h5>Cargando...</h5>; // Muestra un mensaje de carga mientras el producto no esté disponible
  }

  return (
    <>
      <title>Amigos de la musica</title>

      <main>
        <section className="section-principal">
          <div className="div-container">
            <div className="producto">
              <div className="imagen">
              <img src={`${URL}/image/products/${product.image} `}alt="" />
              </div>
              <div className="info-producto">
                <h1>{product?.name}</h1>
                <h2>${product?.price}</h2>
                <ul>
                  <li>Este instrumento es de {product?.category}</li>
                  <br />
                  <li>{product?.description}</li>
                </ul>
                <div className="acciones">
                  <button className="carro" onClick={() => addProduct(product)}>
                    Añadir al carro
                  </button>
                  <button className="ahora">Comprar ahora</button>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
