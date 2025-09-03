import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from '../utils/requestSlice'

function Requests() {
    const dispatch = useDispatch()
    const requests = useSelector((store) => store.requests)
    const fetchRequests = async () => {
        const res = await axios.get(BASE_URL + "/user/request/received", { withCredentials: true })
        dispatch(addRequest(res.data.data))
    }

    useEffect(() => {
        fetchRequests()
    }, [])

    if (!fetchRequests) {
        return null
    }

    // if (fetchRequests.length === 0) {
    //     return <h1 className="text-center text-2xl font-bold mt-10">No requests found!!</h1>;
    // }


    return (
        <div className="px-6 py-10">
            {/* Heading */}
            <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 tracking-tight">
                My Requests
            </h1>

            {/* Grid container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {requests.slice(0).map((connection, idx) => {

                    const {_id, firstName, lastName, photoUrl, age, gender, about, skills } = connection.fromUserId;


                    return (
                        <div
                            key={_id}
                            className="card bg-white w-80 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300"
                        >
                            {/* User photo */}
                            <figure className="flex justify-center pt-8">
                                <img
                                    src={photoUrl || 'https://placehold.co/150x150/e2e8f0/000000?text=User'}
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
                                    {about || 'No description available.'}
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

                            <div className="flex justify-evenly p-6 border-t border-gray-200">
                                <button className="btn btn-outline btn-success flex-1 mx-2 rounded-full font-semibold transition-all duration-300 hover:scale-105">Accept</button>
                                <button className="btn btn-outline btn-warning flex-1 mx-2 rounded-full font-semibold transition-all duration-300 hover:scale-105">Reject</button>

                            </div>

                        </div>
                    );
                })
                }

            </div>

            {/* Load More Button */}
           (
                <div className="flex justify-center mt-10">
                    <button
                        // onClick={() => setVisibleCount(prev => prev + 6)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300"
                    >
                        Load More
                    </button>
                </div>
            )
        </div>
    );
}

export default Requests
