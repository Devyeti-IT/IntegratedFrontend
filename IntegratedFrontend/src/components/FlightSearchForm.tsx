import React, { useState } from "react";

export default function FlightSearchForm({ onSearch }: { onSearch: (params: any) => void }) {
  const [form, setForm] = useState({
    strOrigin: "KTM",
    strDestination: "PKR",
    strDepartFrom: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    strDepartTo: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    strReturnFrom: "",
    strReturnTo: "",
    iAdult: 1,
    iChild: 0,
    iInfant: 0,
    strLanguageCode: "en",
    strCurrency: "NPR",
    strTripType: "O",
    strClientIP: "127.0.0.1",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payload = {
      ...form,
      strDepartFrom: form.strDepartFrom.replace(/-/g, ""),
      strDepartTo: form.strDepartTo.replace(/-/g, ""),
      strReturnFrom: form.strReturnFrom?.replace(/-/g, "") || "",
      strReturnTo: form.strReturnTo?.replace(/-/g, "") || "",
    };
    onSearch(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="flight-search-form">
      <input name="strOrigin" value={form.strOrigin} onChange={handleChange} placeholder="From (IATA)" />
      <input name="strDestination" value={form.strDestination} onChange={handleChange} placeholder="To (IATA)" />
      <input type="date" name="strDepartFrom" value={form.strDepartFrom} onChange={handleChange} />
      <input type="date" name="strReturnFrom" value={form.strReturnFrom} onChange={handleChange} />
      <input type="number" name="iAdult" value={form.iAdult} onChange={handleChange} placeholder="Adults" />
      <input type="number" name="iChild" value={form.iChild} onChange={handleChange} placeholder="Children" />
      <button type="submit">Search Flights</button>
    </form>
  );
}
