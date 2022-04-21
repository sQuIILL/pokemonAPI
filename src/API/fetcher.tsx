export default async function pokedex() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20");
    const allPokemons = await response.json();
    return allPokemons;
}

export async function pokeball(url: RequestInfo) {
    const response = await fetch(url);
    const allPokemons = await response.json();
    return allPokemons;
}

export async function typesOfPokemon(){
    const response = await fetch("https://pokeapi.co/api/v2/type/")
    // const response = await fetch(urlOfType);
    const allPokemonTypes = await response.json();
    return allPokemonTypes;
}

export async function typesOfPokemon2(urlOfType: RequestInfo){
    // const response = await fetch("https://pokeapi.co/api/v2/type/")
    const response = await fetch(urlOfType);
    const allPokemonTypes = await response.json();
    return allPokemonTypes;
}

export async function allPokemons(){
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0")
    const allPokemonNames = await response.json();
    return allPokemonNames;
}