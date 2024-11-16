import { useForm } from "react-hook-form";
import { useUser } from "../../context/UserContex"; // Importa useUser desde tu contexto
import "./Login.css";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useUser(); // Usa el hook para obtener login

  async function handleLogin(data) {
    login(data); // Llama a la función login correctamente
  }

  return (
    <div className="form-section">
      <form className="admin-form login-form" onSubmit={handleSubmit(handleLogin)}>
        <h1>Login</h1>
        
        <div className="input-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            placeholder="Correo electrónico"
            {...register("email", { required: "El email es requerido" })}
          />
          {errors.email && <span className="input-error">{errors.email.message}</span>}
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: "La contraseña es requerida" })}
          />
          {errors.password && <span className="input-error">{errors.password.message}</span>}
        </div>

        <button type="submit" className="btn">
          Ingresar
        </button>
      </form>
    </div>
  );
}
