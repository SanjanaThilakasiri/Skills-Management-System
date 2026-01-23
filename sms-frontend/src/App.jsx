import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import AddPersonal from "./components/AddPersonal";
import Skills from "./components/Skills";
import AssignSkills from "./components/AssignSkills";
import PersonalSkills from "./components/PersonalSkills";
import Projects from "./components/Projects";
import ProjectSkills from "./components/ProjectSkills";
import ProjectMatching from "./components/ProjectMatching";

function App() {
  const [personalList, setPersonalList] = useState([]);
  const [editPersonal, setEditPersonal] = useState(null);

  const fetchPersonal = () => {
    axios
      .get("http://localhost:5000/personal")
      .then((res) => setPersonalList(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchPersonal();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this personal?")) return;

    axios
      .delete(`http://localhost:5000/personal/${id}`)
      .then(() => fetchPersonal())
      .catch(() => alert("Delete failed"));
  };

  const getExperienceBadge = (level) => {
    const colors = {
      Senior: "bg-purple-100 text-purple-700 border-purple-200",
      "Mid-Level": "bg-blue-100 text-blue-700 border-blue-200",
      Junior: "bg-emerald-100 text-emerald-700 border-emerald-200",
      Intern: "bg-gray-100 text-gray-700 border-gray-200",
    };
    return colors[level] || colors.Junior;
  };

  return (
    <>
      <Navbar />

      <div className="p-8 max-w-7xl mx-auto">
        <AddPersonal
          onAdd={fetchPersonal}
          editData={editPersonal}
          clearEdit={() => setEditPersonal(null)}
        />

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-10 g-linear-to-b from-rose-500 to-pink-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-800">Team Directory</h2>
          </div>
          <p className="text-gray-500 ml-4">Manage your team members and their information</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Experience Level</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {personalList.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold shadow-sm">
                          {p.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-gray-800">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-600 text-sm">{p.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
                        {p.role || 'No role'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getExperienceBadge(p.experience_level)}`}>
                        {p.experience_level}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => setEditPersonal(p)}
                          className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors duration-200 shadow-sm hover:shadow"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(p.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors duration-200 shadow-sm hover:shadow"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {personalList.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 font-medium text-lg">No team members yet</p>
                      <p className="text-gray-400 text-sm mt-2">Add your first team member to get started</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <Skills />
        <AssignSkills /> 
        <PersonalSkills />
        <Projects />
        <ProjectSkills />
        <ProjectMatching />
      </div>
    </>
  );
}

export default App;