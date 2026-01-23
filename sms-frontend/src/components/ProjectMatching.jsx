import { useEffect, useState } from "react";
import axios from "axios";

function ProjectMatching() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load all projects
  useEffect(() => {
    axios
      .get("http://localhost:5000/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch matches for selected project
  const handleMatch = async () => {
    if (!selectedProject) return;

    setLoading(true);
    setMatches([]);

    try {
      const res = await axios.get(
        `http://localhost:5000/projects/${selectedProject}/match`
      );
      setMatches(res.data);
    } catch (err) {
      console.error(err);
      setMatches([]);
    }

    setLoading(false);
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return "text-emerald-600 bg-emerald-50";
    if (percentage >= 60) return "text-blue-600 bg-blue-50";
    if (percentage >= 40) return "text-amber-600 bg-amber-50";
    return "text-gray-600 bg-gray-50";
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

  return (
    <div className="gap-3 mt-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-10 bg-blue-500 rounded-full"></div>
          <h1 className="text-3xl font-bold text-gray-800">Project Skill Matching</h1>
        </div>
        <p className="text-gray-500 ml-4">Find the best talent for your projects</p>
      </div>

      {/* Select Project Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Select Project
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white cursor-pointer font-medium text-gray-700"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="">Choose a project</option>
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

          <button
            onClick={handleMatch}
            disabled={!selectedProject}
            className="px-8 py-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Find Matches
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-emerald-500 mb-4"></div>
          <p className="text-gray-600 font-medium">Finding the best matches</p>
        </div>
      )}

      {/* Matches Table */}
      {!loading && matches.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Team Member</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Matched Skills</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Proficiency</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Match Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {matches.map((m, idx) => (
                  <tr key={m.personal_id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">{m.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
                        {m.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {m.skills.map((s, i) => (
                          <span
                            key={i}
                            className="inline-flex px-3 py-1 rounded-lg text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-100"
                          >
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {m.skills.map((s, i) => (
                          <span
                            key={i}
                            className={`inline-flex px-3 py-1 rounded-lg text-sm font-medium border ${getProficiencyBadge(s.proficiency)}`}
                          >
                            {s.proficiency}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <span className={`inline-flex items-center justify-center w-16 h-16 rounded-xl text-xl font-bold border-2 ${getMatchColor(m.match_percentage)}`}>
                          {m.match_percentage}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* No Matches */}
      {!loading && selectedProject && matches.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium text-lg">No matches found for this project</p>
          <p className="text-gray-400 text-sm mt-2">Try selecting a different project or add more team members with relevant skills</p>
        </div>
      )}
    </div>
  );
}

export default ProjectMatching;