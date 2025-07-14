import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Edit, Trash2, Plus } from "lucide-react";

const initialAreas = [
  {
    id: 1,
    name: "Mental Health",
    description: "Counseling and emotional support",
    createdAt: new Date("2024-09-01"),
  },
  {
    id: 2,
    name: "Academic Advising",
    description: "Assistance with academics, courses, and schedules",
    createdAt: new Date("2024-09-05"),
  },
];

const ManageConsultationAreas = () => {
  const [areas, setAreas] = useState(initialAreas);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(initialAreas);

  useEffect(() => {
    const timer = setTimeout(() => {
      const result = areas.filter((area) =>
        area.name.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(result);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, areas]);

  // Handle add/edit
  const handleUpsert = async (existingArea = null) => {
    const { value: formValues } = await Swal.fire({
      title: existingArea ? "Edit Consultation Area" : "Add New Area",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Area Name" value="${existingArea?.name || ""}" />
        <textarea id="swal-description" class="swal2-textarea" placeholder="Description">${existingArea?.description || ""}</textarea>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById("swal-name").value;
        const description = document.getElementById("swal-description").value;
        if (!name || !description) {
          Swal.showValidationMessage("Both name and description are required.");
        }
        return { name, description };
      },
      showCancelButton: true,
      confirmButtonText: existingArea ? "Save Changes" : "Add",
    });

    if (formValues) {
      if (existingArea) {
        setAreas((prev) =>
          prev.map((a) =>
            a.id === existingArea.id
              ? { ...a, name: formValues.name, description: formValues.description }
              : a
          )
        );
        Swal.fire("Updated!", "Consultation area updated.", "success");
      } else {
        const newArea = {
          id: Date.now(),
          name: formValues.name,
          description: formValues.description,
          createdAt: new Date(),
        };
        setAreas((prev) => [...prev, newArea]);
        Swal.fire("Added!", "New consultation area added.", "success");
      }
    }
  };

  // Handle delete
  const handleDelete = async (area) => {
    const res = await Swal.fire({
      title: `Delete "${area.name}"?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      confirmButtonText: "Delete",
    });

    if (res.isConfirmed) {
      setAreas((prev) => prev.filter((a) => a.id !== area.id));
      Swal.fire("Deleted!", "Area has been removed.", "success");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Consultation Areas</h1>
          <p className="text-sm text-gray-500">Create, update, or delete consultation areas.</p>
        </div>
        <button
          onClick={() => handleUpsert()}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          <Plus className="w-4 h-4" />
          Add Area
        </button>
      </div>

      {/* Search bar */}
      <div>
        <input
          type="text"
          placeholder="Search area name..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white shadow rounded-lg">
          <thead className="bg-gray-50 text-left text-sm text-gray-500">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Description</th>
              <th className="p-4">Created</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((area) => (
                <tr key={area.id} className="border-t text-sm">
                  <td className="p-4">{area.name}</td>
                  <td className="p-4">{area.description}</td>
                  <td className="p-4">{area.createdAt.toLocaleDateString()}</td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleUpsert(area)}>
                      <Edit className="w-5 h-5 text-blue-600 hover:text-blue-800" />
                    </button>
                    <button onClick={() => handleDelete(area)}>
                      <Trash2 className="w-5 h-5 text-red-600 hover:text-red-800" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No consultation areas found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageConsultationAreas;
