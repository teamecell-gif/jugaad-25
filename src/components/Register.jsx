import { useState } from "react";
import "./style.css"; // Ensure this file exists
import axios from "axios"; // Import Axios

function Register() {
  const [isTeam, setIsTeam] = useState(false);
  const [teamLeaderName, setTeamLeaderName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [teamName, setTeamName] = useState("");
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [teamSize, setTeamSize] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(true);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  function handleTeamSizeChange(event) {
    setTeamSize(event.target.value);
  }

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

  const handleOptionChange = (e) => {
    setIsTeam(e.target.value === "team");
    if (e.target.value !== "team") setTeamSize("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const userData = {
        teamName,
        teamSize: isTeam ? teamSize : "1",
        teamLeaderName,
        email,
        phoneNumber,
      };

      if (isTeam) {
        for (let i = 0; i < parseInt(teamSize) - 1; i++) {
          const teamMemberInput = document.getElementById(`teamMember${i + 1}`);
          if (!teamMemberInput.value) {
            throw new Error(`Team member ${i + 1} name is required`);
          }
        }
        for (let i = 0; i < parseInt(teamSize) - 1; i++) {
          userData[`teamMember${i + 1}`] = document.getElementById(
            `teamMember${i + 1}`
          ).value;
        }
      }

      const response = await axios.post(
        "https://jugaad-backend-kn8m.onrender.com/api/register",
        userData
      );

      console.log("Registration successful:", response.data);
      setRegistrationSuccess(true);
    } catch (error) {
      setErrorMsg(false);
      if (error.response && error.response.status === 400) {
        setErrorMsg(false);
        console.error("Error registering user:", error.response.data.error);
      } else {
        setErrorMsg(false);
        console.error("Error registering user:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  function renderTeamInputs() {
    const inputs = [];
    for (let i = 0; i < parseInt(teamSize) - 1; i++) {
      inputs.push(
        <div className="flex flex-col mb-2" key={i}>
          <label className="mb-1 text-white">Team Member {i + 1}</label>
          <input
            type="text"
            id={`teamMember${i + 1}`}
            name={`teamMember${i + 1}`}
            className="border border-white/30 bg-white/20 text-white placeholder-white/70 rounded px-2 py-1 focus:outline-none"
          />
        </div>
      );
    }
    return inputs;
  }

  /* ---------------- SUCCESS SCREEN ---------------- */
  /* ---------------- SUCCESS SCREEN ---------------- */
  if (registrationSuccess) {
    return (
      <div
        id="register"  // <--- Added this ID so your background image loads!
        className="min-h-screen w-full flex items-center justify-center bg-transparent py-10"
      >
        {/* Same Glassmorphism Card Style as the Form */}
        <div className="flex flex-col w-full max-w-[450px] bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-10 shadow-xl text-white text-center">
          
          <h2 className="text-3xl font-bold mb-4">
            Registration Successful!
          </h2>
          
          <p className="text-xl font-medium opacity-90">
            See you on 14th Feb
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-8 border border-white/40 py-2 px-6 rounded font-semibold hover:bg-white hover:text-black transition-colors duration-300"
          >
            Register Another
          </button>
          
        </div>
      </div>
    );
  }

  /* ---------------- FORM SCREEN ---------------- */
  return (
    <form
      id="register"
      onSubmit={handleSubmit}
      className="min-h-screen w-full flex items-center justify-center bg-transparent py-10"
    >
      <div className="flex flex-col w-full max-w-[450px] bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-xl text-white">
        <h1 className="font-bold text-5xl text-center mb-6">Register Here</h1>

        {/* TYPE SELECTION */}
        <div className="flex justify-center mb-4">
          <label className="mx-4 flex items-center cursor-pointer">
            <input
              type="radio"
              name="registrationType"
              value="individual"
              checked={!isTeam}
              onChange={handleOptionChange}
              className="mr-2 accent-[#ff4655]" // Valorant Red Accent
            />
            Individual
          </label>

          <label className="mx-4 flex items-center cursor-pointer">
            <input
              type="radio"
              name="registrationType"
              value="team"
              checked={isTeam}
              onChange={handleOptionChange}
              className="mr-2 accent-[#ff4655]" // Valorant Red Accent
            />
            Team
          </label>
        </div>

        {/* TEAM SIZE SELECTOR */}
        {isTeam && (
          <div className="flex flex-col mb-2">
            <label className="mb-1">Team Size</label>
            <select
              name="teamSize"
              className="border border-white/30 bg-white/20 text-white rounded px-2 py-1 mb-2 focus:outline-none [&>option]:text-black"
              value={teamSize}
              onChange={handleTeamSizeChange}
            >
              <option value="">Choose team size</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        )}

        {/* INPUT FIELDS */}
        <div className="flex flex-col mb-4">
          <label htmlFor="teamName" className="mb-1">
            Team Name
          </label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="border border-white/30 bg-white/20 text-white placeholder-white/70 rounded px-2 py-1 mb-2 focus:outline-none"
          />

          <label htmlFor="teamLeaderName" className="mb-1">
            {isTeam ? "Team Leader Name" : "Name"}
          </label>
          <input
            type="text"
            id="teamLeaderName"
            name="teamLeaderName"
            value={teamLeaderName}
            onChange={(e) => setTeamLeaderName(e.target.value)}
            className="border border-white/30 bg-white/20 text-white placeholder-white/70 rounded px-2 py-1 mb-2 focus:outline-none"
          />

          {teamSize && renderTeamInputs()}

          <label htmlFor="phoneNumber" className="mb-1">
            Phone Number
          </label>
          <input
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border border-white/30 bg-white/20 text-white placeholder-white/70 rounded px-2 py-1 mb-2 focus:outline-none"
          />

          <label htmlFor="email" className="mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-white/30 bg-white/20 text-white placeholder-white/70 rounded px-2 py-1 mb-2 focus:outline-none"
          />
        </div>

        {/* CHECKBOX */}
        <label className="mb-3 flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="mr-2 accent-[#ff4655]" // Valorant Red Accent
          />
          I agree to the terms and conditions mentioned in the Rule Book
        </label>

        {!errorMsg && (
          <div className="text-red-300 mb-2 text-center bg-red-900/20 rounded p-1">
            Team name and email should be unique
          </div>
        )}

        {/* --- VALORANT STYLE BUTTON --- */}
        <button
          type="submit"
          disabled={!isChecked || isLoading}
          // The 'group' class is essential for the hover effect
          className="group relative w-full mt-4 py-3 bg-transparent border border-[#ff4655] text-white font-bold uppercase tracking-widest overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-500"
        >
          {/* Sliding Background Element */}
          <span className="absolute inset-0 bg-[#ff4655] -translate-x-[105%] skew-x-[-20deg] group-hover:translate-x-0 transition-transform duration-300 ease-out origin-left scale-150"></span>

          {/* Text Content (Relative to sit above the slide) */}
          <span className="relative z-10 drop-shadow-md">
            {isLoading ? "Loading..." : "Register"}
          </span>
        </button>
      </div>
    </form>
  );
}

export default Register;