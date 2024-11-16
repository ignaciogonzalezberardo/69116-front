import ProductGallery from "../../components/product-gallery/ProductGallery";
import img1 from './assets/pexels-pixabay-45243.jpg';
import img2 from './assets/pexels-joshsorenson-995301.jpg';
import img3 from './assets/pexels-snapwire-6966.jpg';  

import'./Home.css'
export default function Home() {
  return (
<>
<main className="main-container">
  <section className="contenedor-principal">
    <div className="slider-frame">
      <ul>
       <li>
                <img src={img1} alt="Imagen 1" />
              </li>
              <li>
                <img src={img2} alt="Imagen 2" />
              </li>
              <li>
                <img src={img3} alt="Imagen 3" />
              </li>

      </ul>
    </div>
    <h1 className="producto-titulo"> Productos destacados</h1>
    <span className="producto-sub">Ofertas de la semana</span>
  </section>

  <ProductGallery/>

  <section className="promotions-section">
  <h2>Promociones Destacadas</h2>
  <div className="promotions-container">
    <div className="promotion">
      <h3>¡Oferta Especial!</h3>
      <p>
        Compra cualquier instrumento y obtén un 20% de descuento en accesorios
        adicionales.
      </p>
    </div>
    <div className="promotion">
      <h3>Envío Gratis</h3>
      <p>Disfruta de envío gratuito en todos los pedidos superiores a $800.</p>
    </div>
  </div>
</section>

</main>


</>
  )
}
