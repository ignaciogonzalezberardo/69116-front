import axios from 'axios';

import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useUser } from "./UserContex";

const OrderContext= createContext()

export const useOrder=()=> useContext(OrderContext)

export default function OrderProvider({children}){
    const { user } = useUser()
    const {_id}= useUser()
    const [count, setCount] = useState(0); 
    const[order, setOrder]= useState([])
    const [toggleModal, setToggleModal]=useState(false)
    const[total, setTotal]=useState(0)


useEffect(()=>{
calculateCount()
calculateTotal()
    },[order])



    function addProduct(product){
        console.log("addProduct" , product.name)
        const productExist=order.find(prod=>prod._id===product._id)
        if(productExist){
    productExist.quantity++
    setOrder([...order])
        }

    
        else{
            product.quantity=1
            setOrder([...order,product])
        }
        
        Swal.fire({
            icon: "succes",
            position:'bottom-end',
            title: "Producto Agregado",
            padding:'.5rem',
            width:'300px'
        })

    }



    function calculateCount(){
        let cantidadItems=0
        for(let item of order){
            cantidadItems+=item.quantity
        }
        setCount(cantidadItems)
    }
    function calculateTotal(){
        let total=0
        order.forEach(item=>{
            total+= (item.price* item.quantity)
        })
        setTotal(total)
    }
    function removeProduct(_id){
        const indice= order.findIndex(prod=>prod._id===_id)
        const ordercopy=[...order]
        ordercopy.splice(indice, 1)
        setOrder(ordercopy)
    }

    function chanceItemQuantity(_id, value){
        const newOrder=order.map(prod=>{
            if(prod._id===_id){
                prod.quantity=value
            }
            return prod
        })
        setOrder(newOrder)
    }
    async function createOrder() {
        try {
            // Verifica si el usuario está autenticado
            if (!user?._id) {
                alert("Necesitas un usuario para crear una orden");
                return;
            }
    
            // Mapear productos a la estructura esperada para la creación de la orden
            const products = order.map(prod => ({
                product: prod._id,
                quantity: prod.quantity,
                price: prod.price,
            }));
    
            // Crear la orden con los datos correspondientes
            await axios.post("http://localhost:3000/orders", {
                products,
                user: user._id,  // Usamos el _id del usuario obtenido del contexto
                total,
            });
    
            alert("Orden creada");
            console.log(products);
        } catch (error) {
            console.log(error);
            alert("No se pudo crear la orden");
        }
    }
    

    

    return( 
        <OrderContext.Provider
        value={{
            order,
            addProduct,
            toggleModal,
            setToggleModal,
            count,
            total,
            removeProduct,
            chanceItemQuantity,
            createOrder
        }}> 
            {children}
        </OrderContext.Provider>
    )

}