import React, { useState } from "react";

function Reservation({ user, setPage }) {
    const [form, setForm] = useState({
        date: "",
        heure: "",
        nombre_personnes: ""
    });

    const [message, setMessage] = useState("");

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

        fetch("http://127.0.0.1:8000/api/reservations/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Erreur");
                }
                return res.json();
            })
            .then(() => {
                setMessage("Réservation envoyée !");
                setForm({
                    date: "",
                    heure: "",
                    nombre_personnes: ""
                });
            })
            .catch(() => {
                setMessage("Erreur lors de la réservation");
            });
    };

    return (
        <div className="container mt-4">

            <div className="row justify-content-center">
                <div className="col-md-6">

                    <div className="card shadow border-0">
                        <div className="card-body">

                            <h3 className="fw-bold mb-4 text-center">
                                📅 Réserver une table
                            </h3>

                            {message && (
                                <div className="alert alert-info">
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        className="form-control"
                                        value={form.date}
                                        min={new Date().toISOString().split("T")[0]}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Heure</label>
                                    <input
                                        type="time"
                                        name="heure"
                                        className="form-control"
                                        value={form.heure}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Nombre de personnes</label>
                                    <input
                                        type="number"
                                        name="nombre_personnes"
                                        className="form-control"
                                        placeholder="Ex: 4"
                                        value={form.nombre_personnes}
                                        onChange={handleChange}
                                        min="1"
                                        max="40"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                >
                                    Réserver
                                </button>

                            </form>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Reservation;