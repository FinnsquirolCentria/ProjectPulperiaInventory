const express = require("express");
const router = express.Router();
const stores = require("../data/stores.json"); // Mock data for stores

router.get("/nearby", (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Latitude and longitude are required." });
  }

  // Mock logic to filter nearby stores (replace with actual geolocation logic)
  const nearbyStores = stores.filter((store) => {
    const distance = Math.sqrt(
      Math.pow(store.latitude - parseFloat(lat), 2) + Math.pow(store.longitude - parseFloat(lng), 2)
    );
    return distance < 0.1; // Example threshold for "nearby" stores
  });

  res.json(nearbyStores);
});

module.exports = router;