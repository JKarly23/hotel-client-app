'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { isFormValid } from '../../helpers/formValidators'
import { useDispatch, useSelector } from 'react-redux'
import { removeErrors, setErrors } from '../../feautere/errors/errorSlice'
import { AuthService } from '../../services/AuthService';
import { setUser } from '../../feautere/auth/authSlice';
import { handleApiError } from '../../utils/handleApiError'
import Loader from '../ui/Loader'
import ErrorMessage from '../ui/ErrorMessage';
import { useNavigate } from 'react-router-dom';



const authService = new AuthService();



const Login = () => {
  const initialValue = { email: '', password: '' }
  const [value, handleInputChange] = useForm(initialValue)
  const { email, password } = value
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { errors } = useSelector((state) => state.errors)
  const lastPath = localStorage.getItem('lastPath') || '/'

  const handleSubmit = (e) => {
    e.preventDefault()
    const { isValid, errors } = isFormValid({ email, password })
    if (!isValid) {
      dispatch(setErrors(errors))
    } else {
      const login = async () => {
        try {
          setLoading(true);
          const user = await authService.login({ email, password });
          dispatch(setUser(user));
          navigate(lastPath);
          localStorage.removeItem('lastPath');
        } catch (err) {
          if (['ERR_BAD_REQUEST', 'ERR_NOT_FOUND'].includes(err.code)) {
            setError({ message: 'Usuario no encontrado' });
          } else {
            setError(handleApiError(err))
          }
        } finally {
          setLoading(false);
        }
      }
      login();
      dispatch(removeErrors())
    }

  }

  if (loading) return <Loader message="Iniciando Sección..." />;
  if (error?.code && !['ERR_BAD_REQUEST', 'ERR_NOT_FOUND', 400, 401, 404].includes(error.code)) return <ErrorMessage error={error} />;
  return (
    <div className="animate__animated animate__fadeIn relative min-h-screen flex items-center justify-center bg-white px-4 py-8 sm:px-6 lg:px-8">
      {/* Fondo decorativo */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:w-[72rem]"
        />
      </div>

      <div className="flex w-full max-w-5xl shadow-xl rounded-2xl overflow-hidden bg-white border border-gray-200">
        {/* Izquierda - Bienvenida (oculto en móviles) */}
        <div className="hidden md:flex flex-col justify-center items-start bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] text-white p-10 w-1/2">
          <h2 className="text-4xl font-bold mb-4">¡Bienvenido de nuevo!</h2>
          <p className="text-lg leading-relaxed mb-6">
            Nos alegra tenerte de vuelta. Inicia sesión para acceder a tu cuenta y continuar donde lo dejaste.
          </p>
          <p className="text-sm">
            ¿No tienes cuenta?{' '}
            <Link to="/auth/register" className="underline font-semibold hover:text-white/80 transition">
              Crea una ahora
            </Link>
          </p>
        </div>

        {/* Derecha - Formulario */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Iniciar sesión</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 rounded-md shadow-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700 font-medium">{error.message}</p>
                  </div>
                </div>
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleInputChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handleInputChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.pass && <p className="text-sm text-red-500 mt-1">{errors.pass}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Iniciar sesión
            </button>

            <div className="text-center text-sm text-gray-500">
              ¿No tienes cuenta?{' '}
              <Link to="/auth/register" className="text-indigo-600 font-medium hover:underline">
                Regístrate
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
