export const handleApiError = (err, fallbackMessage = 'Ocurrió un error inesperado') => {
    console.error(err);

    if (err.response) {
        const { status } = err.response;
        if (status === 500) return { message: 'Error del servidor. Intenta más tarde.' };
        if (status === 404) return { message: 'Recurso no encontrado.' };
        if (status === 401) return { message: 'No autorizado. Inicia sesión.' };
        if (status === 403) return { message: 'Acceso denegado.' };
        // Puedes agregar más según tus necesidades
    }

    return { message: fallbackMessage };
};