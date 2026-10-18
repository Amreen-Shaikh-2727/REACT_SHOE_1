import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";


const products = [
  {
    id: 1,
    name: "White Casual Sneaker",
    price: 70,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "MACTREE Men's Mid Top Ankle Boots",
    price: 90,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Campus Men's OG-03 Sneakers",
    price: 75,
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Campus Men's Sneakers",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    name: "ASIAN Men's Sports Shoes",
    price: 68,
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=400&q=80",
  },
];

function Home() {
  const {
    cart,
    addToCart,
    changeQuantity,
    removeFromCart,
    total,
  } = useCart();

  const navigate = useNavigate();

  return (
    <div className="shop-page">
      <nav className="navbar">
        <div className="logo">♞</div>

        <a href="#home">Home</a>
        <a href="#categories">Categories</a>
        <a href="#about">About Us</a>
      </nav>

      <main className="shop-layout" id="home">
        <section className="product-section" id="categories">
          <h2>Our Shoes</h2>

          <div className="product-grid">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />

                <div className="product-info">
                  <h3>{product.name}</h3>

                  <p>${product.price}</p>

                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="cart-panel">
          <h2>Cart</h2>

          {cart.length === 0 ? (
            <p className="empty-cart">
              Your cart is empty.
            </p>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() =>
                        changeQuantity(item.id, -1)
                      }
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        changeQuantity(item.id, 1)
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}

          <h3 className="cart-total">
            Total: ${total.toFixed(2)}
          </h3>

          <button
            type="button"
            className="payment-button"
            onClick={() => navigate("/payment")}
            disabled={cart.length === 0}
          >
            Proceed to Payment
          </button>
        </aside>
      </main>

      <footer id="about">
        <p>Thank you for shopping with us!</p>
      </footer>
    </div>
  );
}

export default Home;
