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

    const existingProduct = products.find(
      (product) => product.name.toLowerCase() === newProduct.name.toLowerCase()
    );

    if (existingProduct) {
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
      axios
        .post("http://localhost:5000/api/products", newProduct)
        .then((res) => {
          setProducts((prevProducts) => [...prevProducts, res.data]);
          setNewProduct({ name: "", stock: "", price: "" });
        })
        .catch((err) => console.error(err));
    }
  };

  const handleRemove = (id) => {
    axios
      .delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Products</h2>

      <form onSubmit={handleSubmit}>
        <select
          name="name"
          value={newProduct.name}
          onChange={handleChange}
        >
          <option value="">Select a Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="name"
          placeholder="Or type product name"
          value={newProduct.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Quantity"
          value={newProduct.stock}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          step="0.01"
          value={newProduct.price}
          onChange={handleChange}
          required
        />
        <button type="submit">Add product</button>
      </form>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} | {p.stock} units | {p.price} C$
            <button onClick={() => handleRemove(p.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
