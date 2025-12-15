import React, { useState } from 'react';

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
        headers: { 'Content-Type': 'application/json' },
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

  // ESTILOS INLINE
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fdf2f8 0%, #fef2f2 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    header: {
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      padding: '16px 0'
    },
    headerInner: {
      maxWidth: '72rem',
      margin: '0 auto',
      padding: '0 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#1f2937'
    },
    buyButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#db2777',
      color: 'white',
      border: 'none',
      borderRadius: '9999px',
      cursor: 'pointer',
      fontSize: '1rem'
    },
    main: {
      maxWidth: '72rem',
      margin: '0 auto',
      padding: '2rem 1rem'
    },
    banner: {
      background: 'linear-gradient(to right, #db2777, #dc2626)',
      borderRadius: '1.5rem',
      padding: '2rem',
      color: 'white',
      marginBottom: '2rem',
      position: 'relative',
      overflow: 'hidden'
    },
    discountBadge: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      backgroundColor: '#fbbf24',
      color: '#b91c1c',
      padding: '0.5rem 1.5rem',
      borderRadius: '9999px',
      fontWeight: 'bold',
      fontSize: '1.25rem',
      transform: 'rotate(12deg)'
    },
    bannerTitle: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '1rem'
    },
    price: {
      fontSize: '4rem',
      fontWeight: 'bold',
      margin: '1rem 0'
    },
    originalPrice: {
      fontSize: '1.5rem',
      marginBottom: '1rem'
    },
    strike: {
      textDecoration: 'line-through'
    },
    section: {
      backgroundColor: 'white',
      borderRadius: '1.5rem',
      padding: '2rem',
      marginBottom: '2rem',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
    },
    featureGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1rem',
      margin: '2rem 0'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem'
    },
    ctaButton: {
      width: '100%',
      background: 'linear-gradient(to right, #db2777, #dc2626)',
      color: 'white',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      padding: '1.5rem',
      borderRadius: '9999px',
      border: 'none',
      cursor: 'pointer',
      marginBottom: '1rem'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: 50
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '1.5rem',
      maxWidth: '28rem',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto'
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.75rem',
      fontSize: '1rem'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.25rem'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>
            <span style={{ fontSize: '2rem' }}>📶</span>
            <span>PocketNet Pro</span>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            style={styles.buyButton}
          >
            <span style={{ fontSize: '1.25rem' }}>🛒</span>
            <span>Comprar</span>
          </button>
        </div>
      </header>

      <main style={styles.main}>
        {/* Banner */}
        <div style={styles.banner}>
          <div style={styles.discountBadge}>
            50% OFF
          </div>
          
          <h1 style={styles.price}>${precio} MXN</h1>
          <p style={styles.originalPrice}>
            Precio original: <span style={styles.strike}>${precioOriginal} MXN</span>
          </p>
          
          <div style={{ marginTop: '1.5rem' }}>
            <p style={{ fontSize: '1.25rem' }}>🌐 La forma más fácil de tener internet portátil donde estés</p>
            <p style={{ fontSize: '1.125rem', opacity: 0.9 }}>PROMOCIÓN ESPECIAL DE FIN DE AÑO</p>
          </div>
        </div>

        {/* Producto */}
        <div style={styles.section}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🌎</span>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' }}>
              Internet portátil al instante
            </h2>
          </div>

          <p style={{ fontSize: '1.25rem', color: '#dc2626', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Llévate PocketNet Pro con servicio incluido por meses. ¡Paga una vez y úsalo sin complicaciones!
          </p>

          {/* Características */}
          <div style={styles.featureGrid}>
            {[
              { icon: '✅', title: 'Funciona donde lo necesites', desc: 'Ideal para hogar, trabajo, viajes o emergencias.' },
              { icon: '⚡', title: 'Hasta 150 Mbps', desc: 'Velocidad más que suficiente para streaming, trabajo y juegos.' },
              { icon: '🛡️', title: 'Conexión segura', desc: 'Privado, protegido y libre de riesgos.' },
              { icon: '👨‍👩‍👧‍👦', title: 'Conecta hasta 10 dispositivos', desc: 'Toda la familia conectada sin bajar rendimiento.' }
            ].map((feature, index) => (
              <div key={index} style={styles.featureItem}>
                <span style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>{feature.icon}</span>
                <div>
                  <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '0.25rem' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: '#6b7280' }}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div style={{ backgroundColor: '#fef2f2', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '1rem' }}>
              Sin contratos. Sin SIM. Sin mensualidades inesperadas.
            </h3>
            <p style={{ color: '#6b7280' }}>
              Olvídate de papeleos: solo enciende y úsalo.
            </p>
          </div>

          {/* Oferta Box */}
          <div style={{ 
            background: 'linear-gradient(to right, #fdf2f8, #fef2f2)', 
            borderRadius: '1rem', 
            padding: '1.5rem', 
            marginBottom: '1.5rem' 
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '1rem' }}>
              Solo hoy — Llévatelo por ${precio} MXN
            </h3>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '1rem' }}>
              Envío gratis + soporte 24/7 + garantía extendida
            </p>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
              <span>⭐ Más de 1,000 unidades vendidas</span>
              <span>❤️ 900+ clientes felices</span>
            </div>
          </div>

          {/* Botón Principal */}
          <button
            onClick={() => setShowModal(true)}
            style={styles.ctaButton}
          >
            🛒 Comprar ahora
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6b7280', marginTop: '1rem' }}>
            🔒 Pago seguro con Stripe | 🚚 Envío gratis a todo México
          </p>
        </div>

        {/* Bonos */}
        <div style={styles.section}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
            🎁 Bonos especiales
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {[
              '50% de descuento hoy',
              'Primeros meses incluidos', 
              'Garantía de 6 meses',
              'Soporte técnico 24/7'
            ].map((bono, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                padding: '1rem', 
                backgroundColor: '#fdf2f8',
                borderRadius: '0.75rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>🔥</span>
                <span style={{ fontSize: '1rem' }}>{bono}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>Finalizar compra</h2>
                <button
                  onClick={() => setShowModal(false)}
                  style={{ padding: '0.5rem', borderRadius: '9999px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.5rem' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={styles.label}>Nombre completo *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label style={styles.label}>Teléfono *</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="55 1234 5678"
                  />
                </div>

                <div>
                  <label style={styles.label}>Correo electrónico *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="correo@ejemplo.com"
                  />
                </div>

                <div>
                  <label style={styles.label}>Dirección completa *</label>
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Calle, número, colonia"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={styles.label}>Ciudad *</label>
                    <input
                      type="text"
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  </div>
                  <div>
                    <label style={styles.label}>Código Postal *</label>
                    <input
                      type="text"
                      name="codigoPostal"
                      value={formData.codigoPostal}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  </div>
                </div>

                <div>
                  <label style={styles.label}>Cantidad</label>
                  <select
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleInputChange}
                    style={styles.input}
                  >
                    <option value="1">1 pieza - ${precio} MXN</option>
                    <option value="2">2 piezas - ${precio * 2} MXN</option>
                    <option value="3">3 piezas - ${precio * 3} MXN</option>
                  </select>
                </div>

                <div style={{ backgroundColor: '#f9fafb', borderRadius: '0.75rem', padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Subtotal:</span>
                    <span style={{ fontWeight: 'bold' }}>${precio * formData.cantidad} MXN</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Envío:</span>
                    <span style={{ fontWeight: 'bold', color: '#10b981' }}>GRATIS</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>Total:</span>
                    <span style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#db2777' }}>
                      ${precio * formData.cantidad} MXN
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={paymentProcessing}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(to right, #db2777, #dc2626)',
                    color: 'white',
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    cursor: paymentProcessing ? 'not-allowed' : 'pointer',
                    opacity: paymentProcessing ? 0.5 : 1
                  }}
                >
                  {paymentProcessing ? 'Redirigiendo a Stripe...' : '💳 Pagar con Stripe'}
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#6b7280' }}>
                  🔒 Pago protegido con encriptación avanzada.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
