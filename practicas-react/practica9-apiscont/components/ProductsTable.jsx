'use client';
import React, { useEffect, useState } from 'react';

export default function ProductsTable() {
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0); // Para traer diferentes productos en cada clic

    const fetchProducts = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/products?limit=15&skip=${skip}`);
            const data = await response.json();
            setProducts(data.products);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [skip]);

    const handleLoadMore = () => {
        setSkip((prevSkip) => prevSkip + 15);
    };

    return (
        <div className="p-4">
            <h2>Lista de Productos</h2>
            <div className="container mt-5 p-4 bg-light shadow rounded">
                <table className="table table-striped table-hover" border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Marca</th>
                            <th>Categoría</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.title}</td>
                                <td>{p.description}</td>
                                <td>${p.price}</td>
                                <td>{p.brand}</td>
                                <td>{p.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="btn btn-success mt-3" onClick={handleLoadMore} style={{ marginTop: '10px' }}>
                Cargar otros 15 productos
            </button>
        </div>
    );
}
