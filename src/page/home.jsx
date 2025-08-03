
import "../style/style.css";
import React from "react";
import { FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";


// Swiper styles (tu dois avoir installé Swiper : `npm install swiper`)
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import transportImg from "../assets/bus2sencar.jpg";
import transportImg2 from "../assets/bus25.jpg";
import transportImg3 from "../assets/VAN15PLACES.jpeg";
import transportImg4 from "../assets/voiture5place.jpg";
import transportImg5 from "../assets/voiture7place.jpg";
import transportImg6 from "../assets/BUSDE35PLACES.jpeg";
import transportImg7 from "../assets/bussencar.jpg";
import entreprise1 from "../assets/entreprise1.jpg";
import entreprise2 from "../assets/R.jpeg";
import entreprise3 from "../assets/orange-telecom7845.jpg";
import entreprise4 from "../assets/Logo-Pastef-01.png";
import entreprise5 from "../assets/368169.webp";
import entreprise6 from "../assets/OIP (1).webp";
import entreprise7 from "../assets/OIP.webp";
import entreprise8 from "../assets/senegal-teungueth-fc.webp";
import entreprise9 from "../assets/Mairie_des_Parcelles_Assainies.webp";
import service1 from "../assets/WhatsApp Image 2025-06-27 à 14.42.43_0d81d2b3.jpg";
import service2 from "../assets/Mairie_des_Parcelles_Assainies.webp";
import service3 from "../assets/Mairie_des_Parcelles_Assainies.webp";
import service4 from "../assets/vue-des-jeunes-eleves-qui-frequentent-l-ecole.jpg";
import service5 from "../assets/Mairie_des_Parcelles_Assainies.webp";
import logo from "../assets/logo.jpg"









const Home = () => {
  const services = [
    { title: "Location Touristique", image: service1},
    { title: "Sortie Pédagogique", image: transportImg },
    { title: "Location pour événement religieux", image: transportImg},
    { title: "Transport Scolaire", image: service4},
    { title: "location pour séminaire d’évenement Team-building", image: transportImg },
    { title: "Service pour association/club sportif", image: transportImg },
  ];
  

  const vehicles = [
    { title: "Bus de 60 places", image: transportImg },
    { title: "Bus de 35 places", image: transportImg6 },
    { title: "Bus de 25 places", image: transportImg2 },
    { title: "Van 10 places", image: transportImg3 },
    { title: "Voiture 7 places", image: transportImg5 },
    { title: "Voiture 5 places", image: transportImg4 },
  ];

  return (
    <div className="container">

      {/* NAVBAR */}
      <nav className="navbar">
      <div className="logo">
    <img src= {logo} alt="Logo Sen Car Express" style={{ height: "85px" , width:"160px"}} />
  </div>
        <div className="menu">
          <a href="#Accueil">Accueil</a>
          <a href="#services">Services</a>
          <a href="#about">À propos de nous</a>  {/* <-- lien ajouté */}
          <a href="#contact">Avis</a>
          <a
    href="/demande-devis"
    style={{
      backgroundColor: "#10b981", 
      color: "white",            // Bleu foncé
      padding: "8px 16px",
      borderRadius: "40px",
      fontWeight: "bold",
      textDecoration: "none",
      boxShadow: "0 2px 6px rgba(18, 146, 26, 0.3)",
      transition: "background-color 0.3s",
    }}
   
  >
    Demander un devis
  </a>
        </div>
      </nav>

      {/* HEADER SECTION */}
      <div
        id="Accueil"
        className="header-section"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "80px",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 300px" }}>
          <h1 className="title-main mb-2">Tukki ak Diam</h1>
          <p className="text-gray mb-4">
            Confort, ponctualité et sérénité :{" "}
            <strong>Sen Car Express</strong> vous accompagne à chaque étape de
            votre trajet.
          </p>
        </div>
        <div style={{ flex: "1 1 300px", textAlign: "right" }}>
          <img
            src={transportImg}
            alt="Transport"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>

      {/* SERVICES + VEHICLES */}
      <div id="services" className="text-center" style={{ marginTop: "80px", marginBottom: "80px" }}>
        <h2 className="title-section my-6 text-center">Nos services</h2>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
             <div className="service-icon">
  <img src={service.image} alt={service.title} style={{ width: "100px", height: "auto" }} />
</div>

              <p>{service.title}</p>
            </div>
          ))}
        </div>

        <h2 className="title-section my-6">Nos véhicules</h2>
        <div className="vehicles-grid">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="vehicle-card">
              <img
                src={vehicle.image}
                alt={vehicle.title}
                className="vehicle-img"
              />
              <div className="vehicle-info">
                <h3 className="vehicle-title">{vehicle.title}</h3>
                <button className="btn-secondary">Réserver</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <h2 className="title-section my-6">A propos de Nous</h2>
      {/* ABOUT SECTION */}
      <section
        id="about"
        className="about-section"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "40px",
          padding: "60px 24px",
          borderRadius: "10px",
          backgroundColor: "#d1fae5",
          color: "black",
          flexWrap: "wrap",
          marginBottom: "80px",
        }}
      >
        <div style={{ flex: "1 1 400px", fontSize: "1.2rem", lineHeight: "1.6" }}>
          <p>
            Sen Car Express est une entreprise spécialisée dans la location de bus grand confort de 60, 35, 25, 15, 10, 7, 5 places idéale pour tous types de déplacements : excursions, événements, sorties scolaires, séminaires, mariages ou voyages en groupe.
          </p>
          <p>
            Notre devise, « Tukkil ak Diam », signifie voyager en toute tranquillité. Elle reflète notre engagement à vous offrir un service de qualité, basé sur la sécurité, la ponctualité et le confort.
          </p>
          <p>
            Chez Sen Car Express, chaque trajet est une expérience. Nous faisons tout pour que vous puissiez voyager l’esprit léger, en toute confiance.
          </p>
        </div>
        <div style={{ flex: "1 1 300px", textAlign: "right" }}>
          <img
            src={transportImg7} // tu peux changer l'image ici si tu veux
            alt="À propos de nous"
            style={{
              width: "100%",
              maxWidth: "600px",
              borderRadius: "10px",
              objectFit: "cover",
              height: "300px"
            }}
          />
        </div>
      </section>
      <section className="why-section">
  {/* Partie gauche : titre */}
  <div className="why-left">
  <div>
    <h2 className="why-title">Pourquoi nous choisir ?</h2>
    <button className="video-button">
      ⭐ Regarder nos vidéos
    </button>
  </div>
</div>


  {/* Partie droite : raisons dans un fond vert avec bordure */}
  <div className="why-right">
    <div>✅ <strong>Confort optimal</strong> : nos véhicules sont spacieux et climatisés.</div>
    <div>⏱️ <strong>Ponctualité garantie</strong> : départs à l’heure, retards évités.</div>
    <div>💰 <strong>Tarifs compétitifs</strong> : qualité premium à prix abordables.</div>
    <div>🛡️ <strong>Sécurité assurée</strong> : chauffeurs formés et véhicules contrôlés.</div>
    <div>⭐ <strong>Expérience client</strong> : service réactif et personnalisé.</div>
  </div>
</section>
<section className="trusted-carousel-section">
  <h2 className="trusted-title">Qui nous ont fait confiance</h2>

  <Swiper
    slidesPerView={3}
    spaceBetween={30}
    freeMode={true}
    pagination={{ clickable: true }}
    modules={[FreeMode, Pagination]}
    className="trusted-swiper"
    breakpoints={{
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
    }}
  >
    {[entreprise1, entreprise2, entreprise3, entreprise4,entreprise5,entreprise6,entreprise7,entreprise8,entreprise9].map((logo, index) => (
      <SwiperSlide key={index}>
        <div className="logo-slide">
          <img src={logo} alt={`Entreprise ${index + 1}`} />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>
<section id="contact" className="reviews-section" style={{ marginTop: "80px", marginBottom: "80px" }}>
  <h2 className="title-section my-6 text-center">Avis de nos clients</h2>
  <div className="reviews-grid" style={{ display: "flex", gap: "30px", flexWrap: "wrap", justifyContent: "center" }}>
    {[{
      name: "Aissatou Ndiaye",
      text: "Service impeccable et chauffeur très professionnel. Je recommande vivement Sen Car Express.",
      rating: 5,
    }, {
      name: "Mamadou Diallo",
      text: "Véhicules confortables et ponctualité au rendez-vous. Très satisfait de notre sortie scolaire.",
      rating: 4,
    }, {
      name: "Fatou Bâ",
      text: "Une expérience agréable, service client réactif et tarifs compétitifs.",
      rating: 5,
    }].map((review, index) => (
      <div
        key={index}
        className="review-card"
        style={{
          flex: "1 1 300px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: index === 1 ? "#d1fae5" : "#f9f9f9", // vert clair pour la box du milieu
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
        }}
      >
        <div style={{ marginBottom: "10px", color: "#fbbf24" }}>
          {Array.from({ length: review.rating }).map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
        <p style={{ fontStyle: "italic" }}>"{review.text}"</p>
        <p style={{ marginTop: "15px", fontWeight: "bold", textAlign: "right" }}>- {review.name}</p>
      </div>
    ))}
  </div>
</section>
<section id="infos-contact" style={{
  display: "flex",
  flexWrap: "wrap",
  marginTop: "60px",
  gap: "30px",
  justifyContent: "flex-start", // aligne à gauche
  paddingLeft: "30px"           // espace intérieur à gauche si besoin
}}>

  <div style={{
  backgroundColor: "#d1fae5", // Vert foncé
  color: "black",
  padding: "20px",
  borderRadius: "10px",
  flex: "1 1 200px",
  maxWidth: "   500px",      // Moins large
  height: "500px"         // Plus haut
}}>,
    <h3 style={{ marginBottom: "20px", fontWeight: "bold", fontSize: "20px" }}>INFOS SEN CAR EXPRESS</h3>

    <p style={{ marginBottom: "15px" }}>
      📧 Email: <a href="mailto:djdjdj djdjdjk@gmail.com" style={{ color: "#d1fae5", textDecoration: "underline" }}>djdjdj djdjdjk@gmail.com</a>
    </p>
    <p style={{ marginBottom: "15px" }}>
      📍 Adresse : Ouest Foire près de la Fédération Sénégalaise de Football
    </p>
    <p style={{ marginBottom: "20px" }}>
      ☎️ Service Client : +221 77 295 51 28
    </p>

    <div style={{ marginBottom: "20px" }}>
      <iframe
        title="map"
        src="https://maps.google.com/maps?q=Pueblo%20Community%20College&t=&z=13&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="200"
        style={{ border: 0, borderRadius: "10px" }}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>

    <div style={{ display: "flex", gap: "10px" }}>
      <a href="#" aria-label="Facebook"><i className="fab fa-facebook text-white text-xl"></i></a>
      <a href="#" aria-label="Instagram"><i className="fab fa-instagram text-white text-xl"></i></a>
      <a href="#" aria-label="Tiktok"><i className="fab fa-tiktok text-white text-xl"></i></a>
    </div>
  </div>

  {/* Bloc formulaire à droite */}
  <div style={{
    flex: "1 1 400px",
    maxWidth: "500px"
  }}>
    <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <div style={{ display: "flex", gap: "10px" }}>
        <input type="text" placeholder="First Name" style={{ flex: 1, padding: "10px", borderBottom: "1px solid #ccc" }} />
        <input type="text" placeholder="Last Name" style={{ flex: 1, padding: "10px", borderBottom: "1px solid #ccc" }} />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <input type="email" placeholder="Email" style={{ flex: 1, padding: "10px", borderBottom: "1px solid #ccc" }} />
        <input type="tel" placeholder="Phone Number" style={{ flex: 1, padding: "10px", borderBottom: "1px solid #ccc" }} />
      </div>
      <textarea placeholder="Write your message.." rows="4" style={{ padding: "10px", borderBottom: "1px solid #ccc" }} />
      <button type="submit" style={{
        backgroundColor: "#d1fae5",
        color: "black",
        padding: "12px",
        borderRadius: "4px",
        border: "none",
        fontWeight: "bold",
        cursor: "pointer",
        width: "fit-content",
        alignSelf: "flex-end",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
      }}>
        Send Message
      </button>
    </form>
  </div>
</section>
  {/* Footer intégré directement ici */}
  <footer className="footer">
  <div className="footer-container">
    
    <div className="footer-column">
      <h3>Services</h3>
      <ul>
        <li>Location Touristique</li>
        <li>Sortie Pédagogique</li>
        <li>Location pour événement religieux</li>
        <li>Transport Scolaire</li>
        <li>location pour séminaire d’évenement Team-building</li>

      </ul>
    </div>

    <div className="footer-column footer-description">
      <p>
      Sen Car Express propose la location de bus confortables (5 à 60 places) pour tous vos déplacements.
      Tukkil ak Diam : voyager en toute tranquillité, avec confort et sécurité.
      </p>
      <div className="footer-socials">
        <i className="fab fa-facebook-f"></i>
        <i className="fab fa-twitter"></i>
        <i className="fab fa-linkedin-in"></i>
      </div>
    </div>

    

    <div className="footer-column">
      <h3>Contact</h3>
      <ul className="contact-list">
        <li><i className="fas fa-phone-alt"></i> 456-575-4551</li>
        <li><i className="fas fa-envelope"></i> example@gmail.com</li>
        <li><i className="fas fa-map-marker-alt"></i> Lorem Ipsum Is Simply Dummy Text Of The Printing</li>
      </ul>
    </div>

  </div>
</footer>


    </div>
  );
};

export default Home;