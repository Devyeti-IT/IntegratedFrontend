
import React from "react";

interface Flight {
  flightNumber?: string;
  flightId?: string;
  originCode?: string;
  from?: string;
  destinationCode?: string;
  to?: string;
  price?: number | string;
}

interface FlightResultsProps {
  flights: Flight[];
  onSelectFlight: (flight: Flight) => void;
}

const FlightResults: React.FC<FlightResultsProps> = ({ flights, onSelectFlight }) => {
  return (
    <div className="flights-section">
      {flights.length === 0 ? (
        <p>No flights found.</p>
      ) : (
        <ul className="flight-list">
          {flights.map((flight: Flight, index: number) => (
            <li key={index} className="flight-item">
              <div>Flight: {flight?.flightNumber || flight?.flightId || "N/A"}</div>
              <div>
                {flight?.originCode || flight?.from} → {flight?.destinationCode || flight?.to}
              </div>
              <div>Price: {flight?.price || "N/A"}</div>
              <button onClick={() => onSelectFlight(flight)} className="search-button">
                Book This Flight
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FlightResults;
