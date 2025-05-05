import React, { useState } from 'react'

export const useForm = (initial = {}) => {
  const [value, setValue] = useState(initial);
  const handleInputChange = (eOrValue, name) => {
    // Si es un evento de input normal
    if (eOrValue && eOrValue.target) {
      setValue({
        ...value,
        [eOrValue.target.name]: eOrValue.target.value
      });
    } else if (name) {
      // Si es un valor directo (como DatePicker)
      setValue({
        ...value,
        [name]: eOrValue
      });
    } else if (eOrValue.target.type === 'file') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setValue({ ...form, img: reader.result });
        };
        reader.readAsDataURL(file);
      }
    }
  }
  return [value, handleInputChange];
}
