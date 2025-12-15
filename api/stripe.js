const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// ✅ PRECIO FIJO EN EL BACKEND - NO SE RECIBE DEL FRONTEND
const PRECIO_UNITARIO_MXN = 1; // $1 MXN (para pruebas) - Cambia a 399 para producción

export default async function handler(req, res) {
  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { 
      nombre, 
      telefono, 
      email, 
      direccion, 
      ciudad, 
      codigoPostal, 
      cantidad 
      // ⚠️ NO recibimos "precio" del frontend - es inseguro
    } = req.body;

    // Validar datos requeridos
    if (!nombre || !email) {
      return res.status(400).json({ error: 'Nombre y email son requeridos' });
    }

    // Validar cantidad
    const cantidadInt = parseInt(cantidad) || 1;
    if (cantidadInt < 1 || cantidadInt > 10) {
      return res.status(400).json({ error: 'Cantidad inválida' });
    }

    // Crear sesión de pago en Stripe con precio FIJO
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'mxn',
            product_data: {
              name: 'PocketNet Pro',
              description: 'Internet portátil satelital - Pago único',
            },
            // ✅ USA EL PRECIO FIJO DEFINIDO ARRIBA
            unit_amount: PRECIO_UNITARIO_MXN * 100, // Stripe usa centavos
          },
          quantity: cantidadInt,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/`,
      customer_email: email,
      metadata: {
        nombre,
        telefono: telefono || '',
        email,
        direccion: direccion || '',
        ciudad: ciudad || '',
        codigoPostal: codigoPostal || '',
        cantidad: cantidadInt.toString(),
        precio_unitario: PRECIO_UNITARIO_MXN.toString(), // Para referencia
        total: (PRECIO_UNITARIO_MXN * cantidadInt).toString()
      }
    });

    // Éxito - devolver URL de Stripe
    res.json({ 
      success: true, 
      sessionUrl: session.url,
      sessionId: session.id 
    });

  } catch (error) {
    console.error('Error en Stripe:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al procesar el pago. Por favor intenta nuevamente.' 
    });
  }
}
