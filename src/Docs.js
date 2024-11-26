import React from "react";
import './Docs.css';

function Docs() {
  return (
    <div className="docs">
      <h2>Application Documentation</h2>

      <section>
        <h3>Application Description</h3>
        <p>The application allows users to search for Pokémon, view details, sort results, and display different versions (normal and shiny) of each Pokémon. It is built with several components enabling interaction with API data.</p>
      </section>

      <section>
        <h3>Application Components</h3>
        <ul>
          <li><strong>App</strong>: The main application component, containing routing and managing navigation between pages (search and documentation).</li>
          <li><strong>Items</strong>: The component responsible for searching Pokémon, sorting them, and displaying results.</li>
          <li><strong>Docs</strong>: The component that displays the application's documentation, like this page.</li>
          <li><strong>Loading</strong>: A component that shows a loading animation while data is being fetched from the API.</li>
          <li><strong>PokemonDetail</strong>: Displays details of a specific Pokémon after clicking on a search result.</li>
        </ul>
      </section>

      <section>
        <h3>Application Features</h3>
        <ul>
          <li><strong>Search:</strong> Users can search for Pokémon by name or ID number.</li>
          <li><strong>Shiny Pokémon:</strong> Users can toggle Pokémon versions to shiny to see visual differences.</li>
          <li><strong>Details:</strong> After clicking on a result, the user is taken to a page with details of the specific Pokémon, including information about its moves and shiny version.</li>
        </ul>
      </section>

      <section>
        <h3>User Guide</h3>
        <ol>
          <li>Install dependencies using the command: <code>npm install</code>.</li>
          <li>Run the application locally using the command: <code>npm start</code>.</li>
          <li>Use the search bar to find a Pokémon by name or ID number.</li>
          <li>After finding a Pokémon, click on its name to view details.</li>
          <li>You can toggle the Pokémon's version to shiny by clicking the appropriate button.</li>
        </ol>
      </section>

      <section>
        <h3>Troubleshooting</h3>
        <ul>
          <li><strong>No search results:</strong> Ensure you have entered a correct Pokémon name or ID number.</li>
          <li><strong>Issues connecting to the API:</strong> Check your internet connection. If the problem persists, verify the availability of <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">PokéAPI</a>.</li>
          <li><strong>Problem displaying Pokémon image:</strong> If the image doesn't load, check if you have an active internet connection.</li>
        </ul>
      </section>

      <section>
        <h3>Data Sources</h3>
        <p>All Pokémon data is sourced from <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">PokéAPI</a>, which provides Pokémon information in JSON format.</p>
      </section>
    </div>
  );
}

export default Docs;
