
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";

function Payment() {
  const {
    cart,
    total,
    changeQuantity,
    removeFromCart,
  } = useCart();

  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [message, setMessage] = useState("");

  function handlePayment(event) {
    event.preventDefault();
    setMessage("");

    if (cart.length === 0) {
      setMessage("Your cart is empty. Add some shoes first.");
      return;
    }

    if (paymentMethod === "card") {
      const digits = cardNumber.replace(/\D/g, "");

      if (
        digits.length < 12 ||
        digits.length > 19 ||
        !/^\d{2}\/\d{2}$/.test(expiryDate) ||
        !/^\d{3,4}$/.test(cvv)
      ) {
        setMessage("Please check your card details.");
        return;
      }
    }

    if (paymentMethod === "cod") {
      setMessage(
        "Order placed successfully with Cash on Delivery!"
      );
    } else {
      setMessage(
        "Demo payment successful! No real payment was processed."
      );
    }
  }

  return (
    <div className="payment-page">
      <nav className="navbar">
        <div className="logo">♞</div>

        <a href="/">Home</a>
        <a href="/#categories">Categories</a>
        <a href="/#about">About Us</a>
      </nav>

      <main className="payment-layout">
        <section className="payment-form-section">
          <h2>Payment Page</h2>

          <form onSubmit={handlePayment}>
            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => {
                    setPaymentMethod("cod");
                    setMessage("");
                  }}
                />
                Cash on Delivery
              </label>

              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => {
                    setPaymentMethod("card");
                    setMessage("");
                  }}
                />
                Credit Card
              </label>
            </div>

            {paymentMethod === "card" && (
              <div className="card-form">
                <label htmlFor="cardNumber">
                  Enter your card number:
                </label>

                <input
                  id="cardNumber"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(event) =>
                    setCardNumber(event.target.value)
                  }
                  required
                />

                <label htmlFor="expiryDate">
                  Enter your card's expiry date:
                </label>

                <input
                  id="expiryDate"
                  type="text"
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(event) =>
                    setExpiryDate(event.target.value)
                  }
                  required
                />

                <label htmlFor="cvv">
                  Enter your CVV number:
                </label>

                <input
                  id="cvv"
                  type="password"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(event) =>
                    setCvv(event.target.value)
                  }
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="confirm-button"
              disabled={cart.length === 0}
            >
              Confirm Payment
            </button>

            {message && (
              <p className="payment-message" role="status">
                {message}
              </p>
            )}
          </form>
        </section>

        <aside className="payment-cart">
          <h2>Cart</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div className="payment-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="payment-item-details">
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() =>
                        changeQuantity(item.id, -1)
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        changeQuantity(item.id, 1)
                      }
                    >
                      +
                    </button>

                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          <h3 className="cart-total">
            Total: ${total.toFixed(2)}
          </h3>

          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/")}
          >
            Go back to Shopping
          </button>
        </aside>
      </main>
    </div>
  );
}

export default Payment;
