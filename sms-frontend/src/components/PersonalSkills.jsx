import { useEffect, useState } from "react";
import axios from "axios";

function PersonalSkills() {
  const [personalList, setPersonalList] = useState([]);
  const [selectedPersonal, setSelectedPersonal] = useState("");
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load Personal list
  useEffect(() => {
    axios.get("http://localhost:5000/personal")
      .then(res => setPersonalList(res.data))
      .catch(err => console.error(err));
  }, []);

  // Load skills for selected Personal
  const loadSkills = async (personalId) => {
    if (!personalId) {
      setSkills([]);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/personal/${personalId}/skills`
      );
      setSkills(res.data);
    } catch (error) {
      console.error(error);
      setSkills([]);
    }
    setLoading(false);
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
      Design: "bg-purple-100 text-purple-700 border-purple-200",
      Testing: "bg-emerald-100 text-emerald-700 border-emerald-200",
    };
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const selectedPersonalData = personalList.find(p => p.id === parseInt(selectedPersonal));

  return (
    <div className="gap-3 mt-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-10 bg-blue-500 rounded-full"></div>
          <h1 className="text-3xl font-bold text-gray-800">Team Member Skills</h1>
        </div>
        <p className="text-gray-500 ml-4">View skills and proficiency levels for team members</p>
      </div>

      {/* Select Personal */}
      <div className="mb-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
        <label className="text-sm font-semibold text-gray-700 block mb-3">
          Select Team Member
        </label>
        <div className="relative">
          <select
            className="w-full appearance-none px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white cursor-pointer font-medium text-gray-700"
            value={selectedPersonal}
            onChange={(e) => {
              setSelectedPersonal(e.target.value);
              loadSkills(e.target.value);
            }}
          >
            <option value="">Choose a team member...</option>
            {personalList.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} - {p.role || 'No role'}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {selectedPersonalData && (
          <div className="mt-4 p-4 bg-linear-to-r from-violet-50 to-fuchsia-50 rounded-xl border border-violet-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                {selectedPersonalData.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{selectedPersonalData.name}</h3>
                <p className="text-sm text-gray-600">{selectedPersonalData.role || 'No role assigned'} • {selectedPersonalData.experience_level || 'No level'}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-violet-500 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading skills...</p>
        </div>
      )}

      {/* Skills Table */}
      {!loading && skills.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800">Skill Portfolio</h2>
            <p className="text-sm text-gray-600 mt-1">{skills.length} skill{skills.length !== 1 ? 's' : ''} assigned</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Skill Name</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Proficiency Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {skills.map(skill => (
                  <tr key={skill.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                        <span className="font-semibold text-gray-800">{skill.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getCategoryBadge(skill.category)}`}>
                        {skill.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getProficiencyBadge(skill.proficiency)}`}>
                        {skill.proficiency}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* No skills */}
      {!loading && selectedPersonal && skills.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-linear-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium text-lg">No skills assigned yet</p>
          <p className="text-gray-400 text-sm mt-2">This team member hasn't been assigned any skills</p>
        </div>
      )}
    </div>
  );
}

export default PersonalSkills;