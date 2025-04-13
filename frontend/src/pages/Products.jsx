import { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    stock: "",
    price: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the product already exists
    const existingProduct = products.find(
      (product) => product.name.toLowerCase() === newProduct.name.toLowerCase()
    );

    if (existingProduct) {
      // Update the existing product's stock and price
      const updatedProduct = {
        ...existingProduct,
        stock: parseInt(existingProduct.stock) + parseInt(newProduct.stock),
        price: parseFloat(newProduct.price),
      };

      axios
        .put(`http://localhost:5000/api/products/${existingProduct.id}`, updatedProduct)
        .then(() => {
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === existingProduct.id ? updatedProduct : product
            )
          );
          setNewProduct({ name: "", stock: "", price: "" });
        })
        .catch((err) => console.error(err));
    } else {
      // Add a new product
      axios
        .post("http://localhost:5000/api/products", newProduct)
        .then((res) => {
          setProducts((prevProducts) => [...prevProducts, res.data]);
          setNewProduct({ name: "", stock: "", price: "" });
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Productos</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          value={newProduct.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Cantidad"
          value={newProduct.stock}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          step="0.01"
          value={newProduct.price}
          onChange={handleChange}
          required
        />
        <button type="submit">Agregar producto</button>
      </form>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - {p.stock} unidades - {p.price} C$
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;