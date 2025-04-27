import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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
      setFilteredStores(response.data);
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
    <div className="store-status">
      <div className="sidebar">
        <h3>Search Pulperías</h3>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <ul>
          {filteredStores.map((store) => (
            <li
              key={store.id}
              onClick={() =>
                setLocation({ latitude: store.latitude, longitude: store.longitude })
              }
            >
              <b>{store.name}</b>
              <p>Status: {store.status}</p>
              <p>Products: {store.products.join(", ")}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="map-container">
        <h2>Nearby Pulperías</h2>
        {error && <p>{error}</p>}
        {location && (
          <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
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