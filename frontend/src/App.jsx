import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpertsList from "./pages/ExpertsList";
import ExpertDetail from "./pages/ExpertDetail";
import BookingPage from "./pages/BookingPage";
import MyBookings from "./pages/MyBookings";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<ExpertsList />} />
        <Route path="/expert/:id" element={<ExpertDetail />} />
        <Route path="/book/:id" element={<BookingPage />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </Router>
  );
}
export default App;
