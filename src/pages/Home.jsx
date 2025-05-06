import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RoomService } from '../services/RoomService';
import { useRef } from 'react';
import { motion } from "framer-motion";
import heroImage from '../../public/img/hero1.jpg';
import hotel from '../../public/img/hero.png';
import service1 from '../../public/img/service1.jpg';
import service2 from '../../public/img/service2.jpg';
import service3 from '../../public/img/service3.jpg';
import service4 from '../../public/img/service4.jpg';
import service5 from '../../public/img/service5.jpg';
import service6 from '../../public/img/service6.jpg';
import service7 from '../../public/img/service7.jpg';
import Footer from '../components/ui/Footer';

const roomService = new RoomService();

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [start, setStart] = useState(0);
  const intervalRef = useRef(null);
  const servicesRef = useRef(null);

  const hotelServices = [
    {
      nombre: "Recepción 24/7",
      img: service1,
      descripcion: "Atención disponible las 24 horas para garantizar tu comodidad y seguridad en cualquier momento del día."
    },
    {
      nombre: "Desayuno Incluido",
      img: service2,
      descripcion: "Empieza tu día con una variedad de opciones deliciosas en nuestro desayuno buffet gratuito."
    },
    {
      nombre: "Piscina",
      img: service3,
      descripcion: "Relájate en nuestra piscina al aire libre con zona de tumbonas y servicio de bar."
    },
    {
      nombre: "Gimnasio",
      img: service4,
      descripcion: "Mantente activo durante tu estancia con nuestro gimnasio equipado con máquinas modernas."
    },
    {
      nombre: "Spa & Wellness",
      img: service5,
      descripcion: "Disfruta de tratamientos de relajación, masajes y sauna para una experiencia de bienestar total."
    },
    {
      nombre: "Restaurante Gourmet",
      img: service6,
      descripcion: "Saborea platos internacionales y locales en nuestro restaurante con servicio a la carta."
    },
    {
      nombre: "Servicio a la Habitación",
      img: service7,
      descripcion: "Disfruta de comida y bebidas en la comodidad de tu habitación, disponible las 24 horas."
    },
  ];

  // Controlar el scroll para cambiar estilos del nav secundario
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await roomService.getRoomAvailable();
        if (data) setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    if (rooms.length < 4) return;

    intervalRef.current = setInterval(() => {
      setStart((prev) => (prev + 3) % rooms.length);
    }, 10000);

    servicesRef.current = setInterval(() => {
      setStart((prev) => (prev + 1) % hotelServices.length);
    }, 5000);

    return () => clearInterval(intervalRef.current, servicesRef.current);
  }, [rooms]);

  const visibleRooms =
    rooms.length < 4
      ? rooms
      : [...rooms, ...rooms].slice(start, start + 3);
  const services =
    hotelServices.length < 4
      ? hotelServices
      : [...hotelServices, ...hotelServices].slice(start, start + 1);

  return (
    <div className="bg-gradient-to-b from-gray-100 to-indigo-50 min-h-screen text-gray-800">


      {/* Hero Section */}
      <section id="hero" className="relative h-screen w-full overflow-hidden animate__animated animate__fadeInUp ">
        <div className="absolute inset-0 w-full h-full m-5">
          <img
            src={heroImage}
            alt="Hotel LuxeStay"
            className="w-full h-full object-cover"
          />
          {/* Gradiente lineal para mejorar la legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent"></div>
        </div>
        <div className="relative h-full flex items-center justify-center z-10">
          <div className="text-center max-w-3xl px-4">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl mb-6 drop-shadow-lg">
              Descubre el lujo y confort en LuxeStay
            </h1>
            <p className="mt-6 text-xl text-white/90 drop-shadow">
              Una experiencia única en el corazón de la ciudad. Disfruta de nuestras lujosas habitaciones, restaurante gourmet y servicios exclusivos.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#rooms"
                className="rounded-md bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 transition"
              >
                Ver habitaciones
              </a>
              <a href="#about" className="text-base font-semibold text-white hover:text-indigo-200 transition">
                Conócenos <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Navegación secundaria (fixed después del scroll) */}
      <nav className={`top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'fixed bg-white shadow-md' : 'sticky bg-white/90 backdrop-blur'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-6 h-14 items-center text-sm font-medium text-gray-700">
            {['about', 'rooms', 'services', 'location'].map((id) => (
              <a key={id} href={`#${id}`} className="hover:text-indigo-600 transition">
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Sección Sobre Nosotros */}
      <section id="about" className="py-20 animate__animated animate__fadeInUp">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Sobre Nosotros</h2>
            <div className="mt-2 h-1 w-20 bg-indigo-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            < div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Un oasis de lujo en el corazón de la ciudad</h3>
              <p className="text-gray-600 mb-6">
                LuxeStay ofrece una experiencia única de hospedaje, combinando elegancia, confort y servicio excepcional. Desde nuestra fundación en 2010, nos hemos dedicado a crear momentos memorables para nuestros huéspedes.
              </p>
              <p className="text-gray-600">
                Nuestras instalaciones de primer nivel, atención personalizada y ubicación privilegiada nos convierten en la opción perfecta tanto para viajeros de negocios como para aquellos que buscan unas vacaciones inolvidables.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img src={hotel} alt="Hotel LuxeStay Interior" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Sección Habitaciones */}
      <section id="rooms" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl tracking-tight">Nuestras Habitaciones</h2>
            <div className="mt-2 h-1 w-20 bg-indigo-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Descubre nuestras elegantes habitaciones diseñadas para ofrecerte el máximo confort durante tu estancia.
            </p>
          </div>
          <div className="relative">
            {/* Gradiente difuminado inferior */}
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/90 to-transparent z-10 "></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleRooms.map((room, idx) => (
                <div
                  key={room.id}
                  className={`bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-gray-100 animate__animated animate__fadeIn animate__delay-${idx}s`}
                >
                  <img
                    src={room.img}
                    alt={room.type}
                    className="w-full h-64 object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                  <div className="p-7 flex flex-col gap-3">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Habitación {room.type}</h3>
                    <p className="text-gray-500 mb-2 line-clamp-3">{room.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-indigo-600 font-extrabold text-lg">${room.price}/noche</span>
                      <a
                        href={`/room/${room.id}`}
                        className="inline-block rounded-full bg-indigo-50 text-indigo-700 px-4 py-2 text-sm font-semibold hover:bg-indigo-600 hover:text-white transition"
                      >
                        Ver detalles →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-12">
            <a
              href="/rooms"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-indigo-500 transition font-semibold text-lg"
            >
              Ver todas las habitaciones
            </a>
          </div>
        </div>
      </section>

      {/* Sección Habitaciones */}
      <section id="services" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl tracking-tight">Nuestros Servicios</h2>
            <div className="mt-2 h-1 w-20 bg-indigo-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              En nuestro hotel, cada detalle está pensado para brindarte una experiencia inolvidable. Disfruta de una amplia gama de servicios diseñados para tu comodidad y bienestar.
            </p>
          </div>
          {services.map((service, idx) => (
            <motion.div
              key={service.nombre}
              className="relative rounded-3xl overflow-hidden shadow-xl h-full border border-gray-100 bg-white group transition-all duration-300 hover:shadow-2xl"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.15, type: "spring" }}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(99,102,241,0.15)" }}
            >
              <img
                src={service.img}
                alt={service.nombre}

                height={400}

                className="w-full h-130 object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold mb-2 drop-shadow">{service.nombre}</h3>
                <p className="text-white text-base mb-2 drop-shadow">{service.descripcion}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sección Ubicación */}
      <section id="location" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full animate__animated animate__animate__zoomIn">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl tracking-tight">¿Dónde estamos?</h2>
            <div className="mt-2 h-1 w-20 bg-indigo-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Visítanos en el corazón de la ciudad. Nuestra ubicación privilegiada te conecta con los principales atractivos y servicios.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <iframe
                title="Ubicación Hotel Paradise"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.887123456789!2d-74.081753684675!3d4.609710343987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMzYnMzUuMCJOIDc0wrAwNCcxMC4zIlc!5e0!3m2!1ses-419!2sco!4v1680000000000!5m2!1ses-419!2sco"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[350px] border-0"
              ></iframe>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">LuxeStay Hotel</h3>
              <p className="text-gray-700 mb-2 flex items-center">
                <span className="material-icons text-indigo-600 mr-2">location_on</span>
                Av. Principal 123, Ciudad
              </p>
              <p className="text-gray-700 mb-2 flex items-center">
                <span className="material-icons text-indigo-600 mr-2">phone</span>
                +1 234 567 890
              </p>
              <p className="text-gray-700 mb-2 flex items-center">
                <span className="material-icons text-indigo-600 mr-2">email</span>
                info@hotelparadise.com
              </p>
              <a
                href="https://www.google.com/maps?q=Hotel+Paradise"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-500 transition font-semibold text-lg"
              >
                Ver en Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Home;