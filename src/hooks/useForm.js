import React, {useState} from 'react'

export const useForm = (initial = {}) => {
  const [value, setValue] = useState(initial);
  const handleInputChange = (e) => {
    e.preventDefault();
    setValue({
        ...value,
        [e.target.name]: e.target.value
    })
  }
  return [value, handleInputChange];
}

