import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserTable from "../../components/user-table/UserTable"
import Swal from "sweetalert2";
import useApi from "./interceptor"
const URL = "http://localhost:3000";

export default function AdminUser(){
  const api = useApi();
  const[users, setUsers]=useState([]); // Estado para usuarios
  const[selectedUser, setSelectedUser]=useState(null); // Estado para usuario seleccionado
  const { reset, setValue, register, formState: { errors, isValid }, handleSubmit } = useForm();

  useEffect(() => {
    getUsers();
  }, []); // Cargar usuarios al inicio

  useEffect(() => {
    if (selectedUser) {
      // Si hay un usuario seleccionado, rellenamos el formulario con los datos del usuario
      setValue("name", selectedUser.name);
      setValue("email", selectedUser.email);
      setValue("password", selectedUser.password);
      setValue("createdAt", selectedUser.createdAt);
      setValue("image", selectedUser.image);
    } else {
      reset(); // Si no hay usuario seleccionado, limpiamos el formulario
    }
  }, [selectedUser, setValue, reset]);

  async function deleteUser(identificador) {
    Swal.fire({
      title: "Borrar usuario",
      text: "Realmente desea borrar este usuario",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          const response = await api.delete(`${URL}/users/${identificador}`);
          console.log(response.data);
          getUsers(); // Actualizar lista de usuarios
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error al borrar",
          text: "El usuario no fue borrado",
          icon: "error",
        });
      }
    });
  }

  async function onUsersSubmit(usuarios) {
    console.log(usuarios);
  
    try {  const formData = new FormData();
      formData.append("name", usuarios.name);
      formData.append("email", usuarios.email);
      formData.append("password", usuarios.password);
      formData.append("createdAt", usuarios.createdAt);
      
      if (selectedUser) {
        // Actualizar usuario existente
        const { _id:id } = selectedUser;
        const response = await api.put(`${URL}/users/${id}`, usuarios);
        console.log(response.data);
        
        Swal.fire({
          title: "Actualización correcta",
          text: "El usuario fue actualizado correctamente",
          icon: "success",
          timer: 1500
        });
  
        // Limpiar usuario seleccionado
        setSelectedUser(null);
      } else {
        // Crear un nuevo usuario
        const response = await api.post(`${URL}/users`, formData)
        console.log('ID del nuevo usuario:', response.data.id);
        reset();  // Limpiar el formulario después de crear
      }
  
      // Obtener lista actualizada de usuarios
      getUsers();
  
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al procesar la solicitud",
        icon: "error"
      });
    }
  }
  
  
  async function getUsers() {
    try {
  
      const response= await api.get(`${URL}/users`)
      console.log(response.data)
  
      setUsers(response.data)
    } catch (error) {
      console.log(error)
    }
      }
  
      function handleEditUser(usuario){
        console.log(usuario)
        setSelectedUser(usuario)
   
  
      }
  

  return (
    <>
      <div className="admin-container">
        <div className="form-container">  
          <form onSubmit={handleSubmit(onUsersSubmit)} className="admin-form">
            <div className="input-group">
              <label htmlFor="name">Nombre de usuario</label>
              <input type="text" id="name" {...register("name", { required: true, minLength: 3 })} />
              {errors.name?.type === "required" && <div className="input-error">El campo es requerido</div>}
              {errors.name?.type === "minLength" && <div className="input-error">Mínimo de caracteres es 3</div>}
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="text" {...register("email", { required: true })} />
              {errors.email && <div className="input-error">El campo email es requerido</div>}
            </div>

            <div className="input-group">
              <label htmlFor="password">Contraseña de usuario</label>
              <input type="text" id="password" {...register("password", { required: true, minLength: 3 })} />
              {errors.password?.type === "required" && <div className="input-error">El campo es requerido</div>}
              {errors.password?.type === "minLength" && <div className="input-error">Mínimo de caracteres es 3</div>}
            </div>

            <div className="input-group">
              <label htmlFor="createdAt">Fecha de ingreso</label>
              <input type="date" {...register("createdAt")} />
            </div>


            <button type="submit" disabled={!isValid}>
              {selectedUser ? "Editar" : "Crear"}
            </button>
          </form>
        </div>

        <div className="table-container">
          <UserTable users={users} deleteUser={deleteUser} handleEditUser={handleEditUser} />
        </div>
      </div>
    </>
  );
}
