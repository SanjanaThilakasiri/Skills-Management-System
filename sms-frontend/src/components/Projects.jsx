import { useEffect, useState } from "react";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    status: "Planning",
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  // Load all projects
  const loadProjects = () => {
    axios
      .get("http://localhost:5000/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle create or update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // Update project
      axios
        .put(`http://localhost:5000/projects/${editingId}`, form)
        .then(() => {
          setMessage("Project updated successfully!");
          setForm({
            name: "",
            description: "",
            start_date: "",
            end_date: "",
            status: "Planning",
          });
          setEditingId(null);
          loadProjects();
        })
        .catch((err) => {
          console.error(err);
          setMessage("Failed to update project.");
        });
    } else {
      // Create new project
      axios
        .post("http://localhost:5000/projects", form)
        .then(() => {
          setMessage("Project created successfully!");
          setForm({
            name: "",
            description: "",
            start_date: "",
            end_date: "",
            status: "Planning",
          });
          loadProjects();
        })
        .catch((err) => {
          console.error(err);
          setMessage("Failed to create project.");
        });
    }
  };

  // Handle edit
  const handleEdit = (project) => {
    setForm({
      name: project.name,
      description: project.description,
      start_date: project.start_date?.split("T")[0] || "",
      end_date: project.end_date?.split("T")[0] || "",
      status: project.status,
    });
    setEditingId(project.id);
    setMessage("");
  };

  // Handle delete
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    axios
      .delete(`http://localhost:5000/projects/${id}`)
      .then(() => {
        setMessage("Project deleted successfully!");
        loadProjects();
      })
      .catch((err) => {
        console.error(err);
        setMessage("Failed to delete project.");
      });
  };

  const getStatusBadge = (status) => {
    const styles = {
      Planning: "bg-blue-100 text-blue-700 border-blue-200",
      Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
      Completed: "bg-purple-100 text-purple-700 border-purple-200",
    };
    return styles[status] || styles.Planning;
  };

  return (
    <div className="gap-3 mt-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-10 bg-blue-500 rounded-full"></div>
          <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
        </div>
        <p className="text-gray-500 ml-4">Manage your project portfolio</p>
      </div>

      {/* Form */}
      <div className="mb-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-1 h-8 rounded-full ${editingId ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
          <h2 className="text-xl font-bold text-gray-800">
            {editingId ? "Edit Project" : "Create New Project"}
          </h2>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-xl border-l-4 ${
            message.includes('success') 
              ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
              : 'bg-red-50 border-red-500 text-red-700'
          }`}>
            <p className="font-medium">{message}</p>
          </div>
        )}

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Project Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter project name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Project description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Project Status
            </label>
            <div className="relative">
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full appearance-none px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white cursor-pointer font-medium text-gray-700"
              >
                <option value="Planning">Planning</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              onClick={handleSubmit}
              className={`flex-1 md:flex-none px-8 py-3 rounded-xl font-semibold text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 ${
                editingId
                  ? 'bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                  : 'bg-linear-to-r from-blue-500 to-blue-500 hover:from-blue-600 hover:to-blue-600'
              }`}
            >
              {editingId ? "Update Project" : "Create Project"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setForm({
                    name: "",
                    description: "",
                    start_date: "",
                    end_date: "",
                    status: "Planning",
                  });
                  setEditingId(null);
                  setMessage("");
                }}
                className="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Project Name</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Description</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Start Date</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">End Date</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-800">{project.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-600 text-sm max-w-xs truncate">{project.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-600 text-sm">{project.start_date || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-600 text-sm">{project.end_date || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(project.status)}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors duration-200 shadow-sm hover:shadow"
                        onClick={() => handleEdit(project)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors duration-200 shadow-sm hover:shadow"
                        onClick={() => handleDelete(project.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {projects.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium text-lg">No projects yet</p>
                    <p className="text-gray-400 text-sm mt-2">Create your first project to get started</p>
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

export default Projects;