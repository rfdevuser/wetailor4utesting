import Razorpay from "razorpay";
import fs from "fs";
import path from "path";

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

export async function POST(req) {
  try {
    const { amount, currency, receipt, notes } = await req.json();

    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency,
      receipt,
      notes,
    };

    const order = await razorpay.orders.create(options);
    const orders = readData();
    orders.push({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: "created",
    });
    writeData(orders);

    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error creating order" }), { status: 500 });
  }
}

export async function GET(req) {
  // Handle GET requests if needed
  return new Response(JSON.stringify({ message: "GET method not supported" }), { status: 405 });
}
