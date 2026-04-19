import React, { useState } from "react";

function Login({ setUser, setPage }) {
    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://127.0.0.1:8000/api/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError("Identifiants incorrects");
                } else {
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
                                🔐 Connexion
                            </h3>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        name="username"
                                        className="form-control"
                                        placeholder="Entrer votre username"
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
                                        placeholder="Entrer votre mot de passe"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Se connecter
                                </button>

                            </form>

                            <p className="mt-3 text-center">
                                Pas de compte ?{" "}
                                <span
                                    className="text-primary"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setPage("register")}
                                >
                                    Créer un compte
                                </span>
                            </p>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Login;