import Razorpay from "razorpay"

const razorpayConfig = () => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });
  return instance;
}

export default razorpayConfig;