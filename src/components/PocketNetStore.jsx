import React, { useState } from 'react';
import { Wifi, ShoppingCart, Check, X, Zap, Shield, Globe, Users } from 'lucide-react';

export default function PocketNetStore() {
  const [showModal, setShowModal] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    cantidad: 1
  });

  const precio = 1;
  // const precioOriginal = 799; // ← ELIMINADA porque no se usa

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const procesarPagoStripe = async () => {
    setPaymentProcessing(true);

    try {
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          telefono: formData.telefono,
          email: formData.email,
          direccion: formData.direccion,
          ciudad: formData.ciudad,
          codigoPostal: formData.codigoPostal,
          cantidad: formData.cantidad,
          precio: precio
        })
      });

      const result = await response.json();

      if (result.success && result.sessionUrl) {
        window.location.href = result.sessionUrl;
      } else {
        throw new Error(result.error || 'Error al procesar el pago');
      }

    } catch (error) {
      alert('Error al procesar el pago: ' + error.message);
      setPaymentProcessing(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.nombre || !formData.telefono || !formData.email || !formData.direccion || !formData.ciudad || !formData.codigoPostal) {
      alert('Por favor completa todos los campos');
      return;
    }

    await procesarPagoStripe();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wifi className="w-8 h-8 text-pink-600" />
            <span className="text-2xl font-bold text-gray-800">PocketNet Pro</span>
          </div>

          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition">
            <ShoppingCart className="w-5 h-5" />
            <span>Comprar</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-pink-600 to-red-600 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-yellow-400 text-red-700 px-6 py-2 rounded-full font-bold text-xl transform rotate-12">
            50% OFF
          </div>

          <h1 className="text-5xl font-bold mb-4">$399 MXN</h1>
          <p className="text-2xl mb-2">Precio original: <span className="line-through">$799 MXN</span></p>

          <div className="mt-6 space-y-2">
            <p className="text-xl">🌐 La forma más fácil de tener internet portátil donde estés</p>
            <p className="text-lg opacity-90">PROMOCIÓN ESPECIAL DE FIN DE AÑO</p>
          </div>
        </div>

        {/* Resto del código SIN CAMBIOS... */}
        {/* ... (todo el resto del JSX igual) ... */}
      </main>
    </div>
  );
}
