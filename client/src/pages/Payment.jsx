import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#374151",
      "::placeholder": { color: "#9CA3AF" },
      fontFamily: "sans-serif",
    },
    invalid: { color: "#E53E3E" },
  },
};

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const { bookingId, totalAmount } = state || {};
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  if (!bookingId || !totalAmount) {
    return <p className="p-8 text-center">No booking to pay for.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError("");

    try {
      // 1) Get clientSecret from backend
      const { data } = await axios.post(
        "/api/payments/create-payment-intent",
        { bookingId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      // 2) Confirm card payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: { card: elements.getElement(CardElement) },
        }
      );

      if (stripeError) throw stripeError;
      if (paymentIntent.status === "succeeded") {
        // 3) Mark booking as paid
        await axios.patch(
          `/api/bookings/${bookingId}/pay`,
          {},
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Payment failed");
      setProcessing(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Payment</h2>
          <p className="text-center mb-4">
            Amount: <span className="font-semibold">${totalAmount.toFixed(2)}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border border-gray-300 rounded-lg p-4">
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={!stripe || processing}
              className={`w-full py-2 rounded-lg text-white transition ${
                processing ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {processing ? "Processing…" : `Pay $${totalAmount.toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
