import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useForm } from "../hooks/useForm";

const Contact = () => {
    const [value, handleInputChange] = useForm({
        name: '',
        email: '',
        telefono: '',
        mensaje: ''
    })
    const { name, email, telefono, mensaje } = value;

    const [error, setError] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !mensaje) {
            setError("Los campos nombre, email o mensaje son obligatorios");
            return;
        }

        setError("");
        setFeedbackMessage("Gracias por contactarnos. Te responderemos lo antes posible.");
    };

    // Ocultar mensaje automáticamente después de 4 segundos
    useEffect(() => {
        if (feedbackMessage) {
            const timer = setTimeout(() => setFeedbackMessage(""), 4000);
            return () => clearTimeout(timer);
        }
    }, [feedbackMessage]);

    return (
        <div className="relative">
            {error && (
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-2xl mb-4 shadow-md">
                    ⚠️ {error}
                </div>
            )}
            



            <div id="contact" className="py-20 bg-indigo-50 m-5 w-full min-h-screen overflow-hidden animate__animated animate__fadeIn">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
                    <div className="text-center mb-12 animate__animated animate__fadeInDown">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl tracking-tight">Contáctanos</h2>
                        <div className="mt-2 h-1 w-20 bg-indigo-600 mx-auto rounded-full"></div>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            ¿Tienes dudas, sugerencias o quieres reservar? Escríbenos y te responderemos lo antes posible.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate__animated animate__fadeInLeft">
                        {/* Formulario de contacto */}
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
                        {/* Información de contacto y mapa */}
                        <div className="flex flex-col gap-8 justify-between">
                            <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col gap-4">
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
                                <div className="flex gap-4 mt-4 animate__animated animate__fadeInLefth">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-800 transition" aria-label="Facebook">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                                    </a>
                                    <a href="#" className="text-indigo-600 hover:text-indigo-800 transition" aria-label="Instagram">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 2.75a5.75 5.75 0 1 1 0 11.5 5.75 5.75 0 0 1 0-11.5zm0 1.5a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5zm5.25 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" /></svg>
                                    </a>
                                    <a href="#" className="text-indigo-600 hover:text-indigo-800 transition" aria-label="Twitter">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.85 1.94 3.63a4.27 4.27 0 0 1-1.94-.54v.05c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.11 2.9 3.97 2.93A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.72 8.72 0 0 0 24 4.59a8.5 8.5 0 0 1-2.54.7z" /></svg>
                                    </a>
                                </div>
                            </div>
                            <div className="animate__animated animate_fadeInUp rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                                <iframe
                                    title="Ubicación LuxeStay Hotel"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.887123456789!2d-74.081753684675!3d4.609710343987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMzYnMzUuMCJOIDc0wrAwNCcxMC4zIlc!5e0!3m2!1ses-419!2sco!4v1680000000000!5m2!1ses-419!2sco"
                                    width="100%"
                                    height="200"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-[200px] border-0"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Contact