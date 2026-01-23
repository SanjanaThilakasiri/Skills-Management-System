import { useEffect, useState } from "react";
import axios from "axios";

function ProjectSkills() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [skillsList, setSkillsList] = useState([]);
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [minProficiency, setMinProficiency] = useState("Beginner");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load all projects
  useEffect(() => {
    axios
      .get("http://localhost:5000/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Load all skills
  useEffect(() => {
    axios
      .get("http://localhost:5000/skills")
      .then((res) => setSkillsList(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Load required skills for selected project
  const loadRequiredSkills = async (projectId) => {
    if (!projectId) {
      setRequiredSkills([]);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/projects/${projectId}/skills`
      );
      setRequiredSkills(res.data);
    } catch (error) {
      console.error(error);
      setRequiredSkills([]);
    }
    setLoading(false);
  };

  // Handle project selection
  const handleProjectChange = (e) => {
    const projectId = e.target.value;
    setSelectedProject(projectId);
    setRequiredSkills([]);
    setMessage("");
    loadRequiredSkills(projectId);
  };

  // Assign skill to project
  const handleAssignSkill = async () => {
    if (!selectedProject || !selectedSkill) {
      setMessage("Select a Project and Skill first.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/projects/${selectedProject}/skills`,
        {
          skills_id: selectedSkill,
          min_proficiency: minProficiency,
        }
      );

      setMessage("Skill assigned successfully!");
      loadRequiredSkills(selectedProject);
    } catch (error) {
      console.error(error);
      setMessage("Failed to assign skill.");
    }
  };

  const getProficiencyBadge = (proficiency) => {
    const colors = {
      Expert: "bg-purple-100 text-purple-700 border-purple-200",
      Advanced: "bg-blue-100 text-blue-700 border-blue-200",
      Intermediate: "bg-emerald-100 text-emerald-700 border-emerald-200",
      Beginner: "bg-gray-100 text-gray-700 border-gray-200",
    };
    return colors[proficiency] || colors.Beginner;
  };

  const getCategoryBadge = (category) => {
    const colors = {
      Frontend: "bg-pink-100 text-pink-700 border-pink-200",
      Backend: "bg-indigo-100 text-indigo-700 border-indigo-200",
      DevOps: "bg-orange-100 text-orange-700 border-orange-200",
      Database: "bg-teal-100 text-teal-700 border-teal-200",
      Mobile: "bg-cyan-100 text-cyan-700 border-cyan-200",
    };
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="gap-3 mt-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-10 bg-blue-500 rounded-full"></div>
          <h1 className="text-3xl font-bold text-gray-800">Project Skills Management</h1>
        </div>
        <p className="text-gray-500 ml-4">Define required skills and proficiency levels for projects</p>
      </div>

      {/* Select Project */}
      <div className="mb-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
        <label className="text-sm font-semibold text-gray-700 block mb-3">
          Select Project
        </label>
        <div className="relative">
          <select
            className="w-full appearance-none px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white cursor-pointer font-medium text-gray-700"
            value={selectedProject}
            onChange={handleProjectChange}
          >
            <option value="">Choose a project to manage</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Assign Skill */}
      {selectedProject && (
        <div className="mb-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
            <h2 className="text-lg font-bold text-gray-800">Assign Required Skill</h2>
          </div>

          {message && (
            <div className={`mb-4 p-4 rounded-xl border-l-4 ${
              message.includes('success') 
                ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                : 'bg-amber-50 border-amber-500 text-amber-700'
            }`}>
              <p className="font-medium">{message}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5 space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Skill
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white cursor-pointer font-medium text-gray-700"
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                >
                  <option value="">Select skill</option>
                  {skillsList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.category})
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Minimum Proficiency
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white cursor-pointer font-medium text-gray-700"
                  value={minProficiency}
                  onChange={(e) => setMinProficiency(e.target.value)}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <label className="text-sm font-semibold text-transparent block select-none">
                Action
              </label>
              <button
                className="w-full px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                onClick={handleAssignSkill}
              >
                Assign Skill
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Required Skills Table */}
      {selectedProject && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800">Required Skills</h2>
          </div>

          {loading && (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-indigo-500 mb-4"></div>
              <p className="text-gray-600 font-medium">Loading skills</p>
            </div>
          )}

          {!loading && requiredSkills.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Skill Name</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Minimum Proficiency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {requiredSkills.map((skill) => (
                    <tr key={skill.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">{skill.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getCategoryBadge(skill.category)}`}>
                          {skill.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getProficiencyBadge(skill.min_proficiency)}`}>
                          {skill.min_proficiency}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && requiredSkills.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-gray-600 font-medium text-lg">No skills assigned yet</p>
              <p className="text-gray-400 text-sm mt-2">Start by assigning required skills for this project</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProjectSkills;