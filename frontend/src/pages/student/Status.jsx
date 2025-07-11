import React from 'react';

const Status = () => {
  const consultationRequests = [
    {
      id: 1,
      building: 'Ramon Magsaysay Building',
      room: 'Room 101',
      date: '2025-07-15',
      timeSlot: '10:00 AM - 11:00 AM',
      status: 'Approved',
    },
    {
      id: 2,
      building: 'IT New Building',
      room: 'Lab A',
      date: '2025-07-17',
      timeSlot: '02:00 PM - 03:00 PM',
      status: 'Pending Approval',
    },
  ];

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
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            status === 'Approved'
                              ? 'bg-green-100 text-green-700'
                              : status === 'Rejected'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {status}
                        </span>
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
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        status === 'Approved'
                          ? 'bg-green-100 text-green-700'
                          : status === 'Rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {status}
                    </span>
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
