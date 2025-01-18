import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Usando fetch no lugar de axios
    fetch('https://fakestoreapi.com/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na requisição da API');
        }
        return response.json(); // converte a resposta para JSON
      })
      .then((data) => {
        console.log(data); // Verifique o conteúdo da resposta
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar os produtos:', error);
        setError('Erro ao carregar os produtos');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <div>Nenhum produto disponível.</div>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductList;
