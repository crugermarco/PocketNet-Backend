const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
      cantidad, 
      precio 
    } = req.body;

    // Validar datos requeridos
    if (!nombre || !email) {
      return res.status(400).json({ error: 'Nombre y email son requeridos' });
    }

    // Crear sesión de pago en Stripe
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
            unit_amount: precio * 100, // Stripe usa centavos
          },
          quantity: parseInt(cantidad) || 1,
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
        cantidad: cantidad || '1'
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
      error: error.message 
    });
  }
}
