import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import "../styles/ExpertsList.css";

function ExpertsList() {
  const [experts, setExperts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchExperts();
  }, [search, category, page]);

  const fetchExperts = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await axios.get(
        `/experts?page=${page}&search=${search}&category=${category}`
      );

      setExperts(data.experts);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Failed to fetch experts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Expert Booking System</h1>
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          value={category}
          onChange={(e) => {
            setPage(1);
            setCategory(e.target.value);
          }}
        >
          <option value="">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="Finance">Finance</option>
          <option value="Career">Career</option>
        </select>
      </div>

      {loading && <p>Loading experts...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && experts.length === 0 && (
        <p>No experts found.</p>
      )}

      {experts.map((expert) => (
        <div key={expert._id} className="card">
          <h3>{expert.name}</h3>
          <p>Category: {expert.category}</p>
          <p>Experience: {expert.experience} years</p>
          <p>Rating: ⭐ {expert.rating}</p>

          <Link to={`/expert/${expert._id}`}>
            <button className="primary-btn">
              View Details
            </button>
          </Link>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span>Page {page} of {totalPages}</span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ExpertsList;