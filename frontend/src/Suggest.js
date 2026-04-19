import React, { useEffect, useState } from "react";

function Suggest() {
    const [ingredients, setIngredients] = useState([]);
    const [selected, setSelected] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/ingredients/")
            .then(res => res.json())
            .then(data => setIngredients(data));
    }, []);

    const toggleIngredient = (id) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(i => i !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    const handleSuggest = () => {
        if (selected.length === 0) {
            alert("Choisir au moins un ingrédient");
            return;
        }

        fetch("http://127.0.0.1:8000/api/suggest/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ingredients: selected }),
        })
            .then(res => res.json())
            .then(data => setResults(data));
    };

    return (
        <div className="container">

            {/* INGREDIENTS */}
            <div className="card shadow mb-4 border-0">
                <div className="card-body">

                    <h4 className="mb-3 fw-bold">🧀 Choisir des ingrédients</h4>

                    <div className="row">
                        {ingredients.map(ing => (
                            <div className="col-md-3 mb-2" key={ing.id}>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`ing-${ing.id}`}
                                        onChange={() => toggleIngredient(ing.id)}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`ing-${ing.id}`}
                                    >
                                        {ing.nom}
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        className="btn btn-primary mt-3"
                        onClick={handleSuggest}
                    >
                        🔍 Rechercher
                    </button>

                </div>
            </div>

            {/* RESULTATS */}
            <div className="card shadow border-0">
                <div className="card-body">

                    <h4 className="fw-bold mb-3">📊 Résultats</h4>

                    {results.length === 0 ? (
                        <div className="alert alert-warning">
                            Aucun résultat pour ces ingrédients
                        </div>
                    ) : (
                        <table className="table table-hover align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>Plat</th>
                                    <th>Score</th>
                                </tr>
                            </thead>

                            <tbody>
                                {results.map(r => (
                                    <tr key={r.id}>
                                        <td className="fw-bold">{r.nom}</td>
                                        <td>
                                            <span className="badge bg-success">
                                                {r.score}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                </div>
            </div>

        </div>
    );
}

export default Suggest;