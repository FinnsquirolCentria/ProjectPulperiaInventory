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

    if (name === "productId") {
      const selectedProduct = products.find((product) => product.id === parseInt(value));
      if (selectedProduct) {
        setNewSale((prev) => ({
          ...prev,
          [name]: value,
          totalPrice: selectedProduct.price * (prev.quantity || 0),
        }));
      }
    } else if (name === "quantity") {
      const selectedProduct = products.find((product) => product.id === parseInt(newSale.productId));
      if (selectedProduct) {
        setNewSale((prev) => ({
          ...prev,
          [name]: value,
          totalPrice: selectedProduct.price * value,
        }));
      }
    } else {
      setNewSale((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedProduct = products.find(
      (product) => product.id === parseInt(newSale.productId)
    );

    if (!selectedProduct) {
      alert("Invalid product selected.");
      return;
    }

    if (selectedProduct.stock < parseInt(newSale.quantity)) {
      alert("Not enough stock available.");
      return;
    }

    axios
      .post("http://localhost:5000/api/sales", newSale)
      .then((res) => {
        setSales((prevSales) => [...prevSales, res.data]);

        const updatedStock = selectedProduct.stock - parseInt(newSale.quantity);
        axios
          .put(`http://localhost:5000/api/products/${selectedProduct.id}`, {
            stock: updatedStock,
          })
          .then(() => {
            setProducts((prevProducts) =>
              prevProducts.map((product) =>
                product.id === selectedProduct.id
                  ? { ...product, stock: updatedStock }
                  : product
              )
            );
          })
          .catch((err) => console.error("Error updating product stock:", err));

        setNewSale({ productId: "", quantity: "", totalPrice: "" });
      })
      .catch((err) => console.error(err));
  };

  const handleRemoveSale = (id) => {
    axios
      .delete(`http://localhost:5000/api/sales/${id}`)
      .then(() => {
        setSales((prevSales) => prevSales.filter((sale) => sale.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Sales</h2>

      <form onSubmit={handleSubmit}>
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
          readOnly
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
            <button onClick={() => handleRemoveSale(s.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sales;