import React, { useState, useEffect } from 'react';
import axios from '../../lib/axios';
import SelectField from '../../components/SelectField';

const SetAvailability = () => {
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const timeSlots = [
    '08:00 AM - 09:00 AM',
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '01:00 PM - 02:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
  ];

  useEffect(() => {
    // Static fallback building/room list (can be replaced with API)
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBuilding || !selectedRoom || !selectedDate || !timeSlot) {
      alert('Please complete all fields.');
      return;
    }

    try {
      const payload = {
        building: selectedBuilding,
        room: selectedRoom,
        date: selectedDate,
        time_slot: timeSlot,
      };

      await axios.post('/faculty/availability', payload);

      setSuccessMsg(
        `Availability set for ${selectedDate} at ${timeSlot} in ${selectedRoom}, ${selectedBuilding}.`
      );

      // Reset form
      setSelectedBuilding('');
      setSelectedRoom('');
      setSelectedDate('');
      setTimeSlot('');
    } catch (err) {
      console.error(err);
      alert('Failed to set availability. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow mt-5">
      <h2 className="text-2xl font-semibold mb-4 text-purple-700">
        Set Consultation Availability
      </h2>

      {successMsg && (
        <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Building */}
        <SelectField
          label="Select Building:"
          value={selectedBuilding}
          onChange={(e) => setSelectedBuilding(e.target.value)}
          options={buildings.map((b) => b.name)}
          placeholder="-- Choose a building --"
        />

        {/* Room */}
        <SelectField
          label="Select Room:"
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          options={rooms}
          disabled={!rooms.length}
        />

        {/* Date */}
        <label className="block mb-4 font-medium text-gray-700">
          Select Date:
          <input
            type="date"
            min={new Date().toISOString().split('T')[0]}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full mt-1 p-2 border rounded focus:ring-purple-300 outline-none"
            required
          />
        </label>

        {/* Time Slot */}
        <SelectField
          label="Select Time Slot:"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          options={timeSlots}
          placeholder="-- Choose a time slot --"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Set Availability
        </button>
      </form>
    </div>
  );
};

export default SetAvailability;
