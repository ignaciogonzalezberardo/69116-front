import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGuitar } from '@fortawesome/free-solid-svg-icons';
import './Footer.css'
export default function Footer() {
  return (
    <footer>
      <section className="section-footer">
        <div className="container-footer">
          <div className="logo">
            <p>
              <FontAwesomeIcon icon={faGuitar} /> Amigos de la música
            </p>
          </div>
          <div className="redes">
            <ul>
              <li>
                <a href="https://www.instagram.com/nacho.__.gonzalez">
                  <FontAwesomeIcon icon={faInstagram} /> Instagram
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/Papu_sonidos">
                  <FontAwesomeIcon icon={faFacebook} /> Facebook
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/ignacio-andres-gonzalez-berardo-432130279/">
                  <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
                </a>
              </li>
              {/* Agregar más iconos de redes sociales aquí, si es necesario */}
            </ul>
          </div>
          <div className="info">
            <p>Contáctanos: info@amigosdelamusica.com</p>
            <p>Dirección: Calle de la Música 123, Ciudad de la paz</p>
            <p>Horario: Lunes a Viernes de 9:00 a 18:00</p>
          </div>

          <div className="suscripcion">
            <p>Suscríbete a nuestro boletín:</p>
            <input type="email" placeholder="Tu correo electrónico" />
            <button>Suscribirse</button>
          </div>

        </div>
      </section>
    </footer>
  );
}
