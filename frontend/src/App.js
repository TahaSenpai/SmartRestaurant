import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import "./App.css";
import Commandes from "./Commandes";
import Reservation from "./Reservation";
import Review from "./Review";
import Login from "./Login";
import Register from "./Register";
import Suggest from "./Suggest";

function App() {
  const [plats, setPlats] = useState([]);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("menu");
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    if (message) setTimeout(() => setMessage(""), 3000);
  }, [message]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/reviews/")
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => setReviews(Array.isArray(data) ? data : []))
      .catch(() => setMessage("Erreur serveur"));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/plats/")
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => setPlats(data))
      .catch(() => setMessage("Erreur serveur"));
  }, []);

  const addToCart = (plat) => {
    const exist = cart.find(i => i.id === plat.id);
    if (exist) {
      setCart(cart.map(i => i.id === plat.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { ...plat, quantity: 1 }]);
    }
  };

  const total = cart.reduce((s, i) => s + i.prix * i.quantity, 0);

  const handleOrder = () => {
    if (!user) return setPage("login");
    if (!cart.length) return setMessage("Panier vide !");

    fetch("http://127.0.0.1:8000/api/commandes/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart.map(i => ({ plat: i.id, quantite: i.quantity }))
      })
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        setMessage("Commande envoyée !");
        setCart([]);
      })
      .catch(() => setMessage("Erreur serveur"));
  };

  return (
    <div className="app-bg">
      <div className="app-content">
        {/* NAVBAR */}
        <nav className="navbar navbar-dark bg-dark shadow">
          <div className="container">
            <span className="navbar-brand fw-bold">🍽 SmartRestaurant</span>

            <div className="d-flex gap-2">
              <button className="btn btn-outline-light" onClick={() => setPage("menu")}>Menu</button>
              <button className="btn btn-outline-light" onClick={() => setPage("suggest")}>Suggestion</button>

              <button className="btn btn-outline-light" onClick={() => !user ? setPage("login") : setPage("commandes")}>
                Commandes
              </button>

              <button className="btn btn-outline-light" onClick={() => !user ? setPage("login") : setPage("reservation")}>
                Réservation
              </button>

              <button className="btn btn-outline-light" onClick={() => !user ? setPage("login") : setPage("review")}>
                Avis
              </button>

              {!user ? (
                <>
                  <button className="btn btn-success" onClick={() => setPage("login")}>Login</button>
                  <button className="btn btn-warning" onClick={() => setPage("register")}>Register</button>
                </>
              ) : (
                <button className="btn btn-danger" onClick={() => {
                  setUser(null);
                  localStorage.removeItem("user");
                  setCart([]);
                  setPage("login");
                }}>Logout</button>
              )}
            </div>
          </div>
        </nav>

        <div className="container mt-4">

          {message && <div className="alert alert-info">{message}</div>}

          {user && (
            <p className="text-end text-muted">
              👤 {user.username} ({user.role})
            </p>
          )}

          {/* SUGGEST */}
          {page === "suggest" && (
            <>
              <h2 className="mb-4">Suggestion intelligente des plats</h2>
              <Suggest />
            </>
          )}

          {/* MENU */}
          {page === "menu" && (
            <>
              <h2 className="mb-4">Menu</h2>

              <div className="row">
                {plats.map(p => (
                  <div className="col-md-4 mb-4" key={p.id}>
                    <div className="card shadow-sm h-100 border-0">

                      <img
                        src={p.image
                          ? (p.image.startsWith("http") ? p.image : `http://127.0.0.1:8000${p.image}`)
                          : "https://via.placeholder.com/150"}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                        alt=""
                      />

                      <div className="card-body d-flex flex-column">
                        <h5>{p.nom}</h5>
                        <p className="text-muted small">{p.ingredients.map(i => i.nom).join(", ")}</p>
                        <h6 className="text-success">{p.prix} DH</h6>

                        <button className="btn btn-primary mt-auto" onClick={() => addToCart(p)}>
                          Commander
                        </button>

                        <div className="mt-2 small">
                          {reviews.filter(r => r.plat === p.id).map(r => (
                            <div key={r.id}>⭐ {r.note} - {r.commentaire}</div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

              {/* PANIER */}
              <div className="card mt-4 shadow">
                <div className="card-body">
                  <h4>Panier</h4>

                  {!cart.length ? <p>Vide</p> : (
                    <ul className="list-group">
                      {cart.map((i, idx) => (
                        <li key={idx} className="list-group-item d-flex justify-content-between">
                          {i.nom} x{i.quantity}
                          <span>{i.prix} DH</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <h5 className="mt-3">Total: {total} DH</h5>

                  <button className="btn btn-success w-100 mt-2" onClick={handleOrder}>
                    {user ? "Valider commande" : "Login pour commander"}
                  </button>
                </div>
              </div>
            </>
          )}

          {page === "commandes" && (user ? <Commandes /> : <button onClick={() => setPage("login")}>Login</button>)}
          {page === "reservation" && <Reservation user={user} setPage={setPage} />}
          {page === "review" && <Review user={user} setPage={setPage} />}

          {page === "login" && (
            <Login
              setUser={(data) => {
                if (data.role === "admin") {
                  window.location.href = "http://127.0.0.1:8000/admin/";
                } else {
                  setUser(data);
                  localStorage.setItem("user", JSON.stringify(data));
                  setPage("menu");
                }
              }}
              setPage={setPage}
            />
          )}

          {page === "register" && (
            <Register
              setUser={(data) => {
                setUser(data);
                setPage("menu");
              }}
              setPage={setPage}
            />
          )}

        </div>
      </div>
    </div>
  );
}

export default App;