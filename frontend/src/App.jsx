import Navbar from "./components/Navbar/Navbar"
import React from "react";
function App() {
  return (
    <div>
      {/* Navbar Component */}
      <Navbar />

      {/* Other Content */}
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold">Welcome to amerhealth</h1>
        <p className="mt-4">
          This is the main content of the application. Navigate using the
          Navbar above.
        </p>
      </div>
    </div>
  );
}

export default App;