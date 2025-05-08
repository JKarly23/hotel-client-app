import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import { RoomService } from "../../../services/RoomService";
import { handleApiError } from "../../../utils/handleApiError";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { Loader } from "lucide-react";
import { deleteRoom } from "../../../feautere/room/roomSlice";
import { useDispatch } from "react-redux";

const roomsService = new RoomService();

const RoomDeleteModal = ({ isOpen, onClose, room }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const dispatch = useDispatch();

  const onDelete = async (id) => {
    try {
      setLoading(true);
      await roomsService.delete(id)
      dispatch(deleteRoom(room.id));
      setFeedbackMessage('Habitación eliminada');
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (feedbackMessage) {
      const timer = setTimeout(() => {
        setFeedbackMessage("");
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [feedbackMessage, onClose]);

  return (
    <>

      <Modal isOpen={isOpen} onClose={onClose}>
        {feedbackMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded-2xl shadow-md flex items-center gap-3 mb-4 w-full justify-center"
          >
            <FaCheckCircle className="text-green-500 text-xl" />
            <span>{feedbackMessage}</span>
          </motion.div>
        )}
        {loading && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <Loader className="h-4 w-4 animate-spin" />
            <span>Eliminando habitación...</span>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-2xl mb-4 shadow-md w-full text-center">
            ⚠️ {error}
          </div>
        )}
        <div className="flex flex-col items-center">
          {!feedbackMessage && (
            <>
              <h2 className="text-xl font-bold text-red-600 mb-4">¿Eliminar habitación?</h2>
              <p className="mb-6 text-gray-600">Esta acción no se puede deshacer. ¿Deseas continuar?</p>
              <div className="flex justify-end gap-2 w-full">
                <button onClick={onClose} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Cancelar</button>
                <button
                  onClick={() => onDelete(room?.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  disabled={loading}
                >
                  Eliminar
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default RoomDeleteModal;
