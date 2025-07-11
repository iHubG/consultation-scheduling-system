import React, { useState, useEffect } from 'react';

const Schedule = () => {
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const data = [
      {
        name: 'Ramon Magsaysay Building',
        rooms: ['Room 101', 'Room 102', 'Room 201', 'Room 202'],
      },
      {
        name: 'IT New Building',
        rooms: ['Lab A', 'Lab B', 'Conference Room'],
      },
    ];
    setBuildings(data);
  }, []);

  useEffect(() => {
    if (selectedBuilding) {
      const building = buildings.find(b => b.name === selectedBuilding);
      setRooms(building ? building.rooms : []);
      setSelectedRoom('');
    } else {
      setRooms([]);
      setSelectedRoom('');
    }
  }, [selectedBuilding, buildings]);

  const timeSlots = [
    '08:00 AM - 09:00 AM',
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '01:00 PM - 02:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedBuilding || !selectedRoom || !selectedDate || !timeSlot) {
      alert('Please select building, room, date, and time slot.');
      return;
    }

    // TODO: Submit to backend

    setSuccessMsg(
      `Consultation scheduled on ${selectedDate} at ${timeSlot} in ${selectedRoom}, ${selectedBuilding}.`
    );

    // Reset form
    setSelectedBuilding('');
    setSelectedRoom('');
    setSelectedDate('');
    setTimeSlot('');
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow mt-5">
      <h2 className="text-2xl font-semibold mb-4 text-purple-700">
        Schedule Consultation
      </h2>

      {successMsg && (
        <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Building */}
        <label className="block mb-4 font-medium text-gray-700">
          Select Building:
          <select
            className="w-full mt-1 p-2 border rounded focus:ring-purple-300 outline-none"
            value={selectedBuilding}
            onChange={(e) => setSelectedBuilding(e.target.value)}
          >
            <option value="">-- Choose a building --</option>
            {buildings.map((b) => (
              <option key={b.name} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>
        </label>

        {/* Room */}
        <label className="block mb-4 font-medium text-gray-700">
          Select Room:
          <select
            className="w-full mt-1 p-2 border rounded focus:ring-purple-300 outline-none"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            disabled={!rooms.length}
          >
            <option value="">-- Choose a room --</option>
            {rooms.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
        </label>

        {/* Date */}
        <label className="block mb-4 font-medium text-gray-700">
          Select Date:
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full mt-1 p-2 border rounded focus:ring-purple-300 outline-none"
          />
        </label>

        {/* Time Slot */}
        <label className="block mb-6 font-medium text-gray-700">
          Select Time Slot:
          <select
            className="w-full mt-1 p-2 border rounded focus:ring-purple-300 outline-none"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
          >
            <option value="">-- Choose a time slot --</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Schedule
        </button>
      </form>
    </div>
  );
};

export default Schedule;
