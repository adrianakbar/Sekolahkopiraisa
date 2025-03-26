'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        
        // Simulasi validasi sederhana
        if (!email || !password) {
            setErrors(['Email dan password wajib diisi.']);
            return;
        }
        
        console.log('Login dengan:', { email, password });
        // Tambahkan logika autentikasi di sini
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4">
            <div className="bg-white shadow-lg rounded-lg flex w-full max-w-4xl overflow-hidden">
                {/* Side Image */}
                <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/image/backgroundlogin.jpeg')" }}></div>
                
                {/* Form Section */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
                    <img src="/assets/logo.png" alt="Logo" className="w-20 mb-6" />
                    <h2 className="text-2xl font-semibold mb-6">Login</h2>
                    
                    {errors.length > 0 && (
                        <div className="bg-red-100 text-red-700 p-2 rounded-md w-full mb-4 text-sm">
                            <ul>
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-400"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-400"
                                required
                            />
                        </div>
                        
                        <div className="flex justify-end text-sm text-blue-500 mb-4">
                            <Link href="/lupapassword">Lupa Password?</Link>
                        </div>

                        <button type="submit" className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-900 transition">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
