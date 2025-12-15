import React, { useState } from 'react';
// Prueba primero sin los íconos para ver si ese es el problema
// import { Wifi, ShoppingCart, Check, X, Zap, Shield, Globe, Users } from 'lucide-react';

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
  const precioOriginal = 799;

  console.log('Componente renderizando'); // Para debugging

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const procesarPagoStripe = async () => {
    setPaymentProcessing(true);
    console.log('Procesando pago...'); // Para debugging

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
      console.log('Respuesta Stripe:', result); // Para debugging

      if (result.success && result.sessionUrl) {
        window.location.href = result.sessionUrl;
      } else {
        throw new Error(result.error || 'Error al procesar el pago');
      }

    } catch (error) {
      console.error('Error en pago:', error); // Para debugging
      alert('Error al procesar el pago: ' + error.message);
      setPaymentProcessing(false);
    }
  };

  const handleSubmit = async () => {
    console.log('Handle submit', formData); // Para debugging
    if (!formData.nombre || !formData.telefono || !formData.email || !formData.direccion || !formData.ciudad || !formData.codigoPostal) {
      alert('Por favor completa todos los campos');
      return;
    }

    await procesarPagoStripe();
  };

  // Versión simplificada para debugging
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 p-4">
      <h1 className="text-3xl font-bold text-center text-red-600">
        PocketNet Store - Funcionando
      </h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mt-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Producto: PocketNet Pro</h2>
        <p className="text-lg mb-4">Precio: ${precio} MXN</p>
        
        <button 
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
        >
          Comprar ahora
        </button>
        
        <div className="mt-4">
          <p>Estado modal: {showModal ? 'Abierto' : 'Cerrado'}</p>
          <p>Procesando pago: {paymentProcessing ? 'Sí' : 'No'}</p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Formulario de compra</h3>
            
            <div className="space-y-3">
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Nombre"
                className="w-full border p-2 rounded"
              />
              
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full border p-2 rounded"
              />
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded flex-1"
                >
                  Cancelar
                </button>
                
                <button 
                  onClick={handleSubmit}
                  disabled={paymentProcessing}
                  className="px-4 py-2 bg-pink-600 text-white rounded flex-1 disabled:opacity-50"
                >
                  {paymentProcessing ? 'Procesando...' : 'Pagar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
