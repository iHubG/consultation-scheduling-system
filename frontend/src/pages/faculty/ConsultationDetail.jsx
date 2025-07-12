import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/InlineSpinner';
// import axios from '../../lib/axios';

const ConsultationDetail = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  useEffect(() => {
    const samples = [
      {
        id: 1,
        student_id: '21-3343',
        student: { name: 'John Doe' },
        year: '2',
        section: 'WMAD',
        course: 'BSIT',
        building: 'IT New Building',
        room: 'Lab A',
        date: '2025-07-15',
        time_slot: '10:00 AM - 11:00 AM',
        purpose: 'Discuss project requirements and expectations.',
        status: 'pending',
      },
      {
        id: 2,
        student_id: '21-4455',
        student: { name: 'Jane Smith' },
        year: '3',
        section: 'WMAA',
        course: 'BSCS',
        building: 'Ramon Magsaysay Building',
        room: 'Room 102',
        date: '2025-07-16',
        time_slot: '09:00 AM - 10:00 AM',
        purpose: 'Clarify final exam topics.',
        status: 'approved',
      },
      {
        id: 3,
        student_id: '21-5566',
        student: { name: 'Alex Reyes' },
        year: '4',
        section: 'WMB',
        course: 'BSIT',
        building: 'IT New Building',
        room: 'Conference Room',
        date: '2025-07-17',
        time_slot: '01:00 PM - 02:00 PM',
        purpose: 'Seek feedback on thesis draft.',
        status: 'pending',
      },
    ];

    setTimeout(() => {
      setConsultations(samples);
      setLoading(false);
    }, 500);
  }, []);

  const handleDecision = (id, approved) => {
    setActionLoadingId(id);
    setTimeout(() => {
      setConsultations(prev =>
        prev.map(c =>
          c.id === id ? { ...c, status: approved ? 'approved' : 'declined' } : c
        )
      );
      setActionLoadingId(null);
    }, 800);
  };

  if (loading) {
    return (
      <div className="mt-20">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded shadow mt-5">
      <h2 className="text-2xl font-semibold mb-4 text-purple-700">Faculty Consultations</h2>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-purple-100 text-purple-800">
            <tr>
              <th className="py-2 px-4 text-left border-b">Student ID</th>
              <th className="py-2 px-4 text-left border-b">Name</th>
              <th className="py-2 px-4 text-left border-b">Course / Year / Section</th>
              <th className="py-2 px-4 text-left border-b">Date</th>
              <th className="py-2 px-4 text-left border-b">Time Slot</th>
              <th className="py-2 px-4 text-left border-b">Location</th>
              <th className="py-2 px-4 text-left border-b">Purpose</th>
              <th className="py-2 px-4 text-left border-b">Status / Actions</th>
            </tr>
          </thead>
          <tbody>
            {consultations.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="py-2 px-4">{c.student_id}</td>
                <td className="py-2 px-4">{c.student?.name}</td>
                <td className="py-2 px-4">{`${c.course} ${c.year}-${c.section}`}</td>
                <td className="py-2 px-4">{c.date}</td>
                <td className="py-2 px-4">{c.time_slot}</td>
                <td className="py-2 px-4">{c.building} – {c.room}</td>
                <td className="py-2 px-4">{c.purpose}</td>
                <td className="py-2 px-4">
                  {c.status === 'pending' ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDecision(c.id, true)}
                        disabled={actionLoadingId === c.id}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-xs cursor-pointer"
                      >
                        {actionLoadingId === c.id ? 'Processing...' : 'Approve'}
                      </button>
                      <button
                        onClick={() => handleDecision(c.id, false)}
                        disabled={actionLoadingId === c.id}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs cursor-pointer"
                      >
                        {actionLoadingId === c.id ? 'Processing...' : 'Decline'}
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`text-xs font-medium rounded px-2 py-1 inline-block ${
                        c.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {c.status.toUpperCase()}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden flex flex-col gap-5 mt-4 text-sm">
  {consultations.map((c) => (
    <div
      key={c.id}
      className="rounded-lg shadow-md border border-purple-200 bg-white px-5 py-4 space-y-3"
    >
      <div className="space-y-1 text-gray-700">
        <div>
          <span className="font-semibold">Student ID:</span> {c.student_id}
        </div>
        <div>
          <span className="font-semibold">Name:</span> {c.student?.name}
        </div>
        <div>
          <span className="font-semibold">Course / Year / Section:</span>{' '}
          {`${c.course} ${c.year}-${c.section}`}
        </div>
      </div>

      <hr className="border-gray-200" />

      <div className="space-y-1 text-gray-700">
        <div>
          <span className="font-semibold">Date:</span> {c.date}
        </div>
        <div>
          <span className="font-semibold">Time:</span> {c.time_slot}
        </div>
        <div>
          <span className="font-semibold">Location:</span> {c.building} – {c.room}
        </div>
        <div>
          <span className="font-semibold">Purpose:</span> {c.purpose}
        </div>
      </div>

      <div>
        {c.status === 'pending' ? (
          <div className="flex gap-3 mt-3">
            <button
              onClick={() => handleDecision(c.id, true)}
              disabled={actionLoadingId === c.id}
              className="flex-1 bg-green-600 text-white py-2 rounded-md text-sm font-medium hover:bg-green-700 transition cursor-pointer"
            >
              {actionLoadingId === c.id ? 'Processing...' : 'Approve'}
            </button>
            <button
              onClick={() => handleDecision(c.id, false)}
              disabled={actionLoadingId === c.id}
              className="flex-1 bg-red-600 text-white py-2 rounded-md text-sm font-medium hover:bg-red-700 transition cursor-pointer"
            >
              {actionLoadingId === c.id ? 'Processing...' : 'Decline'}
            </button>
          </div>
        ) : (
          <div
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              c.status === 'approved'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {c.status.toUpperCase()}
          </div>
        )}
      </div>
    </div>
  ))}
</div>


    </div>
  );
};

export default ConsultationDetail;
