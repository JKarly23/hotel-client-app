export const handleApiError = (err, fallbackMessage = 'Ocurrió un error inesperado') => {

    if (err?.response?.status) {
        const { status, data } = err.response;
        switch (status) {
            case 400:
                return { message: data?.message || 'Solicitud incorrecta. Verifica los datos enviados.' };
            case 401:
                return { message: 'No autorizado. Por favor, inicia sesión para continuar.' };
            case 403:
                return { message: 'Acceso denegado. No tienes permisos para realizar esta acción.' };
            case 404:
                return { message: 'Recurso no encontrado. Verifica la URL o el recurso solicitado.' };
            case 409:
                return { message: data?.message || 'Conflicto de datos. Es posible que el recurso ya exista o haya un conflicto con la información enviada.' };
            case 422:
                return { message: data?.message || 'Datos no válidos. Por favor, revisa los campos del formulario.' };
            case 429:
                return { message: 'Demasiadas solicitudes. Por favor, espera un momento antes de intentarlo de nuevo.' };
            case 500:
                return { message: 'Error interno del servidor. Intenta nuevamente más tarde.' };
            case 503:
                return { message: 'Servicio no disponible. El servidor está en mantenimiento o sobrecargado.' };
            default:
                return { message: data?.message || fallbackMessage };
        }
    }

    if (err?.message && typeof err.message === 'string') {
        return { message: err.message + (err.code ? ` (Código: ${err.code})` : '') };
    }

    return { message: fallbackMessage };
};