import React, { useState } from "react";

function Register({ setUser, setPage }) {
    const [form, setForm] = useState({
        username: "",
        password: ""
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

        fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setMessage(data.error);
                } else {
                    setMessage("Compte créé avec succès !");
                    setUser(data);
                }
            });
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">
                <div className="col-md-5">

                    <div className="card shadow border-0">
                        <div className="card-body">

                            <h3 className="text-center fw-bold mb-4">
                                📝 Inscription
                            </h3>

                            {message && (
                                <div className="alert alert-info">
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        name="username"
                                        className="form-control"
                                        placeholder="Choisir un username"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        placeholder="Choisir un mot de passe"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                >
                                    S'inscrire
                                </button>

                            </form>

                            <p className="mt-3 text-center">
                                Déjà un compte ?{" "}
                                <span
                                    className="text-primary"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setPage("login")}
                                >
                                    Se connecter
                                </span>
                            </p>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Register;