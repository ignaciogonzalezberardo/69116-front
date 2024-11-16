import './Contact.css'
export default function Contact(){
return(
    <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=, initial-scale=1.0" />
  <link rel="stylesheet" href="/style/contacto.css" />
  <link rel="stylesheet" href="/style/forms.css" />
  <link
    rel="icon"
    type="image/png"
    sizes="192x192"
    href="/assets/android-icon-72x72.png"
  />
  <title>Amigos de la musica</title>

  <main className="main-container">
    <section className="contact-section">
      <h1 className="section-title">Contacto</h1>
      <div className="section-subtitle">
        <h3>Completa el formulario para contactarte con nosotros</h3>
      </div>
      <div className="contact-container">
        <div className="contact-form">
          <form>
            <h2>Formulario contacto</h2>
            <div className="input-container">
              <label htmlFor="fullname" className="input-label">
                Nombre completo
              </label>
              <input
    type="text"
    name="fullname"
    id="fullname"
    required
    minLength={5}
    maxLength={15}
    placeholder="Ingresa tu nombre completo"
              />
            </div>
            <div className="input-container">
              <label htmlFor="correo">Correo electronico</label>
              <input
    type="email"
    name="mail"
    id="correo"
    required
    minLength={10}
    maxLength={40}
    pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
    placeholder="ejemplo@correo.com"
              />
            </div>
            <div className="input-container">
              <label htmlFor="observaciones">Observaciones</label>
              <textarea
                name="observaciones"
                id="observaciones"
                maxLength={50}
                defaultValue={""}
                required
              />
            </div>
            <div className="input-container">
              <button type="submit">Enviar</button>
            </div>
          </form>
        </div>
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d26280.325446638417!2d-58.44034758273315!3d-34.57783719053795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1715300524486!5m2!1ses!2sar"
            width="90%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  </main>

</>

)
}
