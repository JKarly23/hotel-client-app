import React, { useRef } from 'react'
import html2canvas from 'html2canvas'
import { QRCodeSVG } from 'qrcode.react'
import { useNavigate } from 'react-router-dom'

const QRDownload = ({ value }) => {
  const qrRef = useRef(null)
  const navigate = useNavigate();

  const handleDownload = async () => {
    if (!qrRef.current) return
    const canvas = await html2canvas(qrRef.current)
    const link = document.createElement('a')
    link.download = 'reserva-qr.png'
    link.href = canvas.toDataURL()
    link.click()
    setTimeout(() => navigate('/'), 2000)
  }

  // Construir un string legible para el QR
  const qrText = `Reserva LuxeStay Hotel\nCode: ${value.id}\nNombre: ${value.user?.name}\nHabitación: ${value.room?.number}\nTotal: $${value.totalPrice}\nCheck-in: ${value.checkInDate}\nCheck-out: ${value.checkOutDate}`

  return (
    <div className="flex justify-center items-center min-h-screen from-indigo-100 via-purple-100 to-pink-100 p-4 animate__animated animate__fadeIn">
      <div className="max-w-md w-full rounded-3xl shadow-2xl p-8 bg-white/90 backdrop-blur-md border border-indigo-100">
        <div className="flex flex-col items-center space-y-6">
          {/* QR y datos que se descargan */}
          <div ref={qrRef} className="bg-white p-6 rounded-2xl shadow-2xl">
            <h2 style={{ color: "#4f46e5" }} className="text-2xl font-bold mb-2">LuxeStay Hotel</h2>
            <QRCodeSVG
              value={qrText}
              size={220}
              bgColor="#ffffff"
              fgColor="#1f2937"
              level="H"
              includeMargin={true}
            />
            <p style={{ color: "#334155" }} className="text-lg font-medium">{value.user?.name}</p>
            <p style={{ color: "#64748b" }} className="text-md">Habitación: {value.room?.number}</p>
            <p style={{ color: "#64748b" }} className="text-md">Total: ${value.totalPrice}</p>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="w-full mt-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Descargar QR
        </button>

        <p className="text-sm text-gray-500 max-w-sm text-center mt-6">
          Escanea este código QR al llegar para realizar tu check-in rápido y sin contacto.
        </p>
      </div>
    </div>
  )
}

export default QRDownload
