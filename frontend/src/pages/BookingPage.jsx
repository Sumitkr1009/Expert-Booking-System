import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axios";
import "../styles/BookingPage.css";

function BookingPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { date, timeSlot } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!date || !timeSlot) {
    return <p>No slot selected.</p>;
  }

  // Frontend Validation
  const validate = () => {
    const newErrors = {};

    if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone must be exactly 10 digits";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      await axios.post("/bookings", {
        expertId: id,
        ...formData,
        date,
        timeSlot,
      });

      // Redirect back to expert detail
      navigate(`/expert/${id}`);

    } catch (error) {
      alert(
        error.response?.data?.message || "Booking failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="booking-card">
        <h2>Book Appointment</h2>

        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {timeSlot}</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="error-text">{errors.name}</p>
          )}

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="error-text">{errors.email}</p>
          )}

          <input
            type="text"
            name="phone"
            placeholder="Your Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="error-text">{errors.phone}</p>
          )}

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading ? "Booking..." : "Book Slot"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default BookingPage;