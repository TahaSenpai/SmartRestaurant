import React, { useEffect, useState } from "react";

function Commandes() {
    const [commandes, setCommandes] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/commandes/")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCommandes(data);
                } else {
                    setCommandes([]);
                }
            });
    }, []);

    return (
        <div className="container mt-4">

            <h2 className="mb-4 fw-bold">📦 Mes commandes</h2>

            {commandes.length === 0 ? (
                <div className="alert alert-info">
                    Aucune commande trouvée
                </div>
            ) : (
                commandes.map(cmd => (
                    <div key={cmd.id} className="card shadow mb-4 border-0">

                        <div className="card-header bg-dark text-white d-flex justify-content-between">
                            <span>Commande #{cmd.id}</span>
                            <span>{new Date(cmd.date).toLocaleString()}</span>
                        </div>

                        <div className="card-body">

                            <ul className="list-group">
                                {cmd.items.map((item, index) => (
                                    <li
                                        key={index}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        {item.plat_nom}
                                        <span className="badge bg-primary rounded-pill">
                                            x {item.quantite}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Commandes;