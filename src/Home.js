import React from "react";
import './Home.css';

function Home() {
  return (
    <div className="home">
      <h2>Welcome to the Pokémon Search App</h2>
      <p>Use the Search tab to find Pokémon and view their details.</p>
      <div className="corner top-left"></div>
      <div className="corner top-right"></div>
      <div className="corner bottom-left"></div>
      <div className="corner bottom-right"></div>
    </div>
  );
}

export default Home;
