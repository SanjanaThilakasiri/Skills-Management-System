import { useEffect, useState } from "react";
import axios from "axios";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [editSkill, setEditSkill] = useState(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const fetchSkills = () => {
    axios
      .get("http://localhost:5000/skills")
      .then((res) => setSkills(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { name, category, description };

    if (editSkill) {
      // UPDATE
      axios
        .put(`http://localhost:5000/skills/${editSkill.id}`, data)
        .then(() => {
          fetchSkills();
          clearForm();
        })
        .catch(() => alert("Update failed"));
    } else {
      // CREATE
      axios
        .post("http://localhost:5000/skills", data)
        .then(() => {
          fetchSkills();
          clearForm();
        })
        .catch(() => alert("Add failed"));
    }
  };

  const clearForm = () => {
    setName("");
    setCategory("");
    setDescription("");
    setEditSkill(null);
  };

  const handleEdit = (skill) => {
    setEditSkill(skill);
    setName(skill.name);
    setCategory(skill.category);
    setDescription(skill.description);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this skill?")) return;

    axios
      .delete(`http://localhost:5000/skills/${id}`)
      .then(() => fetchSkills())
      .catch(() => alert("Delete failed"));
  };

  const getCategoryBadge = (category) => {
    const colors = {
      Frontend: "bg-pink-100 text-pink-700 border-pink-200",
      Backend: "bg-indigo-100 text-indigo-700 border-indigo-200",
      DevOps: "bg-orange-100 text-orange-700 border-orange-200",
      Database: "bg-teal-100 text-teal-700 border-teal-200",
      Mobile: "bg-cyan-100 text-cyan-700 border-cyan-200",
      Design: "bg-purple-100 text-purple-700 border-purple-200",
      Testing: "bg-emerald-100 text-emerald-700 border-emerald-200",
    };
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="gap-3 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-10 bg-blue-500 rounded-full"></div>
          <h2 className="text-3xl font-bold text-gray-800">Skills Management</h2>
        </div>
        <p className="text-gray-500 ml-4">Manage your organization's skill inventory</p>
      </div>

      {/* FORM */}
      <div className="mb-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-1 h-8 rounded-full ${editSkill ? 'bg-amber-500' : 'bg-blue-500 '}`}></div>
          <h3 className="text-xl font-bold text-gray-800">
            {editSkill ? "Update Skill" : "Add New Skill"}
          </h3>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Skill Name
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                placeholder="React, Python, AWS"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Category
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                placeholder="Frontend, Backend, DevOps"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Description
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
              placeholder="Brief description of the skill"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              onClick={handleSubmit}
              className={`flex-1 md:flex-none px-8 py-3 rounded-xl font-semibold text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 ${
                editSkill
                  ? 'bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                  : 'bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
              }`}
            >
              {editSkill ? "Update Skill" : "Add Skill"}
            </button>

            {editSkill && (
              <button
                type="button"
                onClick={clearForm}
                className="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Skill Name</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Category</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Description</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {skills.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-800">{s.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getCategoryBadge(s.category)}`}>
                      {s.category || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-600 text-sm max-w-md">{s.description || 'No description'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(s)}
                        className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors duration-200 shadow-sm hover:shadow"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors duration-200 shadow-sm hover:shadow"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {skills.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium text-lg">No skills added yet</p>
                    <p className="text-gray-400 text-sm mt-2">Start building your skill inventory by adding skills above</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Skills;