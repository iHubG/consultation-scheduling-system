import React, { useEffect, useState } from 'react';
import axios from '../../lib/axios';
import StatusBadge from '../../components/StatusBadge';
import Spinner from '../../components/InlineSpinner';

// Sample data for development/testing before backend is ready
const sampleData = [
  {
    id: 1,
    building: 'Main Hall',
    room: '101',
    date: '2025-07-15',
    timeSlot: '09:00 - 10:00',
    status: 'Pending',
  },
  {
    id: 2,
    building: 'Science Block',
    room: '203',
    date: '2025-07-16',
    timeSlot: '11:00 - 12:00',
    status: 'Approved',
  },
  {
    id: 3,
    building: 'Library',
    room: '5A',
    date: '2025-07-17',
    timeSlot: '14:00 - 15:00',
    status: 'Rejected',
  },
];

const Status = () => {
  const [consultationRequests, setConsultationRequests] = useState(sampleData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/student/consultations')
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setConsultationRequests(res.data);
        } else {
          // if backend returns empty or invalid, keep sample data
          setConsultationRequests(sampleData);
        }
      })
      .catch(() => {
        // On error, fallback to sample data
        setConsultationRequests(sampleData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mt-20">
        <Spinner />
      </div>
    );
  }


  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto bg-white rounded shadow mt-5">
      <h2 className="text-2xl sm:text-2xl font-semibold mb-4 text-purple-700">
        My Consultation Requests
      </h2>

      {consultationRequests.length === 0 ? (
        <p className="text-gray-600 text-sm">No consultation requests found.</p>
      ) : (
        <>
          {/* Table View for Desktop */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-purple-100 text-purple-800">
                <tr>
                  <th className="text-left py-2 px-4 border-b">Building</th>
                  <th className="text-left py-2 px-4 border-b">Room</th>
                  <th className="text-left py-2 px-4 border-b">Date</th>
                  <th className="text-left py-2 px-4 border-b">Time Slot</th>
                  <th className="text-left py-2 px-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {consultationRequests.map(
                  ({ id, building, room, date, timeSlot, status }) => (
                    <tr key={id} className="hover:bg-gray-50">
                      <td className="py-2 px-4">{building}</td>
                      <td className="py-2 px-4">{room}</td>
                      <td className="py-2 px-4">{date}</td>
                      <td className="py-2 px-4">{timeSlot}</td>
                      <td className="py-2 px-4">
                        <StatusBadge status={status} />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Card View for Mobile */}
          <div className="sm:hidden flex flex-col gap-4 mt-4 text-sm">
            {consultationRequests.map(
              ({ id, building, room, date, timeSlot, status }) => (
                <div
                  key={id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50"
                >
                  <div className="mb-1">
                    <span className="font-medium text-gray-700">Building:</span>{' '}
                    {building}
                  </div>
                  <div className="mb-1">
                    <span className="font-medium text-gray-700">Room:</span>{' '}
                    {room}
                  </div>
                  <div className="mb-1">
                    <span className="font-medium text-gray-700">Date:</span>{' '}
                    {date}
                  </div>
                  <div className="mb-1">
                    <span className="font-medium text-gray-700">Time Slot:</span>{' '}
                    {timeSlot}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Status:</span>{' '}
                    <StatusBadge status={status} />
                  </div>
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Status;
