import Razorpay from "razorpay";
import fs from "fs";
import path from "path";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

const razorpay = new Razorpay({
    key_id: "rzp_live_sCxaf0020ub9NP",
    key_secret: "uaWaEjK9rJEkcWiMYXpuq",
});

const ordersFilePath = path.resolve(process.cwd(), "orders.json");

const readData = () => {
  if (fs.existsSync(ordersFilePath)) {
    const data = fs.readFileSync(ordersFilePath);
    return JSON.parse(data);
  }
  return [];
};

const writeData = (data) => {
  fs.writeFileSync(ordersFilePath, JSON.stringify(data, null, 2));
};

export async function POST(req, res) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const secret = razorpay.key_secret;
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  try {
    const isValidSignature = validateWebhookSignature(body, razorpay_signature, secret);
    if (isValidSignature) {
      const orders = readData();
      const order = orders.find(o => o.order_id === razorpay_order_id);
      if (order) {
        order.status = "paid";
        order.payment_id = razorpay_payment_id;
        writeData(orders);
      }
      res.status(200).json({ status: "ok" });
      console.log("Payment verification successful");
    } else {
      res.status(400).json({ status: "verification_failed" });
      console.log("Payment verification failed");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Error verifying payment" });
  }
}

export async function GET(req, res) {
  res.status(405).json({ message: "Method Not Allowed" });
}
