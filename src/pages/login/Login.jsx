import { useForm } from 'react-hook-form';
import './Login.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContex';

const URL = import.meta.env.VITE_LOCAL_SERVER;

export default function Login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const {login}=useUser
  const navigate= useNavigate()
  async function handleLogin(data) {
    login(data)
    console.log(data);
    try {
      const response = await axios.post(`${URL}/login`, data);
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "SE PUDO",
        timer:2000
      }).then(()=>{
        navigate("/")
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        text: error.response.data.message
      });
    }
  }

  const password = watch('password');

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="/style/register.css" />
      <link rel="stylesheet" href="/style/forms.css" />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/assets/android-icon-72x72.png"
      />
      <title>Amigos de la música</title>

      <main>
        <section className="form-section">
          <div className="general">
            <div>
              <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
                <h2>Registro</h2>
                <div className="input-container">
                  <label htmlFor="nombreCompleto">Nombre completo </label>
                  <input
                    type="text"
                    name="Fullname"
                    id="nombreCompleto"
                    required
                    minLength={5}
                    maxLength={12}
                    {...register('Fullname', { required: 'El nombre completo es requerido' })}
                  />
                  {errors.Fullname && <p>{errors.Fullname.message}</p>}
                </div>
                <div className="input-container">
                  <label htmlFor="correo">Correo electrónico</label>
                  <input
                    type="email"
                    name="Mail"
                    id="correo"
                    required
                    minLength={10}
                    maxLength={40}
                    pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
                    {...register('email', { required: 'El email es requerido' })}
                  />
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div className="input-container">
                  <label htmlFor="contraseña">Contraseña</label>
                  <input
                    type="password"
                    name="Password"
                    id="contraseña"
                    required
                    minLength={5}
                    maxLength={20}
                    {...register('password', { required: 'La contraseña es requerida' })}
                  />
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div className="input-container">
                  <label htmlFor="contraseña2">Repite tu contraseña</label>
                  <input
                    type="password"
                    name="Repeatpassword"
                    id="contraseña2"
                    required
                    minLength={5}
                    maxLength={20}
                    {...register('Repeatpassword', {
                      required: 'Repetir la contraseña es requerido',
                      validate: (value) => value === password || 'Las contraseñas no coinciden'
                    })}
                  />
                  {errors.Repeatpassword && <p>{errors.Repeatpassword.message}</p>}
                </div>
                <div className="input-container">
                  <label htmlFor="nacimiento">Fecha de nacimiento</label>
                  <input
                    type="date"
                    name="Nacimiento"
                    id="nacimiento"
                    required
                    max="2010-01-01"
                    {...register('nacimiento', { required: 'La fecha de nacimiento es requerida' })}
                  />
                </div>
                <div className="input-container">
                  <select name="provincia" id="provincia" required {...register('provincia')}>
                    <option value="">Selecciona tu provincia</option>
                    <option value="Caba">Caba</option>
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="Santa Fe">Santa Fe</option>
                    <option value="Cordoba">Córdoba</option>
                  </select>
                </div>
                <div className="input-container">
                  <label htmlFor="observaciones">Observaciones</label>
                  <textarea
                    name="observaciones"
                    id="observaciones"
                    maxLength={50}
                    {...register('observaciones')}
                  />
                </div>
                <div className="input-container">
                  <button type="submit">Registrarse</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
