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
    }
  }
  return [value, handleInputChange];
}

