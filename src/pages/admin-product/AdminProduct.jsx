import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import AdminTable from "../../components/admin-table/AdminTable";
import useApi from "../admin-user/interceptor"
import './AdminProduct.css';
import Swal from "sweetalert2";

const URL = "http://localhost:3000";


export default function AdminProduct() {
  const api = useApi();
  const [ products, setProducts ] = useState([]);
  // Estado para manejar la edición de productos
  const [ selectedProduct, setSelectedProduct ] = useState(null)
const [categories, setCategories] = useState([]);
  const { register, setValue, reset, handleSubmit, formState: { errors, isValid } } = useForm();

  useEffect(() => {
    getProducts();

  }, [])

  useEffect(() => {
    getCategories();
  }, []);
  
  useEffect(() => {

    if(selectedProduct) {

        setValue("name", selectedProduct.name),
        setValue("price", selectedProduct.price),
        setValue("description",  selectedProduct.description),
        setValue("descriptionp",  selectedProduct.descriptionp),
        setValue("image", selectedProduct.image),
        setValue("category", selectedProduct.category),
        setValue("createdAt", selectedProduct.createdAt)

    }  else {
      reset()
    }

  }, [ selectedProduct, setValue, reset ])


  async function getCategories() {
    try {
        const response = await axios.get(`${URL}/categories`);
        console.log("Categorías recibidas:", response.data.categories); // Para verificar los datos
        setCategories(response.data.categories);
    } catch (error) {
        console.log("Error obteniendo categorías:", error);
    }
}

  async function getProducts() {

    try {
      // Carga de productos
      const response = await axios.get(`${URL}/products`);

      console.log(response.data);

      setProducts(response.data.products)

    } catch (error) {
      console.log(error);

    } // end catch block

  } //end getProducts function
  // !getProducts();

  function deleteProduct(identificador) {

      Swal.fire({
        title: "Borrar producto",
        text: "Realmente desea borrar este producto",
        icon: "warning",
        reverseButtons: true,
        showCancelButton: true,
      }).then(async(result) => {
        try {
          if(result.isConfirmed) {
            const response = await api.delete(`${URL}/products/${identificador}`);

            console.log(response.data);
      
            getProducts();
          }
        } catch (error) {
          console.log(error)
          // Mensaje para el usuario de que algo falló
          Swal.fire({
            title: "Error al borrar",
            text: "El producto no fue borrado",
            icon: "error"
          })
        }
      })

  }

  async function onProductSubmit(producto) {
    console.log(producto)
    try {
      const formData = new FormData();
      formData.append("name", producto.name);
      formData.append("price", producto.price);
      formData.append("description", producto.description);
      formData.append("category", producto.category);
      if (producto.image[0]) {
          formData.append("image", producto.image[0]);
      }
      if(selectedProduct) {
        // HAcer un put
        const { _id:id } = selectedProduct;
        const response = await api.put(`${URL}/products/${id}`, formData);
        console.log(response.data)
        Swal.fire({
          title:"Actualización correcta",
          text: "El producto fue actualizado correctamente",
          icon: "success",
          timer: 1500
        })

        setSelectedProduct(null)
        

      } else {
        // si no tengo estado selectedProduct (null) significa que estoy creando un producto
        const response = await api.post(`${URL}/products`, formData)
        console.log(response.data);
        

      }

      
      getProducts();
      // setSelectedProduct(null)

    } catch (error) {
      console.log(error)
      // Swal y mostrar error al user
    }
    
  }

  // # Editar productos
  // crear un función para obtener los datos del producto a editar
  function handleEditProduct(producto) {

    console.log("Producto a editar", producto);
    setSelectedProduct(producto);
    // setValue("name", producto.name);
    // setValue("price", producto.price)

  }


  // rellenar el formulario con la data del producto seleccionado
  // definir alguna forma de determinar si estamos editando o si agregando producto
  // enviar la nueva data a nuestro backend (mockapi) con un petición a través del método PUT
  // solicitar los productos nuevamente para poder ver las modificaciones en el prod editado


  return (
    <>
      <div className="admin-container">
          {/* Contenedor del formulario */}
          <div className="form-container">  
            <form className="admin-form" onSubmit={handleSubmit(onProductSubmit)}>

              <div className="input-group">
                <label htmlFor="name">Nombre producto</label>

                <input type="text" id="name" 
                        {...register("name", { required: true, minLength: 3 }) 
                } />

                { errors.name?.type === "required" && <div className="input-error">El campo es requerido</div> }

                { errors.name?.type === "minLength" && <div className="input-error">Mínimo de carácteres es 3</div> }

              </div>

              <div className="input-group">
                <input type="number" {...register("price", { required: true }) } />

                { errors.price && <div className="input-error">El campo price es requerido</div> }
              </div>

              <div className="input-group">
                <label htmlFor="description">Descripción </label>
                <textarea {...register("description")} rows={5}></textarea>
              </div>


              <div className="input-group">
    <label htmlFor="">Categoría</label>
    <select {...register("category")}>
        {
            categories.map((cat) => {
                console.log("Categoría en el selector:", cat);
                return (
                    <option key={cat._id} value={cat.name}>
                        {cat.name}
                    </option>
                );
            })
        }
    </select>
</div>



<div className="input-group">
  <label htmlFor="createdAt">Fecha de ingreso</label>
  <input
    type="date"
    {...register("createdAt")}
    defaultValue={selectedProduct ? selectedProduct.createdAt.split('T')[0] : ''}  // Formatear la fecha
  />
</div>
                <div className="input-group">
                  <label htmlFor="">Imagen</label>
                  <input accept="image/*" type="file" {...register("image") } />
                </div>

              <button className={`btn ${selectedProduct && 'btn-success'}`}       
                      type="submit" 
                      disabled={ !isValid }  >

                {
                  selectedProduct ? "Editar" : "Crear"
                }

              </button>

            </form>
          </div>
          {/* Contenedor de la tabla de productos */}
          <div className="table-container">

            <AdminTable products={products} 
                        deleteProduct={deleteProduct}
                        handleEditProduct={handleEditProduct}
                        />
            
          </div>
      </div>

    </>
  )
}
