const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Precio FIJO en backend - $1 MXN para pruebas
const PRECIO_UNITARIO_MXN = 1;

export default async function handler(req, res) {
  console.log('🔄 API Stripe llamada');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { cantidad, nombre, email, telefono } = req.body;
    
    console.log('📦 Datos recibidos:', { cantidad, nombre, email });

    // Validaciones básicas
    if (!nombre || !email) {
      return res.status(400).json({ error: 'Nombre y email son requeridos' });
    }

    const cantidadInt = parseInt(cantidad) || 1;
    
    console.log('💰 Creando sesión de pago:', {
      precio: PRECIO_UNITARIO_MXN,
      cantidad: cantidadInt,
      total: PRECIO_UNITARIO_MXN * cantidadInt
    });

    // Crear sesión de pago en Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'mxn',
          product_data: {
            name: 'PocketNet Pro',
            description: 'Internet portátil satelital - Pago único',
          },
          unit_amount: PRECIO_UNITARIO_MXN * 100, // Convertir a centavos
        },
        quantity: cantidadInt,
      }],
      mode: 'payment',
      success_url: `${req.headers.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/?canceled=true`,
      customer_email: email,
      metadata: {
        nombre,
        email,
        telefono: telefono || '',
        cantidad: cantidadInt.toString()
      }
    });

    console.log('✅ Sesión creada:', session.id);
    
    res.json({ 
      success: true, 
      sessionUrl: session.url,
      sessionId: session.id 
    });

  } catch (error) {
    console.error('❌ Error en Stripe:', error.message);
    
    res.status(500).json({ 
      success: false, 
      error: 'Error al procesar el pago. Intenta nuevamente.' 
    });
  }
}
