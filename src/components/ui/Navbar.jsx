import React, { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import UserNav from './UserNav'

const Navbar = () => {
    const navigation = [
        { name: 'Inicio', href: '/' },
        { name: 'Habitaciones', href: '/rooms' },
        { name: 'Contacto', href: '/contact' },
    ]
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    // Imagen de perfil por defecto
    const img = user?.img ? user.img : 'https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=CWihwAiT6S2emg&pid=ImgRaw&r=0'

    return (
        <header className="absolute inset-x-0 top-0 z-50 bg-gradient-to-b from-gray-100 to-white shadow">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">LuxerGTk</span>
                        <img
                            alt="Logo"
                            src="../../../public/hotel-icon-symbol-sign-vector.jpg"
                            className="h-12 w-auto rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} to={item.href} className="text-sm/6 font-semibold text-gray-900">
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {!isAuthenticated ? (
                        <Link 
                            to="/auth/login" 
                            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md shadow-sm hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                        >
                            Iniciar sesión
                            <span aria-hidden="true" className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    ) : (
                        <div className="relative">
                            <UserNav
                                img={img}
                                dropdownOpen={dropdownOpen}
                                setDropdownOpen={setDropdownOpen}
                                setMobileMenuOpen={setMobileMenuOpen}
                                className="hover:ring-2 hover:ring-blue-500 transition-all duration-300"
                            />
                        </div>
                    )}
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">LuxerGTk</span>
                            <img
                            alt="Logo"
                            src="../../../public/hotel-icon-symbol-sign-vector.jpg"
                            className="h-12 w-auto rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        />
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="py-6">
                                {!isAuthenticated
                                    ? (
                                        <Link to="/auth/login" className="text-sm/6 font-semibold text-gray-900">
                                            Iniciar sesión <span aria-hidden="true">&rarr;</span>
                                        </Link>
                                    )
                                    : (
                                        <UserNav
                                            img={img}
                                            dropdownOpen={dropdownOpen}
                                            setDropdownOpen={setDropdownOpen}
                                            setMobileMenuOpen={setMobileMenuOpen}
                                        />
                                    )}

                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}

export default Navbar

