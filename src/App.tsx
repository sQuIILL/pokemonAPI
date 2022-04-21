import './App.css';
import {
  Grid, Container, Paper, CircularProgress, Button, FormControl,
  InputLabel, Select, MenuItem, Autocomplete, TextField, Fade, Zoom
} from "@mui/material"
import { useQuery } from "react-query";
import { SetStateAction, useEffect, useState } from "react";
import { typesOfPokemon, allPokemons } from "./API/fetcher"
import { PokemonStack } from './components/PokemonStack';

export const App = () => {
  let [count, setCount] = useState(20);
  const [pokemonType, setPokemonType] = useState("");
  const [filteredName, setFilterName] = useState(null);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonTypeNames, setPokemonTypeNames] = useState<string[]>([]);

  const { isLoading: isPokemonsLoading, data: pokemonData, isIdle: loadingTransitions } = useQuery("pokemons", allPokemons);
  const { isLoading: isPokemonTypesLoading, data: typesData } = useQuery("types", typesOfPokemon);

  const loadMorePokemons = () => {
    setCount(count + 20);
  }

  useEffect(() => {
    if (pokemonData && pokemonData.results) {
      let pokemonSlice = pokemonData.results;

      if (filteredName && filteredName !== '') {
        pokemonSlice = pokemonSlice.filter((e: { name: string }) => e.name === filteredName);
      }

      if (pokemonTypeNames && pokemonTypeNames.length > 0) {
        pokemonSlice = pokemonSlice.filter((e: { name: string }) => pokemonTypeNames.includes(e.name));
      }

      setPokemons(pokemonSlice.slice(0, count));
    }
  }, [pokemonData, count, filteredName, pokemonTypeNames]);

  const handleChange = async (event: { target: { value: SetStateAction<string>; }; }) => {
    setPokemonType(event.target.value);
    const response = await fetch(`https://pokeapi.co/api/v2/type/${event.target.value}`)
    const pokemonTypeData = await response.json();
    
    let arrayOfNamesForType = pokemonTypeData.pokemon.map((e: { pokemon: { name: string } }) =>    e.pokemon.name)
    setPokemonTypeNames(arrayOfNamesForType);
  };

  if (isPokemonsLoading || isPokemonTypesLoading) {
    return (
      <Container>
        <Grid container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item xs={1} >
            <CircularProgress color="inherit" ></CircularProgress>
          </Grid>
        </Grid>
      </Container>
    );
  }

  const { results: pokemonTypes } = typesData;
  let typeOfPokemon = pokemonTypes.map((e: { name: string }) => e.name);

  return (
    <Container style={{ marginTop: "20px", marginBottom: "20px" }} className="backgroundColor">
      <Fade in={!isPokemonTypesLoading} style={{ transitionDelay: !isPokemonTypesLoading ? '500ms' : '0ms' }}>
        <Paper elevation={10} className="containerColor">
          <Grid spacing={2}
            container
            direction="row"
            justifyContent="center"
          >
            <Grid item xs={3}>
              <Zoom in={!loadingTransitions} style={{ transitionDelay: !loadingTransitions ? '500ms' : '0ms' }}>
                <FormControl fullWidth style={{ padding: "8px", marginTop: "10px" }}>
                  <InputLabel id="demo-simple-select-label">Select type of pokemon</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={pokemonType}
                    onChange={handleChange}
                  >
                    {typeOfPokemon.map((e: any) => (e === "shadow" ? e = "all" : e === "unknown" ? <MenuItem value={e} key={e}>{e = "all"}</MenuItem> : <MenuItem value={e} key={e}>{e}</MenuItem>))}
                  </Select>
                  <Autocomplete
                    style={{ margin: "10px 0 0 0" }}
                    disablePortal
                    id="combo-box-demo"
                    options={pokemonData.results.map((e: { name: string }) => e.name)}
                    renderInput={(params) => <TextField {...params} label="Pokemon" />}
                    value={filteredName}
                    onChange={(event, newValue) => { setFilterName(newValue); }}
                  />

                </FormControl>
              </Zoom>
            </Grid>
            <Grid item xs={9}>
              {pokemons.map((pokemon: JSX.IntrinsicAttributes & { name: any; url: any; }) => (
                <PokemonStack key={pokemon.name} {...pokemon} />
              ))}
            </Grid>
            <Grid item xs={6} >
              <Paper elevation={8} style={{ textAlign: "center", padding: "4px", margin: "6px" }}>
                <Button style={{ width: "100%", height: "50px" }} onClick={() => loadMorePokemons()}><b style={{ fontSize: "22px" }}>NEXT POKEMONS</b></Button>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    </Container>
  );
};

export default App;