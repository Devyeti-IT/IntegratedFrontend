import { useState } from "react";
import { getFlightAvailability } from "../api/api";
import FlightSearchForm from "../components/FlightSearchForm";
import FlightResults from "../components/FlightResults";
import BookingForm from "../components/BookingForm";
import BookingConfirmation from "../components/BookingConfirmation";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  initializeService,
  addFlight,
  getBookingSession,
  confirmBooking,
} from "../api/apiService";
import "../styles/booking.css";

export default function BookingPage() {
  const [searchParams, setSearchParams] = useState<any>(null);
  const [availableFlights, setAvailableFlights] = useState<any[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false); // ✅ added loading state

  const handleSearch = async (params: any) => {
    try {
      setLoading(true); // ✅ start loading
      const result = await getFlightAvailability(params);
      setSearchParams(params);

      const yetiFlights = (result?.YETI_AVAILABILITY || []).map((flight: any) => ({
        flightNumber: flight.flightNumber,
        originCode: flight.originName,
        destinationCode: flight.destinationName,
        price: `${flight.totalAdultFare} ${flight.currency}`,
      }));

      setAvailableFlights(yetiFlights);
    } catch (error) {
      console.error("❌ Flight search failed:", error);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  const handleFlightSelect = (flight: any) => {
    setSelectedFlight(flight);
  };

  const handleBooking = async (passengerInfo: any) => {
    try {
      await initializeService();
      await addFlight({
        flightId: selectedFlight.flightId,
        fareId: selectedFlight.fareId,
      });
      const session = await getBookingSession();
      const booking = await confirmBooking({ ...passengerInfo, session });

      setBookingDetails(booking);
      setBookingComplete(true);
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />

        {/* ✅ loading indicator */}
        {loading && (
          <p className="loading-message">🔄 Loading flights, please wait...</p>
        )}

        {/* Booking intro text */}
        {!searchParams && !loading && (
          <>
            <p className="intro-text"> Book your flight with comfort and speed!</p>
            <FlightSearchForm onSearch={handleSearch} />
          </>
        )}

        {!loading && searchParams && !selectedFlight && (
          <FlightResults
            flights={availableFlights}
            onSelectFlight={handleFlightSelect}
          />
        )}

        {!loading && selectedFlight && !bookingComplete && (
          <BookingForm flight={selectedFlight} onBook={handleBooking} />
        )}

        {!loading && bookingComplete && (
          <BookingConfirmation details={bookingDetails} />
        )}
      </div>
    </div>
  );
}
