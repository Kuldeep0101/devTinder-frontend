import React from 'react';

// This is a self-contained component for a user profile card.
const UserCards = ({ user }) => {
    // Check if the user object is valid before attempting to render.
    // This prevents the component from crashing if the data is not yet available.
    if (!user) {
        return null;
    }

    // Safely destructure the user object to access its properties.
    const { firstName, lastName, age, gender, photoUrl, about, skills } = user;

    return (
        // The main container is now a flexbox that handles the black background
        // and moves the card higher on the screen using 'items-start' and 'pt-16'.
        <div className="flex justify-center items-start pt-16 min-h-screen ">
            {/* Main card container with enhanced styling */}
            <div className="card bg-white w-96 rounded-2xl shadow-xl border border-gray-200">

                {/* User photo section */}
                <figure className="flex justify-center pt-8">
                    <img
                        src={photoUrl || 'https://placehold.co/150x150/e2e8f0/000000?text=User'}
                        alt={`${firstName}'s profile photo`}
                        className="rounded-full w-36 h-36 object-cover border-4 border-white shadow-md"
                    />
                </figure>

                {/* Card body content */}
                <div className="card-body p-6 text-center">

                    {/* User's name */}
                    <h1 className="card-title text-3xl font-bold text-gray-800 justify-center mb-2">
                        {`${firstName} ${lastName}`}
                    </h1>

                    {/* About section with mono font */}
                    <p className="text-gray-600 font-mono text-sm mb-0">
                        {about || 'No description available.'}
                    </p>

                    {/* Age and gender, now centered and styled */}
                    <div className="flex justify-center text-gray-500 mb-4">
                        <p>{`${age}, ${gender}`}</p>
                    </div>

                    {/* Skills badges, with a flexbox layout for spacing */}
                    <div className="flex flex-wrap justify-center gap-2 mb-2">
                        {skills && skills[0] && <div className="badge badge-outline bg-blue-100 text-blue-800 border-blue-200 p-3 rounded-full font-medium">{skills[0]}</div>}
                        {skills && skills[1] && <div className="badge badge-outline bg-green-100 text-green-800 border-green-200 p-3 rounded-full font-medium">{skills[1]}</div>}
                        {skills && skills[2] && <div className="badge badge-outline bg-purple-100 text-purple-800 border-purple-200 p-3 rounded-full font-medium">{skills[2]}</div>}
                        {skills && skills[3] && <div className="badge badge-outline bg-yellow-100 text-yellow-800 border-yellow-200 p-3 rounded-full font-medium">{skills[3]}</div>}
                        {skills && skills[4] && <div className="badge badge-outline bg-red-100 text-red-800 border-red-200 p-3 rounded-full font-medium">{skills[4]}</div>}
                    </div>
                </div>

                {/* Action buttons section */}
                <div className="flex justify-evenly p-6 border-t border-gray-200">
                    <button className="btn btn-outline btn-success flex-1 mx-2 rounded-full font-semibold transition-all duration-300 hover:scale-105">Interested</button>
                    <button className="btn btn-outline btn-warning flex-1 mx-2 rounded-full font-semibold transition-all duration-300 hover:scale-105">Ignore</button>
                   
                </div>
            </div>
        </div>
    );
};

export default UserCards;
