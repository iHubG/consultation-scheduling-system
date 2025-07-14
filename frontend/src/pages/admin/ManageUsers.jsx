import React, { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import { Edit, Trash2 } from "lucide-react";
import EditUserModal from "../../components/EditUserModal";

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Student",
    status: "Active",
    createdAt: new Date("2024-10-01"),
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Faculty",
    status: "Inactive",
    createdAt: new Date("2024-09-20"),
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@example.com",
    role: "Admin",
    status: "Active",
    createdAt: new Date("2024-08-15"),
  },
  {
    id: 4,
    name: "Alice Roe",
    email: "alice@example.com",
    role: "Student",
    status: "Active",
    createdAt: new Date("2024-10-05"),
  },
];

const roleColors = {
  Admin: "bg-purple-100 text-purple-700",
  Faculty: "bg-green-100 text-green-700",
  Student: "bg-blue-100 text-blue-700",
};

const ManageUsers = () => {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [editUser, setEditUser] = useState(null);

  // Debounce effect (300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchInput]);


   // SweetAlert: Delete confirmation
  const handleDelete = async (user) => {
    const result = await Swal.fire({
      title: `Delete ${user.name}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#e3342f",
    });

    if (result.isConfirmed) {
      Swal.fire("Deleted!", `${user.name} has been removed.`, "success");
      // TODO: delete logic here
    }
  };

  // SweetAlert: Confirm before saving edits
  const handleSave = async (updatedUser) => {
    const result = await Swal.fire({
      title: "Save changes?",
      text: "Are you sure you want to update this user?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#6366f1",
    });

    if (result.isConfirmed) {
      Swal.fire("Saved!", "User has been updated.", "success");
      setEditUser(null);
      console.log("Save user", updatedUser);
    }
  };

  const filteredUsers = useMemo(() => {
    let result = [...mockUsers];

    // Filter by search
    if (debouncedSearch) {
      result = result.filter((user) =>
        `${user.name} ${user.email}`.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Role filter
    if (roleFilter) {
      result = result.filter((user) => user.role === roleFilter);
    }

    // Status filter
    if (statusFilter) {
      result = result.filter((user) => user.status === statusFilter);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return b.createdAt - a.createdAt;
        case "name":
          return a.name.localeCompare(b.name);
        case "role":
          return a.role.localeCompare(b.role);
        default:
          return 0;
      }
    });

    return result;
  }, [debouncedSearch, roleFilter, statusFilter, sortBy]);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
        <p className="text-sm text-gray-500">View, filter, and sort system users.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <select
          className="px-3 py-2 border rounded-md text-sm text-gray-700"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Faculty">Faculty</option>
          <option value="Student">Student</option>
        </select>

        <select
          className="px-3 py-2 border rounded-md text-sm text-gray-700"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <select
          className="px-3 py-2 border rounded-md text-sm text-gray-700"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="date">Sort by Date Added</option>
          <option value="role">Sort by Role</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white shadow rounded-lg">
          <thead className="bg-gray-50 text-left text-sm text-gray-500">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Added On</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-t text-sm">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        roleColors[user.role] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">{user.createdAt.toLocaleDateString()}</td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => setEditUser(user)}>
                      <Edit className="w-5 h-5 text-blue-600 hover:text-blue-800" />
                    </button>
                    <button onClick={() => handleDelete(user)}>
                      <Trash2 className="w-5 h-5 text-red-600 hover:text-red-800" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ManageUsers;
