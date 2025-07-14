import React, { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import { Edit, Trash2 } from "lucide-react";

const mockConsultations = [
  {
    id: 1,
    student: "John Doe",
    faculty: "Dr. Smith",
    area: "Mental Health",
    date: "2025-07-18T10:00",
    status: "Pending",
  },
  {
    id: 2,
    student: "Jane Roe",
    faculty: "Dr. Patel",
    area: "Academic Advising",
    date: "2025-07-20T14:00",
    status: "Approved",
  },
  {
    id: 3,
    student: "Alice Johnson",
    faculty: "Dr. Brown",
    area: "Career Counseling",
    date: "2025-07-22T09:30",
    status: "Declined",
  },
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Approved: "bg-green-100 text-green-800",
  Declined: "bg-red-100 text-red-800",
};

const AllConsultations = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [consultations, setConsultations] = useState(mockConsultations);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  useEffect(() => {
    const delay = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(delay);
  }, [search]);

  // Filter consultations
  const filtered = useMemo(() => {
    return consultations
      .filter((item) => {
        const matchSearch =
          `${item.student} ${item.faculty} ${item.area}`
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase());
        const matchStatus = statusFilter ? item.status === statusFilter : true;
        return matchSearch && matchStatus;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // latest first
  }, [consultations, debouncedSearch, statusFilter]);

  // Handle delete
  const handleDelete = async (consultation) => {
    const res = await Swal.fire({
      title: "Delete Consultation?",
      text: `Are you sure you want to remove ${consultation.student}'s request?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      confirmButtonText: "Delete",
    });

    if (res.isConfirmed) {
      setConsultations((prev) =>
        prev.filter((item) => item.id !== consultation.id)
      );
      Swal.fire("Deleted!", "Consultation has been removed.", "success");
    }
  };

  // Handle status change
  const handleEdit = async (consultation) => {
    const { value: newStatus } = await Swal.fire({
      title: "Update Status",
      input: "select",
      inputOptions: {
        Pending: "Pending",
        Approved: "Approved",
        Declined: "Declined",
      },
      inputValue: consultation.status,
      showCancelButton: true,
    });

    if (newStatus) {
      setConsultations((prev) =>
        prev.map((c) =>
          c.id === consultation.id ? { ...c, status: newStatus } : c
        )
      );
      Swal.fire("Updated!", "Consultation status updated.", "success");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Consultations</h1>
          <p className="text-sm text-gray-500">Manage and review all consultations.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search by student/faculty/area..."
            className="px-4 py-2 border rounded-md text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Declined">Declined</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white shadow rounded-lg">
          <thead className="bg-gray-50 text-left text-sm text-gray-500">
            <tr>
              <th className="p-4">Student</th>
              <th className="p-4">Faculty</th>
              <th className="p-4">Area</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((c) => (
                <tr key={c.id} className="border-t text-sm">
                  <td className="p-4">{c.student}</td>
                  <td className="p-4">{c.faculty}</td>
                  <td className="p-4">{c.area}</td>
                  <td className="p-4">
                    {new Date(c.date).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusColors[c.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleEdit(c)}>
                      <Edit className="w-5 h-5 text-blue-600 hover:text-blue-800" />
                    </button>
                    <button onClick={() => handleDelete(c)}>
                      <Trash2 className="w-5 h-5 text-red-600 hover:text-red-800" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No consultations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllConsultations;
