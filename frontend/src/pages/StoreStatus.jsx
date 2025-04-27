import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const StoreStatus = () => {
  const [location, setLocation] = useState(null);
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    // Filter stores based on the search query
    const filtered = stores.filter((store) =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStores(filtered);
  }, [searchQuery, stores]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          fetchNearbyStores(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.error("Error fetching location:", err);
          setError("Failed to fetch location. Please enable GPS.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const fetchNearbyStores = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/stores/nearby?lat=${latitude}&lng=${longitude}`
      );
      setStores(response.data);
      setFilteredStores(response.data); // Initialize filtered stores
    } catch (error) {
      console.error("Error fetching nearby stores:", error);
      setError("Failed to fetch nearby stores. Please try again later.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const CenterMap = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
      if (lat && lng) {
        map.setView([lat, lng], 15);
      }
    }, [lat, lng, map]);
    return null;
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "300px", padding: "2rem", backgroundColor: "#f4f4f9", borderRight: "1px solid #ccc" }}>
        <h3>Search Pulperías</h3>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredStores.map((store) => (
            <li
              key={store.id}
              style={{
                padding: "10px",
                marginBottom: "5px",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => setLocation({ latitude: store.latitude, longitude: store.longitude })}
            >
              <b>{store.name}</b>
              <p>Status: {store.status}</p>
              <p>Products: {store.products.join(", ")}</p>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ flex: 1 }}>
        <h2>Nearby Pulperías</h2>
        {error && <p>{error}</p>}
        {location && (
          <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={15}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[location.latitude, location.longitude]}>
              <Popup>Your Location</Popup>
            </Marker>
            {stores.map((store) => (
              <Marker key={store.id} position={[store.latitude, store.longitude]}>
                <Popup>
                  <b>{store.name}</b> <br />
                  Status: {store.status} <br />
                  Products: {store.products.join(", ")}
                </Popup>
              </Marker>
            ))}
            {location && <CenterMap lat={location.latitude} lng={location.longitude} />}
          </MapContainer>
        )}
        {!location && !error && <p>Loading map...</p>}
      </div>
    </div>
  );
};

export default StoreStatus;