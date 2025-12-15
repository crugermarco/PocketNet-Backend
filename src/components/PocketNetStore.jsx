import React, { useState } from 'react';
import { Wifi, ShoppingCart, Check, X, Zap, Shield, Globe, Users } from 'lucide-react';

export default function PocketNetStore() {
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
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

  const precio = 001;
  const precioOriginal = 799;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const procesarPagoStripe = async () => {
  setPaymentProcessing(true);

  try {
    // URL relativa - apunta a tu API en el mismo dominio
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
      // Redirigir directamente a Stripe
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
          <p className="text-2xl mb-2">Precio original: <span className="line-through">${precioOriginal} MXN</span></p>

          <div className="mt-6 space-y-2">
            <p className="text-xl">🌐 La forma más fácil de tener internet portátil donde estés</p>
            <p className="text-lg opacity-90">PROMOCIÓN ESPECIAL DE FIN DE AÑO</p>
          </div>
        </div>

        {/* Producto */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="p-8">

            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-6 h-6 text-pink-600" />
              <h2 className="text-3xl font-bold text-gray-800">Internet portátil al instante</h2>
            </div>

            <p className="text-xl text-red-600 font-bold mb-6">
              Llévate PocketNet Pro con servicio incluido por meses. ¡Paga una vez y úsalo sin complicaciones!
            </p>

            {/* Características */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">

              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Funciona donde lo necesites</h3>
                  <p className="text-gray-600">Ideal para hogar, trabajo, viajes o emergencias.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Hasta 150 Mbps</h3>
                  <p className="text-gray-600">Velocidad más que suficiente para streaming, trabajo y juegos.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Conexión segura</h3>
                  <p className="text-gray-600">Privado, protegido y libre de riesgos.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Conecta hasta 10 dispositivos</h3>
                  <p className="text-gray-600">Toda la familia conectada sin bajar rendimiento.</p>
                </div>
              </div>

            </div>

            {/* Info */}
            <div className="bg-red-50 rounded-2xl p-6 mb-8">
              <h3 className="text-2xl font-bold text-red-700 mb-4">
                Sin contratos. Sin SIM. Sin mensualidades inesperadas.
              </h3>
              <p className="text-gray-700">
                Olvídate de papeleos: solo enciende y úsalo.
              </p>
            </div>

            {/* Oferta */}
            <div className="bg-gradient-to-r from-pink-100 to-red-100 rounded-2xl p-6 mb-8">
              <h3 className="text-2xl font-bold text-red-700 mb-4">
                Solo hoy — Llévatelo por $399 MXN
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                Envío gratis + soporte 24/7 + garantía extendida
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>⭐ Más de 1,000 unidades vendidas</span>
                <span>❤️ 900+ clientes felices</span>
              </div>
            </div>

            {/* Botón */}
            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-gradient-to-r from-pink-600 to-red-600 text-white text-2xl font-bold py-6 rounded-full hover:from-pink-700 hover:to-red-700 transition transform hover:scale-105 shadow-lg"
            >
              🛒 Comprar ahora
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              🔒 Pago seguro con Stripe | 🚚 Envío gratis a todo México
            </p>

          </div>
        </div>

        {/* Bonos */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">🎁 Bonos especiales</h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-xl">
              <span className="text-3xl">🔥</span>
              <span className="text-lg">50% de descuento hoy</span>
            </div>

            <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-xl">
              <span className="text-3xl">🔥</span>
              <span className="text-lg">Primeros meses incluidos</span>
            </div>

            <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-xl">
              <span className="text-3xl">🔥</span>
              <span className="text-lg">Garantía de 6 meses</span>
            </div>

            <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-xl">
              <span className="text-3xl">🔥</span>
              <span className="text-lg">Soporte técnico 24/7</span>
            </div>

          </div>
        </div>

      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto">

            <div className="p-6">

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Finalizar compra</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {success ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Compra realizada!</h3>
                  <p className="text-gray-600">Te enviamos un correo con los detalles de tu pedido.</p>
                </div>
              ) : (
                <div className="space-y-4">

                  {/* FORMULARIO SIN CAMBIOS */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                      placeholder="Juan Pérez"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                      placeholder="55 1234 5678"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección completa *
                    </label>
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                      placeholder="Calle, número, colonia"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ciudad *
                      </label>
                      <input
                        type="text"
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Código Postal *
                      </label>
                      <input
                        type="text"
                        name="codigoPostal"
                        value={formData.codigoPostal}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cantidad
                    </label>
                    <select
                      name="cantidad"
                      value={formData.cantidad}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                    >
                      <option value="1">1 pieza - $399 MXN</option>
                      <option value="2">2 piezas - $798 MXN</option>
                      <option value="3">3 piezas - $1,197 MXN</option>
                    </select>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-bold">${precio * formData.cantidad} MXN</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Envío:</span>
                      <span className="font-bold text-green-600">GRATIS</span>
                    </div>

                    <div className="border-t pt-2 flex justify-between text-lg">
                      <span className="font-bold">Total:</span>
                      <span className="font-bold text-pink-600">${precio * formData.cantidad} MXN</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={paymentProcessing}
                    className="w-full bg-gradient-to-r from-pink-600 to-red-600 text-white text-lg font-bold py-4 rounded-xl hover:from-pink-700 hover:to-red-700 transition disabled:opacity-50"
                  >
                    {paymentProcessing ? 'Redirigiendo a Stripe...' : '💳 Pagar con Stripe'}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    🔒 Pago protegido con encriptación avanzada.
                  </p>

                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
