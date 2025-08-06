import React, { useState } from "react";
import '../css/SeatSelection.css';

const generateSeats = (rows = 6, seatsPerRow = 4, businessRows = 2) => {
  const seatLetters = ["A", "B", "C", "D", "E", "F"]; // up to 6 seats per row
  const layout = [];

  for (let row = 1; row <= rows; row++) {
    for (let col = 0; col < seatsPerRow; col++) {
      layout.push({
        number: `${row}${seatLetters[col]}`,
        class: row <= businessRows ? "Business" : "Economy",
      });
    }
  }

  return layout;
};

function SeatSelection() {

    const [rows, setRows] = useState(6);
  const [seatsPerRow, setSeatsPerRow] = useState(4);
  const [businessRows, setBusinessRows] = useState(2);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seatLayout = generateSeats(rows, seatsPerRow, businessRows);

  const toggleSeatSelection = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Dynamic Seat Selection</h1>
      <p className="mb-6 text-gray-600">Choose seats dynamically for your flight.</p>

      {/* Controls for Dynamic Layout */}
      <div className="flex gap-4 mb-6 bg-white p-4 rounded-xl shadow-md">
        <div>
          <label className="block text-sm font-medium">Rows</label>
          <input
            type="number"
            min={1}
            max={30}
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            className="mt-1 border rounded-md p-1 w-20 text-center"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Seats/Row</label>
          <input
            type="number"
            min={1}
            max={6}
            value={seatsPerRow}
            onChange={(e) => setSeatsPerRow(Number(e.target.value))}
            className="mt-1 border rounded-md p-1 w-20 text-center"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Business Rows</label>
          <input
            type="number"
            min={0}
            max={rows}
            value={businessRows}
            onChange={(e) => setBusinessRows(Number(e.target.value))}
            className="mt-1 border rounded-md p-1 w-20 text-center"
          />
        </div>
      </div>

      {/* Seat Layout */}
      <div
        className={`grid`}
        style={{
          gridTemplateColumns: `repeat(${seatsPerRow}, minmax(0, 1fr))`,
          gap: "1rem",
        }}
      >
        {seatLayout.map((seat) => {
          const isSelected = selectedSeats.includes(seat.number);
          const seatClassColor =
            seat.class === "Business"
              ? "bg-yellow-100 border-yellow-400"
              : "bg-green-100 border-green-400";

          return (
            <button
              key={seat.number}
              onClick={() => toggleSeatSelection(seat.number)}
              className={`w-16 h-16 flex items-center justify-center border-2 rounded-xl font-bold transition 
                ${seatClassColor} 
                ${isSelected ? "bg-blue-500 text-white border-blue-600" : ""}
              `}
            >
              {seat.number}
            </button>
          );
        })}
      </div>

      {/* Selected Seats Display */}
      <div className="mt-6 w-full max-w-md bg-white rounded-xl shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Selected Seats:</h2>
        {selectedSeats.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {selectedSeats.map((seat) => (
              <li
                key={seat}
                className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm"
              >
                {seat}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No seats selected yet.</p>
        )}
      </div>
    </div>
  )
}

export default SeatSelection
