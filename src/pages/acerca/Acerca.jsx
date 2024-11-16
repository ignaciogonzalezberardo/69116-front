import './Acerca.css'
import img1 from './assets/Imagen de WhatsApp 2024-05-27 a las 22.29.09_942e562a.jpg'
export default function Acerca(){
    return( 

<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="/style/acerca.css" />
  <link
    rel="icon"
    type="image/png"
    sizes="192x192"
    href="/assets/android-icon-72x72.png"
  />
  <title>Amigos de la musica</title>

  <main>
    <section className="section-info">
      <div className="info">
        <h1>Mi proyecto</h1>
        <p>
          Este es mi primer proyecto integrador del bootcamp, el cual el
          objetivo era diseñar un e-comrce
        </p>
      </div>
    </section>
    <section className="myInfo">
      <div className="details">
        <h1>Sobre mi</h1>
        <h2>Ignacio Gonzalez</h2>
        <span>
          <i>Estudiante y programador</i>
        </span>
        <p>
          Hola soy Nacho, actualmente tengo 17 años y me encuentro formando
          parte del Bootcamp de it, estudio cosas relacionadas a la programacion
          desde el 2021 y me gustaria poder ser profesional en este rubro
        </p>
      </div>
      <div className="foto">
        <img
          src={img1}
          alt=""
        />
      </div>
    </section>
  </main>

</>




)}