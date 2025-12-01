import React from 'react';

export default function Success() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✅</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">¡Pago Exitoso!</h1>
        <p className="text-gray-600 mb-6">
          Tu pedido ha sido procesado correctamente. Recibirás un correo de confirmación shortly.
        </p>
        <a 
          href="/"
          className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition"
        >
          Volver a la Tienda
        </a>
      </div>
    </div>
  );
}