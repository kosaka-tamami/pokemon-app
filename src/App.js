import './App.css';
import { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card/Card';
import Navber from './components/Navber/Navber';


function App() {
const initialURL = "https://pokeapi.co/api/v2/pokemon";
const [loading, setloading] = useState(true);
const [pokemonData, setPokemonData] = useState([]);
const [nextURL, setNextURL] = useState("");
const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
   const fetchPokemonData = async () => {
    //全てのポケモンデータを取得
    let res = await getAllPokemon(initialURL);
    // console.log(res);
    //各ポケモンの詳細なデータを取得
    loadPokemon(res.results);
    // console.log(res.results);
    // console.log(res.next);
    setNextURL(res.next);
    setPrevURL(res.previous);
    setloading(false);
  };
  fetchPokemonData();
}, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  // pokemonData.map((pokemon, index) => console.log(`${index + 1}番目の${pokemon}です`));

  // console.log(pokemonData);

  const handleNextPage = async () => {
    setloading(true);
    let data = await getAllPokemon(nextURL);
    // console.log(data);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setloading(false);
  };

  const handlePrevPage = async () => {
    setloading(true);
    let data = await getAllPokemon(prevURL);
    // console.log(data);
    await loadPokemon(data.results);
    setPrevURL(data.previous);
    setNextURL(data.next)
    setloading(false);
  };

  return ( <>
    <Navber />
    <div className='App'>
    {loading ? (
      <h1>ロード中・・・</h1>
    ) : 
    (
      <div className="pokemonCardContainer">
        {pokemonData?.map((pokemon, i) => {
          return  <Card key={i} pokemon={pokemon} />;
          // <div key={i}>{pokemon.name}</div>
          // console.log(pokemon);
        })}
      </div>
    )}
  <div className='btn'>
    <button onClick={handlePrevPage}>前へ</button>
    <button onClick={handleNextPage}>次へ</button>
  </div>
  </div>
  </>
  ); 
}


export default App;
