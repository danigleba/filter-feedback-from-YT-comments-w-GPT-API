export default async function handler(req, res) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_TEST)
  const numberOfComments = req.query.numberOfComments
  const price = numberOfComments >= 500 ? (parseFloat(numberOfComments).toFixed(2) / 1000 * 100) : 100 

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ["card"],
      amount: parseInt(price),
      currency: "eur", 
    })
    res.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    res.status(500).json({ error: "Failed to create Payment Intent" })
  }
}