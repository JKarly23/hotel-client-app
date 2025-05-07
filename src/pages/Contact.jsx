import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useForm } from "../hooks/useForm";

const Contact = () => {
    const [value, handleInputChange, reset] = useForm({
        name: '',
        email: '',
        telefono: '',
        mensaje: ''
    });
    const { name, email, telefono, mensaje } = value;

    const [error, setError] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !mensaje) {
            setError("Los campos nombre, email o mensaje son obligatorios");
            return;
        }
        reset();
        setError("");
        setFeedbackMessage("Gracias por contactarnos. Te responderemos lo antes posible.");
    };

    useEffect(() => {
        if (feedbackMessage) {
            const timer = setTimeout(() => setFeedbackMessage(""), 4000);
            return () => clearTimeout(timer);
        }
    }, [feedbackMessage]);

    return (
        <div className="relative overflow-hidden w-full min-h-screen bg-indigo-50">
            {/* Mensaje de error */}
            {error && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-2xl mb-4 shadow-md z-50">
                    ⚠️ {error}
                </div>
            )}

            {/* Mensaje de confirmación */}
            {feedbackMessage && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded-2xl shadow-md flex items-center gap-3 z-50"
                >
                    <FaCheckCircle className="text-green-500 text-xl" />
                    <span>{feedbackMessage}</span>
                </motion.div>
            )}

            <div id="contact" className="py-20 px-4 sm:px-6 lg:px-8 animate__animated animate__fadeIn mt-5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 animate__animated animate__fadeInDown">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl tracking-tight">Contáctanos</h2>
                        <div className="mt-2 h-1 w-20 bg-indigo-600 mx-auto rounded-full"></div>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            ¿Tienes dudas, sugerencias o quieres reservar? Escríbenos y te responderemos lo antes posible.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate__animated animate__fadeInLeft">
                        {/* Formulario */}
                        <form onSubmit={handleSubmit}
                            className="bg-white rounded-3xl shadow-xl p-8 flex flex-col gap-6">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Nombre</label>
                                <input type="text" required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    placeholder="Tu nombre"
                                    name="name"
                                    value={name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Correo electrónico</label>
                                <input type="email" required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    placeholder="tucorreo@email.com"
                                    name="email"
                                    value={email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Teléfono (opcional)</label>
                                <input type="tel"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    placeholder="Tu teléfono"
                                    name="telefono"
                                    value={telefono}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Mensaje</label>
                                <textarea required rows={4}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    placeholder="¿En qué podemos ayudarte?"
                                    name="mensaje"
                                    value={mensaje}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                            <button type="submit" className="bg-indigo-600 text-white font-semibold py-3 rounded-full shadow-lg hover:bg-indigo-500 transition text-lg">
                                Enviar mensaje
                            </button>
                        </form>

                        {/* Información */}
                        <div className="flex-col gap-8 justify-between hidden sm:block">
                            <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col gap-4 ">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">LuxeStay Hotel</h3>
                                <p className="text-gray-700 flex items-center">
                                    <span className="material-icons text-indigo-600 mr-2">location_on</span>
                                    Av. Principal 123, Ciudad
                                </p>
                                <p className="text-gray-700 flex items-center">
                                    <span className="material-icons text-indigo-600 mr-2">phone</span>
                                    +1 234 567 890
                                </p>
                                <p className="text-gray-700 flex items-center">
                                    <span className="material-icons text-indigo-600 mr-2">email</span>
                                    info@luxestay.com
                                </p>
                                {/* Redes sociales */}
                                <div className="flex gap-4 mt-4">
                                    {/* Íconos... los mantuve igual */}
                                </div>
                            </div>
                            {/* Mapa */}
                            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 mt-5">
                                <iframe
                                    title="Ubicación LuxeStay Hotel"
                                    src="https://www.google.com/maps/embed?pb=..."
                                    width="100%"
                                    height="200"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-[200px]"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
