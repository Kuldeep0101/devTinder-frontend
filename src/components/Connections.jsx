import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  // Pagination state
  const [visibleCount, setVisibleCount] = useState(6);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;
  if (connections.length === 0) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        No connections found!!
      </h1>
    );
  }

  return (
    <div className="px-6 py-10">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 tracking-tight">
        My Connections
      </h1>

      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {connections.slice(0, visibleCount).map((connection, idx) => {
          const { firstName, lastName, photoUrl, age, gender, about, skills } =
            connection;

          return (
            <div
              key={idx}
              className="card bg-white w-80 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300"
            >
              {/* User photo */}
              <figure className="flex justify-center pt-8">
                <img
                  src={
                    photoUrl ||
                    "https://placehold.co/150x150/e2e8f0/000000?text=User"
                  }
                  alt={`${firstName}'s profile photo`}
                  className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-md"
                />
              </figure>

              {/* Card body */}
              <div className="card-body p-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {`${firstName} ${lastName}`}
                </h2>

                <p className="text-gray-600 text-sm mb-3">
                  {about || "No description available."}
                </p>

                <p className="text-gray-500 text-sm mb-4">
                  {age ? `${age}, ${gender}` : gender}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap justify-center gap-2">
                  {Array.isArray(skills) &&
                    skills.map((skill, i) => (
                      <span
                        key={i}
                        className="badge badge-outline bg-blue-100 text-blue-800 border-blue-200 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              </div>

              {/* Buttons */}
              <button>send message</button>
              <button>video call</button>
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      {visibleCount < connections.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Connections;
