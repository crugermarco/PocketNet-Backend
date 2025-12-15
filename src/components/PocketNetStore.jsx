import React from 'react';

function PocketNetStore() {
  console.log('🎯 React está ejecutando este componente');
  
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#4f46e5',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
        🎉 ¡REACT FUNCIONA!
      </h1>
      
      <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>
        Si ves esta pantalla morada, React está renderizando correctamente.
      </p>
      
      <div style={{
        backgroundColor: 'white',
        color: '#4f46e5',
        padding: '30px',
        borderRadius: '15px',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h2>Debug Info</h2>
        <p><strong>URL:</strong> {window.location.href}</p>
        <p><strong>React Version:</strong> {React.version}</p>
        <p><strong>Timestamp:</strong> {new Date().toLocaleTimeString()}</p>
        
        <button
          onClick={() => alert('¡Botón funciona!')}
          style={{
            marginTop: '20px',
            padding: '12px 24px',
            backgroundColor: '#4f46e5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Probar JavaScript
        </button>
      </div>
      
      <div style={{
        marginTop: '40px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '600px'
      }}>
        <h3>Instrucciones:</h3>
        <ol style={{ textAlign: 'left', marginLeft: '20px' }}>
          <li>Presiona <strong>F12</strong> para abrir DevTools</li>
          <li>Ve a la pestaña <strong>Console</strong></li>
          <li>Deberías ver: "🎯 React está ejecutando este componente"</li>
          <li>Si hay errores en rojo, cópialos aquí</li>
        </ol>
      </div>
    </div>
  );
}

export default PocketNetStore;
