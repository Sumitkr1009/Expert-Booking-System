import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import socket from "../socket/socket";
import "../styles/ExpertDetail.css";

function ExpertDetail() {
  const { id } = useParams();
  const [expert, setExpert] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpertData();
  }, [id]);

  const fetchExpertData = async () => {
    try {
      setLoading(true);

      // Fetch expert details
      const expertRes = await axios.get(`/experts/${id}`);
      setExpert(expertRes.data);

      // Fetch booked slots from DB
      const bookingRes = await axios.get(`/bookings/expert/${id}`);

      const formatted = bookingRes.data.map(
        (b) => `${b.date}-${b.timeSlot}`
      );

      setBookedSlots(formatted);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Real-time slot disable
  useEffect(() => {
    socket.on("slotBooked", (data) => {
      if (data.expertId === id) {
        setBookedSlots((prev) => [
          ...prev,
          `${data.date}-${data.timeSlot}`,
        ]);
      }
    });

    return () => {
      socket.off("slotBooked");
    };
  }, [id]);

  if (loading) return <p>Loading expert details...</p>;
  if (!expert) return <p>Expert not found</p>;

  return (
    <div className="container">
      <div className="card">
        <h2>{expert.name}</h2>
        <p><strong>Category:</strong> {expert.category}</p>
        <p><strong>Experience:</strong> {expert.experience} years</p>
        <p><strong>Rating:</strong> ⭐ {expert.rating}</p>
      </div>

      <h3>Available Slots</h3>

      {expert.availableSlots.map((slotGroup, index) => (
        <div key={index} className="slot-group">
          <h4>Date: {slotGroup.date}</h4>

          <div className="slot-buttons">
            {slotGroup.slots.map((slot, i) => {
              const key = `${slotGroup.date}-${slot}`;
              const isBooked = bookedSlots.includes(key);

              return (
                <Link
                  key={i}
                  to={isBooked ? "#" : `/book/${expert._id}`}
                  state={
                    isBooked
                      ? {}
                      : { date: slotGroup.date, timeSlot: slot }
                  }
                >
                  <button
                    disabled={isBooked}
                    className={
                      isBooked
                        ? "slot-btn booked"
                        : "slot-btn available"
                    }
                  >
                    {slot}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpertDetail;