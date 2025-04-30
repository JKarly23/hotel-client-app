export default function RoomImageGallery({ image }) {
  return (
    <div className="max-w-full mx-auto p-4 sm:p-6 animate__animated animate__fadeInLeftBig">
      <div className="grid gap-6 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt="Imagen principal"
            className="w-full h-[250px] sm:h-[300px] object-cover transform hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>
        <div className="hidden sm:grid sm:grid-cols-2 gap-6 p-4">
          <div className="overflow-hidden rounded-xl">
            <img 
              src={image} 
              alt="Extra 1" 
              className="h-48 w-full object-cover hover:opacity-90 transition-opacity duration-300 ease-in-out"
            />
          </div>
          <div className="overflow-hidden rounded-xl">
            <img 
              src={image} 
              alt="Extra 2" 
              className="h-48 w-full object-cover hover:opacity-90 transition-opacity duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
