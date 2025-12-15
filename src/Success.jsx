import React from 'react';

export default function Success() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0fdf4',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '500px'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#10b981',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          fontSize: '40px',
          color: 'white'
        }}>
          ✓
        </div>
        <h1 style={{ color: '#065f46', marginBottom: '10px' }}>
          ¡Pago Completado!
        </h1>
        <p style={{ color: '#4b5563', marginBottom: '30px' }}>
          Tu compra ha sido procesada exitosamente.
        </p>
        <a 
          href="/"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#db2777',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold'
          }}
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
