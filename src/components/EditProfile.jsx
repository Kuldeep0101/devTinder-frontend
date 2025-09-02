import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCards from "./UserCards";

const EditProfile = ({ user }) => {
  if (!user) return null;

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || "");
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    // e.preventDefault()
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, skills, photoUrl },
        { withCredentials: true }
      );
      console.log(res.data.data);
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.log(error.response.data);
      const message = error?.response?.data || "Updation Failed";
      setError(message.toString());
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-center">
          {error ? (
            <div className="alert alert-error">
              <span>Error: {error}</span>
            </div>
          ) : (
            <div className="alert alert-success">
              <span>Profile updated successfully.</span>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-center ">
        <div className=" flex justify-center items-center mx-5 ">
          <div className="bg-gray-800/90 p-4 rounded-lg shadow-xl w-full max-w-sm">
            <h2 className="text-white text-xl font-semibold mb-3 text-center tracking-tight">
              Edit Profile
            </h2>

            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-gray-300 mb-1 text-sm"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="input input-sm w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-gray-300 mb-1 text-sm"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                //   required
                  className="input input-sm w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="age"
                    className="block text-gray-300 mb-1 text-sm"
                  >
                    Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    max={100}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input input-sm w-full bg-gray-700 border border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-gray-300 mb-1 text-sm"
                  >
                    Gender
                  </label>

                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="photoUrl"
                  className="block text-gray-300 mb-1 text-sm"
                >
                  Photo URL
                </label>
                <input
                  id="photoUrl"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input input-sm w-full bg-gray-700 border border-gray-600 text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="about"
                  className="block text-gray-300 mb-1 text-sm"
                >
                  About
                </label>
                <textarea
                  id="about"
                  rows={2}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="textarea textarea-sm w-full bg-gray-700 border border-gray-600 text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="skills"
                  className="block text-gray-300 mb-1 text-sm"
                >
                  Skills
                </label>
                <input
                  id="skills"
                  value={Array.isArray(skills) ? skills.join(", ") : skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="input input-sm w-full bg-gray-700 border border-gray-600 text-white"
                />
              </div>

              <button
                onClick={saveProfile}
                type="submit"
                className="btn btn-primary btn-sm w-full"
              >
                Update
              </button>
            </form>
          </div>
        </div>

        <UserCards
          user={{ firstName, lastName, age, gender, about, skills, photoUrl }}
        />
      </div>
    </>
  );
};

export default EditProfile;
