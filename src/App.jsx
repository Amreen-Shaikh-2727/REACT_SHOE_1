
import { useState, useMemo } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "White Casual Sneaker",
    price: 70,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "MACTREE Men's Mid Top Ankle Boots",
    price: 90,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Campus Men's OG-03 Sneakers",
    price: 75,
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    name: "Campus Men's Sneakers",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    name: "ASIAN Men's Sports Shoes",
    price: 68,
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=500&q=80",
  },
];

function App() {
  const [cart, setCart] = useState([
    // { ...products[1], quantity: 1 },
    // { ...products[2], quantity: 1 },
    // { ...products[3], quantity: 4 },
    // { ...products[4], quantity: 3 },
  ]);

  function addToCart(product) {
    setCart((oldCart) => {
      const found = oldCart.find(
        (item) => item.id === product.id
      );

      if (found) {
        return oldCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...oldCart, { ...product, quantity: 1 }];
    });
  }

  function changeQuantity(id, amount) {
    setCart((oldCart) =>
      oldCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  const total = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cart]);

  return (
    <div className="app">

      <nav className="navbar">
        <div className="logo">♞</div>
        <a href="#home">Home</a>
        <a href="#categories">Categories</a>
        <a href="#about">About Us</a>
      </nav>

      <main className="shop-layout" id="home">
        <section className="product-grid" id="categories">
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

                <button onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </section>

        <aside className="cart-panel">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-details">
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                </div>

                <div className="quantity-controls">
                  <button
                    onClick={() => changeQuantity(item.id, -1)}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => changeQuantity(item.id, 1)}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}

          <div className="cart-total">
            Total: ${total.toFixed(2)}
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
