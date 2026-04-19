import React, { useState, useEffect } from "react";

function Review({ user, setPage }) {
  const [plats, setPlats] = useState([]);
  const [form, setForm] = useState({
    plat: "",
    note: "",
    commentaire: ""
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/plats/")
      .then(res => res.json())
      .then(data => setPlats(data));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      setPage("login");
      return;
    }

    fetch("http://127.0.0.1:8000/api/reviews/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        setMessage("Avis ajouté avec succès !");
        setForm({
          plat: "",
          note: "",
          commentaire: ""
        });
      })
      .catch(() => {
        setMessage("Erreur lors de l'ajout de l'avis");
      });
  };

  return (
    <div className="container mt-4">

      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow border-0">
            <div className="card-body">

              <h3 className="fw-bold mb-4 text-center">
                ⭐ Laisser un avis
              </h3>

              {message && (
                <div className="alert alert-info">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* PLAT */}
                <div className="mb-3">
                  <label className="form-label">Choisir un plat</label>
                  <select
                    name="plat"
                    className="form-select"
                    value={form.plat}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Sélectionner --</option>
                    {plats.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.nom}
                      </option>
                    ))}
                  </select>
                </div>

                {/* NOTE */}
                <div className="mb-3">
                  <label className="form-label">Note (1 à 5)</label>
                  <input
                    type="number"
                    name="note"
                    className="form-control"
                    min="1"
                    max="5"
                    value={form.note}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* COMMENTAIRE */}
                <div className="mb-3">
                  <label className="form-label">Commentaire</label>
                  <textarea
                    name="commentaire"
                    className="form-control"
                    rows="3"
                    placeholder="Votre avis..."
                    value={form.commentaire}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-warning w-100"
                >
                  Envoyer
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Review;