const validatePassword = (password = '') => {
    return password.length > 4;
}

const validateEmail = (email = '') => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const validateName = (name = '') => {
    return name.length > 4;
}

const validatePhone = (phone = '') => {
    return /^[0-9]{10}$/.test(phone);
} 

export const isFormValid = ({password = '', email = '', name = '', phone = ''}) => {
    const errors = {}
    if(password && !validatePassword(password)) errors.password = 'Password must be at least 5 characters long';
    if(email && !validateEmail(email)) errors.email = 'Email is not valid';
    if(name && !validateName(name)) errors.name = 'Name must be at least 3 characters long';
    if(phone &&!validatePhone(phone)) errors.phone = 'Phone must be 10 digits long';
    const isValid = Object.keys(errors).length === 0;
    return {
        isValid,
        errors
    }
}