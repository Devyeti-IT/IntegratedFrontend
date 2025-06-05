import React from "react";

export default function BookingConfirmation({ details }: { details: any }) {
  return (
    <div className="booking-confirmation">
      <h2>Booking Confirmed!</h2>
      <p>Confirmation ID: {details?.confirmationId || "MOCK-ID-12345"}</p>
      <p>Thank you for booking with us.</p>
    </div>
  );
}
