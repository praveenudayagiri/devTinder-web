import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-6">
      {/* Hero Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          About DevTinder
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          DevTinder is a unique platform where <b>developers</b> can connect with
          each other just like Tinder – but for collaboration, networking, and
          growth. 🚀 Whether you’re looking for teammates, mentors, or just
          like-minded coders, DevTinder helps you find and connect instantly.
        </p>
      </div>

      {/* Info Section */}
      <div className="grid gap-6 mt-10 md:grid-cols-3 w-full max-w-5xl">
        {/* Card 1 */}
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
          <div className="card-body">
            <h2 className="card-title text-secondary">👨‍💻 Connect</h2>
            <p>
              Meet developers from around the world, match with those who share
              similar interests, and build meaningful tech connections.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
          <div className="card-body">
            <h2 className="card-title text-secondary">🚀 Build</h2>
            <p>
              Collaborate on exciting projects, share ideas, and turn your
              vision into reality with talented teammates.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
          <div className="card-body">
            <h2 className="card-title text-secondary">🎯 Grow</h2>
            <p>
              Learn new skills, expand your network, and grow as a developer
              while contributing to a vibrant community.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="mt-12 text-center">
        <p className="italic text-gray-400 text-lg">
          "DevTinder – Where developers connect, build, and grow together." 🌐
        </p>
      </div>
    </div>
  );
};

export default About;
