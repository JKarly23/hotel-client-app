export const fileUpload = async (file) => {
    const clodUrl = import.meta.env.VITE_CLOUDINARY_URL;
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);
    try {
        const resp = await fetch(clodUrl, {
            method: 'POST',
            body: formData
        });
        if (resp.ok) {
            const data = await resp.json();
            console.log(data.secure_url)
            return data.secure_url
        } else {
            throw new resp.json()
        }
    } catch (error) {
        console.warn(error.message);
    }
}