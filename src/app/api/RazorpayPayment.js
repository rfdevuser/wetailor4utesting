
const Razorpay = require("razorpay");
const shortid = require("shortid");


export default async function handler(req, res) {
  if (req.method === "GET") {
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: "rzp_live_sCxaf0020ub9NP",
      key_secret: "uaWaEjK9rJEkcWiMYXpuq",
    });


    try {
      const response = await razorpay.payments.all();
      res.status(200).json({
        id: response.id,
       
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    // Handle any other HTTP method
  }

 
}

