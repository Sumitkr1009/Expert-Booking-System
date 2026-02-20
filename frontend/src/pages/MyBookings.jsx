import { useState } from "react";
import axios from "../api/axios";
import "../styles/MyBookings.css";

function MyBookings() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { data } = await axios.get(`/bookings?email=${email}`);

      if (data.length === 0) {
        setBookings([]);
        setError("No bookings found for this email.");
      } else {
        setBookings(data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching bookings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>My Bookings</h2>

      <div className="search-section">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="primary-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading && <p>Loading bookings...</p>}
      {error && <p className="error-text">{error}</p>}

      {bookings.map((booking) => (
        <div key={booking._id} className="my-booking-card">
          <h3>Expert: {booking.expertId?.name || "Expert Removed"}</h3>
          <p>
            <strong>Date:</strong> {booking.date}
          </p>
          <p>
            <strong>Time:</strong> {booking.timeSlot}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={`status ${booking.status.toLowerCase()}`}>
              {booking.status}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;
