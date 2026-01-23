import { useEffect, useState } from "react";
import axios from "axios";

function AddPersonal({ onAdd, editData, clearEdit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [level, setLevel] = useState("Junior");

  // When Edit button clicked, fill form
  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setEmail(editData.email);
      setRole(editData.role);
      setLevel(editData.experience_level);
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editData) {
      // UPDATE
      axios
        .put(`http://localhost:5000/personal/${editData.id}`, {
          name,
          email,
          role,
          experience_level: level,
        })
        .then(() => {
          onAdd();
          clearEdit();
        })
        .catch(() => alert("Error updating personal"));
    } else {
      // CREATE
      axios
        .post("http://localhost:5000/personal", {
          name,
          email,
          role,
          experience_level: level,
        })
        .then(() => {
          onAdd();
        })
        .catch(() => alert("Error adding personal"));
    }

    setName("");
    setEmail("");
    setRole("");
    setLevel("Junior");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-1 h-8 rounded-full ${editData ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
        <h3 className="text-2xl font-bold text-gray-800">
          {editData ? "Update Personal" : "Add New Personal"}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">
            Full Name
          </label>
          <input
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">
            Email Address
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">
            Role
          </label>
          <input
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
            placeholder="e.g., Software Engineer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">
            Experience Level
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white cursor-pointer"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option>Intern</option>
            <option>Junior</option>
            <option>Mid-Level</option>
            <option>Senior</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-semibold text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 ${
            editData
              ? 'bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
              : 'bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
          }`}
        >
          {editData ? "Update Personal" : "Add Personal"}
        </button>

        {editData && (
          <button
            type="button"
            onClick={() => {
              setName("");
              setEmail("");
              setRole("");
              setLevel("Junior");
              clearEdit();
            }}
            className="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default AddPersonal;