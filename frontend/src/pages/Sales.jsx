import { useEffect, useState } from "react";
import axios from "axios";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [newSale, setNewSale] = useState({
    productId: "",
    quantity: "",
    totalPrice: "",
  });

  useEffect(() => {
    fetchSales();
    fetchProducts();
  }, []);

  const fetchSales = () => {
    axios
      .get("http://localhost:5000/api/sales")
      .then((res) => setSales(res.data))
      .catch((err) => console.error(err));
  };

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSale((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Find the selected product
    const selectedProduct = products.find(
      (product) => product.id === parseInt(newSale.productId)
    );

    if (!selectedProduct) {
      alert("Invalid product selected.");
      return;
    }

    // Check if enough stock is available
    if (selectedProduct.stock < parseInt(newSale.quantity)) {
      alert("Not enough stock available.");
      return;
    }

    // Post the sale
    axios
      .post("http://localhost:5000/api/sales", newSale)
      .then((res) => {
        // Update the sales list
        setSales((prevSales) => [...prevSales, res.data]);

        // Update the product stock
        const updatedStock = selectedProduct.stock - parseInt(newSale.quantity);
        axios
          .put(`http://localhost:5000/api/products/${selectedProduct.id}`, {
            stock: updatedStock,
          })
          .then(() => {
            // Update the products list in state
            setProducts((prevProducts) =>
              prevProducts.map((product) =>
                product.id === selectedProduct.id
                  ? { ...product, stock: updatedStock }
                  : product
              )
            );
          })
          .catch((err) => console.error("Error updating product stock:", err));

        // Reset the form
        setNewSale({ productId: "", quantity: "", totalPrice: "" });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Sales</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <select
          name="productId"
          value={newSale.productId}
          onChange={handleChange}
          required
        >
          <option value="">Select a Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} (Stock: {product.stock})
            </option>
          ))}
        </select>
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newSale.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="totalPrice"
          placeholder="Total Price"
          step="0.01"
          value={newSale.totalPrice}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Sale</button>
      </form>

      <ul>
        {sales.map((s) => (
          <li key={s.id}>
            Product:{" "}
            {products.find((p) => p.id === s.productId)?.name || "Unknown"} -{" "}
            Quantity: {s.quantity} - Total Price: {s.totalPrice} - Date:{" "}
            {new Date(s.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sales;