import { NavLink } from 'react-router-dom'
import './ProductCard.css'
import { useOrder } from '../../context/OrderContex'

const URL = "http://localhost:3000";

export default function ProductCard({prod}){
  const{addProduct}=useOrder()
return(

    <article className="card">
       
      <div className="card-header">
        <div className="img-card">
          <img src={`${URL}/image/products/${prod.image} `}alt="" />
        </div>
        
        <div className="title-card">
          <h2>{prod.name}
            
          </h2>
        </div>
      </div>
      <div className="card-body">
        <div className="description-card">
          <div className="info">
            <ul>
              
              <li>{prod.description}</li>
            </ul>
          </div>
          <div className="precio">
            <p>Precio:${prod.price}</p>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="button-card">
          <button onClick={()=> addProduct(prod)}>Comprar</button>
          <button>  

          <NavLink className="nav-link" to={`/product-detail/${prod._id}`}>Ver más</NavLink>

              </button>
        </div>
        <div className="ingreso-card">
          <p>Ingreso:      <td className="date">
        {new Date(prod.createdAt).toLocaleDateString()}
      </td></p>
        </div>
      </div>
    </article>


)
}