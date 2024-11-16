import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './OrderItem.css'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useOrder } from '../../context/OrderContex'
const URL = "http://localhost:3000";

export default function OrderItem({item}){
    const{removeProduct, chanceItemQuantity}=useOrder()
    return(
        <li className="oreder-item">
            <div className="item-image">
                <img src={`${URL}/image/products/${item.image}`} alt="" />
            </div>
            <div className="item-info">
                {item.name}
            </div>
            <div className="item-price">
                $ {item.price}
            </div>
            <div className="item-subtotal">
                $ {item.price* item.quantity}
            </div>
            <div className="item-count">
                <input
                className='item-input' 
                type='number' 
                defaultValue={item.quantity} 
                min="1"
                onChange={(evt)=>chanceItemQuantity(item._id, +evt.target.value)}/>
                
            </div>
            <div className="item-actions">
                <button className='btn-icon btn-danger' onClick={()=> removeProduct(item._id)}><FontAwesomeIcon icon={faTrash} /> </button>
                
                    
            </div>
        </li>
    )
}
 
