import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

const BookingScanner = ({ action }) => {
  const [message, setMessage] = useState(null); // { type: "success" | "error", text: string }

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      async (text) => {
        try {
          const { bookingId } = JSON.parse(text);
          const endpoint = action === "checkin"
            ? "/api/bookings/check-in"
            : "/api/bookings/check-out";

          const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bookingId }),
          });

          if (res.ok) {
            setMessage({ type: "success", text: "✅ Acción realizada con éxito" });
          } else {
            setMessage({ type: "error", text: "❌ Error al procesar la acción" });
          }

          await scanner.clear();
        } catch (err) {
          setMessage({ type: "error", text: "Código QR inválido" });
        }
      },
      (err) => {
        console.warn("QR Scan error:", err);
        if (err.name === "NotAllowedError") {
          setMessage({ type: "error", text: "Permiso de cámara denegado" });
        } else if (err.name === "NotFoundError") {
          setMessage({ type: "error", text: "No se encontró cámara disponible" });
        } else if (err.name === "NotReadableError") {
          setMessage({ type: "error", text: "La cámara está siendo usada por otra app o no se puede acceder" });
        } else {
          setMessage({ type: "error", text: "Error al acceder a la cámara" });
        }
      }
    );

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [action]);

  // Ocultar mensaje después de 4 segundos
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div id="qr-reader" className="rounded shadow" />

      {message && (
        <div
          className={`absolute top-2 left-1/2 -translate-x-1/2 px-4 py-3 rounded-xl shadow-lg text-white font-medium transition-all duration-300 ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default BookingScanner;
