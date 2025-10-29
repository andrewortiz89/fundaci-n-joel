import express from "express";
import cors from "cors";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Al inicio de tu server.js, después de definir app
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running' });
});

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const { amount, currency, description } = req.body;

  if (!amount || amount < 100) {
    return res
      .status(400)
      .json({ error: "Monto mínimo es 1 USD o su equivalente." });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: "Donación a Fundación Joel",
              description,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/gracias",
      cancel_url: "http://localhost:3000/donaciones?cancel=true",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Algo salió mal en el servidor" });
  }
});


app.listen(4242, '0.0.0.0', () => {
  console.log("Servidor Stripe listo en http://localhost:4242")
});