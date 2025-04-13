import { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    // Define your settings state here
    notificationEnabled: true,
    theme: "light",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle settings submission logic here
    console.log("Settings saved:", settings);
  };

  return (
    <div>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="checkbox"
              name="notificationEnabled"
              checked={settings.notificationEnabled}
              onChange={(e) => handleChange({ target: { name: "notificationEnabled", value: e.target.checked } })}
            />
            Enable Notifications
          </label>
        </div>
        <div>
          <label>
            Theme:
            
            <select name="theme" value={settings.theme} onChange={handleChange}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default Settings;