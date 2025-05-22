import React, { useState } from "react";
import "../styles/api-test.css";

type ApiPayload = {
  strOrigin: string;
  strDestination: string;
  strDepartFrom: string;
  strDepartTo: string;
  strReturnFrom: string;
  strReturnTo: string;
  iAdult: number;
  iChild: number;
  iInfant: number;
  iOther: number;
  strBookingClass: string;
  strBoardingClass: string;
  strPromoCode: string;
  strLanguageCode: string;
  strOtherPassengerType: string;
  strCurrency: string;
  strTripType: string;
  strClientIP: string;
};

type ApiTestResult = {
  id: number;
  timestamp: string;
  payload: ApiPayload;
  status: "pending" | "success" | "error";
  response?: any;
  errorMessage?: string;
};

export default function ApiManagement() {
  const [form, setForm] = useState<ApiPayload>({
    strOrigin: "KTM",
    strDestination: "PKR",
    strDepartFrom: "2025-06-06",
    strDepartTo: "2025-06-06",
    strReturnFrom: "",
    strReturnTo: "",
    iAdult: 1,
    iChild: 0,
    iInfant: 0,
    iOther: 0,
    strBookingClass: "",
    strBoardingClass: "",
    strPromoCode: "",
    strLanguageCode: "en",
    strOtherPassengerType: "",
    strCurrency: "NPR",
    strTripType: "O",
    strClientIP: "127.0.0.1",
  });

  const [testResults, setTestResults] = useState<ApiTestResult[]>([]);

  const formatDate = (dateStr: string) => dateStr.replace(/-/g, "");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        ["iAdult", "iChild", "iInfant", "iOther"].includes(name)
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ApiPayload = {
      ...form,
      strDepartFrom: formatDate(form.strDepartFrom),
      strDepartTo: formatDate(form.strDepartTo),
      strReturnFrom: form.strReturnFrom ? formatDate(form.strReturnFrom) : "",
      strReturnTo: form.strReturnTo ? formatDate(form.strReturnTo) : "",
    };

    const newTest: ApiTestResult = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      payload,
      status: "pending",
    };

    setTestResults((prev) => [newTest, ...prev]);

    try {
      // Replace below URL with your actual API endpoint
      const response = await fetch("https://your-api-endpoint.com/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Status ${response.status}`);

      const data = await response.json();

      setTestResults((prev) =>
        prev.map((test) =>
          test.id === newTest.id
            ? { ...test, status: "success", response: data }
            : test
        )
      );
    } catch (error: any) {
      setTestResults((prev) =>
        prev.map((test) =>
          test.id === newTest.id
            ? { ...test, status: "error", errorMessage: error.message }
            : test
        )
      );
    }
  };

  return (
    <div className="api-management">
      <h1>Testing API</h1>

      <form onSubmit={handleSubmit} className="api-form">
        {/* Reuse input fields as before (abbreviated for brevity) */}
        <label>
          Origin (IATA):
          <input
            type="text"
            name="strOrigin"
            value={form.strOrigin}
            onChange={handleChange}
            maxLength={3}
            required
          />
        </label>

        <label>
          Destination (IATA):
          <input
            type="text"
            name="strDestination"
            value={form.strDestination}
            onChange={handleChange}
            maxLength={3}
            required
          />
        </label>

        <label>
          Depart From:
          <input
            type="date"
            name="strDepartFrom"
            value={form.strDepartFrom}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Depart To:
          <input
            type="date"
            name="strDepartTo"
            value={form.strDepartTo}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Return From:
          <input
            type="date"
            name="strReturnFrom"
            value={form.strReturnFrom}
            onChange={handleChange}
          />
        </label>

        <label>
          Return To:
          <input
            type="date"
            name="strReturnTo"
            value={form.strReturnTo}
            onChange={handleChange}
          />
        </label>

        <label>
          Adults:
          <input
            type="number"
            name="iAdult"
            value={form.iAdult}
            onChange={handleChange}
            min={0}
            required
          />
        </label>

        <label>
          Children:
          <input
            type="number"
            name="iChild"
            value={form.iChild}
            onChange={handleChange}
            min={0}
          />
        </label>

        <label>
          Infants:
          <input
            type="number"
            name="iInfant"
            value={form.iInfant}
            onChange={handleChange}
            min={0}
          />
        </label>

        <label>
          Other Passengers:
          <input
            type="number"
            name="iOther"
            value={form.iOther}
            onChange={handleChange}
            min={0}
          />
        </label>

        <label>
          Booking Class:
          <input
            type="text"
            name="strBookingClass"
            value={form.strBookingClass}
            onChange={handleChange}
            maxLength={3}
          />
        </label>

        <label>
          Boarding Class:
          <input
            type="text"
            name="strBoardingClass"
            value={form.strBoardingClass}
            onChange={handleChange}
            maxLength={20}
          />
        </label>

        <label>
          Promo Code:
          <input
            type="text"
            name="strPromoCode"
            value={form.strPromoCode}
            onChange={handleChange}
            maxLength={20}
          />
        </label>

        <label>
          Language Code:
          <input
            type="text"
            name="strLanguageCode"
            value={form.strLanguageCode}
            onChange={handleChange}
            maxLength={5}
            required
          />
        </label>

        <label>
          Other Passenger Type:
          <input
            type="text"
            name="strOtherPassengerType"
            value={form.strOtherPassengerType}
            onChange={handleChange}
            maxLength={20}
          />
        </label>

        <label>
          Currency:
          <input
            type="text"
            name="strCurrency"
            value={form.strCurrency}
            onChange={handleChange}
            maxLength={5}
            required
          />
        </label>

        <label>
          Trip Type:
          <select
            name="strTripType"
            value={form.strTripType}
            onChange={handleChange}
          >
            <option value="O">One-way</option>
            <option value="R">Round-trip</option>
          </select>
        </label>

        <label>
          Client IP:
          <input
            type="text"
            name="strClientIP"
            value={form.strClientIP}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="btn-test">
          Test API
        </button>
      </form>

      <section className="test-results">
        <h2>Test Results</h2>
        {testResults.length === 0 ? (
          <p>No tests run yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Origin → Destination</th>
                <th>Trip Type</th>
                <th>Passengers (A/C/I/O)</th>
                <th>Status</th>
                <th>Response / Error</th>
              </tr>
            </thead>
            <tbody>
              {testResults.map(({ id, timestamp, payload, status, response, errorMessage }) => (
                <tr key={id} className={`status-${status}`}>
                  <td>{timestamp}</td>
                  <td>{payload.strOrigin} → {payload.strDestination}</td>
                  <td>{payload.strTripType === "O" ? "One-way" : "Round-trip"}</td>
                  <td>
                    {payload.iAdult} / {payload.iChild} / {payload.iInfant} / {payload.iOther}
                  </td>
                  <td>{status}</td>
                  <td>
                    {status === "success" && (
                      <pre>{JSON.stringify(response, null, 2)}</pre>
                    )}
                    {status === "error" && <span className="error">{errorMessage}</span>}
                    {status === "pending" && <em>Loading...</em>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
