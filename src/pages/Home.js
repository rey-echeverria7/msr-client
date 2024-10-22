import React from "react";

export default function Home() {
  return (
    <section className="section-hero">
      <div className="hero">
        <div className="hero-text-box">
          <h1 className="heading-primary">
            Mecanicos hay muchos. <br></br>Con experiencia pocos. <br></br>Como
            nosotros ninguno.
          </h1>

          <p className="hero-description">
            Taller mecánico y venta de refacciones dedicado al mantenimiento y
            reparación de motocicletas de trabajo. <br></br>
            <br></br> Tabasco 1246 entre Aureliano Anaya y Flavio Borquez,
            Colonia Campestre, Ciudad Obregón, Mexico
          </p>
          <a href="#" className="btn btn--full margin-right-sm">
            Contacto
          </a>
          <a href="#" className="btn btn--outline">
            motoservicioruelas@gmail.com &darr;
          </a>
        </div>
        <div className="hero-img-box">
          <img src="static/hero2.jpg" className="hero-img" alt="Taller" />
        </div>
      </div>
    </section>
  );
}
