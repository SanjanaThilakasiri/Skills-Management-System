import { useEffect, useState } from "react";
import axios from "axios";

function AssignSkills() {
  const [personal, setPersonal] = useState([]);
  const [skills, setSkills] = useState([]);

  const [personalId, setPersonalId] = useState("");
  const [skillId, setSkillId] = useState("");
  const [proficiency, setProficiency] = useState("Beginner");

  const [message, setMessage] = useState("");

  // Load Personal
  useEffect(() => {
    axios.get("http://localhost:5000/personal")
      .then(res => setPersonal(res.data))
      .catch(err => console.error(err));
  }, []);

  // Load Skills
  useEffect(() => {
    axios.get("http://localhost:5000/skills")
      .then(res => setSkills(res.data))
      .catch(err => console.error(err));
  }, []);

  // Assign Skill
  const assignSkill = async () => {
    setMessage("");

    if (!personalId || !skillId) {
      setMessage("Please select Personal and Skill");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/personal/${personalId}/skills`,
        {
          skills_id: skillId,
          proficiency: proficiency
        }
      );

      setMessage("Skill assigned successfully ✅");
      setSkillId("");
      setProficiency("Beginner");
    } catch (error) {
      console.error(error);
      setMessage("Failed to assign skill ❌");
    }
  };

  return (
    <div className="gap-3 mt-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-10 bg-blue-500 rounded-full"></div>
          <h1 className="text-3xl font-bold text-gray-800">Assign Skills</h1>
        </div>
        <p className="text-gray-500 ml-4">Connect team members with their expertise</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-xl border-l-4 ${
          message.includes('✅') 
            ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
            : 'bg-red-50 border-red-500 text-red-700'
        } animate-pulse`}>
          <p className="font-medium">{message}</p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

          {/* Personal */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Team Member
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white cursor-pointer font-medium text-gray-700"
                value={personalId}
                onChange={(e) => setPersonalId(e.target.value)}
              >
                <option value="">Select member</option>
                {personal.map(p => (
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

          {/* Skill */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Skill
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white cursor-pointer font-medium text-gray-700"
                value={skillId}
                onChange={(e) => setSkillId(e.target.value)}
              >
                <option value="">Select skill...</option>
                {skills.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name}
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

          {/* Proficiency */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Proficiency Level
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white cursor-pointer font-medium text-gray-700"
                value={proficiency}
                onChange={(e) => setProficiency(e.target.value)}
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

          {/* Button */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-transparent block select-none">
              Action
            </label>
            <button
              onClick={assignSkill}
              className="w-full px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 "
            >
              Assign Skill
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AssignSkills;