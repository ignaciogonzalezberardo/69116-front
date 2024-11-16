import { useOrder } from '../../context/OrderContex';
import OrderItem from '../order.item/OrderItem';
import'./OrderDialog.css'
export default function OrderDialog(){
   
    const {order, toggleModal, setToggleModal, total, createOrder}= useOrder()
    if(!toggleModal)return;

    return(
        <div className="modal-overlay" onClick={()=>setToggleModal(!toggleModal)}>
            <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
                <div className="modal-header">
                    Carrito
                </div>
                <div className="modal-body">
                    <ul className="order-list">
                        {
                            order.map((item)=>( 
                            <OrderItem key={item._id}item={item}/>


                            ) )
                        }
                        <li className='list-total'>
                             <strong>Total:${total}</strong>
                        </li>
                    </ul>
                </div>
                <div className="modal-footer">
                    <button onClick={()=> setToggleModal(!toggleModal)}>Cerrar</button>
                    <button className='btn' onClick={()=>createOrder()}>
                        Terminar de comprar
                    </button>
                </div>
            </div>
        </div>
    )
}