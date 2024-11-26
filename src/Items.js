import React, { useState, useEffect } from "react";
import './Items.css';
import Loading from "./Loading.js";

function Items() {
    const [searchQuery, setSearchQuery] = useState("");
    const [items, setItems] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [error, setError] = useState(null);
    const [isShiny, setIsShiny] = useState(false);
    const [sortOption, setSortOption] = useState("name");
    const [typeOptions, setTypeOptions] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/type");
                const data = await response.json();
                setTypeOptions(data.results.map((type) => type.name));
            } catch (err) {
                console.error("Error fetching types:", err);
            }
        };
        fetchTypes();
    }, []);

    const handleSearch = async () => {
        setError(null);
        setIsShiny(false);
        setItems([]);
        setIsLoading(true);

        try {
            const filteredItems = await fetchFilteredItems();
            setItems(sortItems(filteredItems));
        } catch (err) {
            console.error("Error during search:", err);
            setError("Wystąpił błąd podczas ładowania danych");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchFilteredItems = async () => {
        let fetchedItems = [];
        if (selectedTypes.length) {
            fetchedItems = await fetchPokemonsByTypes(selectedTypes);
        } else {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
            const data = await response.json();
            fetchedItems = data.results;
        }
        return fetchedItems.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pokemon.url.split('/').slice(-2, -1)[0] === searchQuery
        );
    };

    const fetchPokemonsByTypes = async (types) => {
        const promises = types.map(type =>
            fetch(`https://pokeapi.co/api/v2/type/${type}`)
                .then(res => res.json())
                .then(data => data.pokemon.map(p => p.pokemon))
        );

        const pokemonsByType = await Promise.all(promises);
        const uniquePokemons = Array.from(new Set(pokemonsByType.flat().map(p => p.name)))
            .map(name => pokemonsByType.flat().find(p => p.name === name));
        
        return uniquePokemons.filter(pokemon =>
            pokemon.types?.map(type => type.type.name).sort().join(",") === types.sort().join(",")
        );
    };

    const sortItems = (items) => {
        return items.sort((a, b) => {
            if (sortOption === "id") {
                return getPokemonId(a) - getPokemonId(b);
            }
            return a.name.localeCompare(b.name);
        });
    };

    const getPokemonId = (pokemon) => parseInt(pokemon.url.split('/').slice(-2, -1)[0]);

    const handlePokemonClick = async (name) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await response.json();
            setSelectedPokemon(data);
        } catch (err) {
            console.error("Error loading Pokémon details:", err);
            setError("Nie udało się załadować szczegóły pokémona");
        }
    };

    const capitalizeName = (name) => name.charAt(0).toUpperCase() + name.slice(1);

    return (
        <div className="skibidi">
            {isLoading && <Loading />}
            <div className="container">
                <div className="left">
                    <input
                        type="text"
                        placeholder="Wyszukaj..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                        <option value="name">Imię</option>
                        <option value="id">Numer Pokemona</option>
                    </select>
                    <button onClick={handleSearch}>Szukaj</button>
                    {error && <p>{error}</p>}
                    {items.length ? (
                        <ul>
                            {items.map((item) => (
                                <li key={item.name} onClick={() => handlePokemonClick(item.name)}>
                                    {capitalizeName(item.name)}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Brak wyników do wyświetlenia</p>
                    )}
                </div>
                <div className="right">
                    {selectedPokemon ? (
                        <div className="pokemon-detail">
                            <h2>{capitalizeName(selectedPokemon.name)}</h2>
                            <div className="sprites">
                                <img
                                    src={isShiny ? selectedPokemon.sprites.front_shiny : selectedPokemon.sprites.front_default}
                                    alt={selectedPokemon.name}
                                />
                            </div>
                            <p>Typy: {selectedPokemon.types?.map(type => capitalizeName(type.type.name)).join(", ")}</p>
                            <p>Numer Pokemona: {selectedPokemon.id}</p>
                            <button onClick={() => setIsShiny(!isShiny)}>Zmień na Shiny</button>
                            <h3>Ataki:</h3>
                            <ul className="moves">
                                {selectedPokemon.moves?.slice(0, 10).map((move) => (
                                    <li key={move.move.name}>{capitalizeName(move.move.name)}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <h2>Wybierz pokémona, aby zobaczyć szczegóły</h2>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Items;
