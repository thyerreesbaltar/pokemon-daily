import axios from "axios";


const getKantoPokemons = async () => {
  const POKEMONS_KANTO = 151;
  const pokemons = Array(POKEMONS_KANTO).fill("").map((_, index) => axios.get(`https://pokeapi.co/api/v2/pokemon/${index + 1}`));

  const result = await Promise.all(pokemons);
  console.log(results);
  return result.map((pokemons) => pokemons.data);
}


export default getKantoPokemons;