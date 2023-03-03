import './App.css';
import { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from './utils/pokemon';
// import Card from './components/Card';


function App() {
const initialURL = "https://pokeapi.co/api/v2/pokemon";
const [loading, setloading] = useState(true);
const [pokemonData, setPokemonData] = useState();

  useEffect(() => {
   const fetchPokemonData = async () => {
    //全てのポケモンデータを取得
    let res = await getAllPokemon(initialURL);
    // console.log(res);
    //各ポケモンの詳細なデータを取得
    loadPokemon(res.results);
    // console.log(res.results);
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
  // return(
  //   <>
  //     {pokemonData.map((pokemon, i) => {
  //       console.log(pokemonData);
  //       // <Card key={i} pokemon={pokemon} />;
  //      })}
  //   </>
  // );

  return ( 
  <div className='App'>
    {loading ? (
      <h1>ロード中・・・</h1>
    ) : 
    (
      <div className="pokemonCardContainer">
        {pokemonData.map((pokemon, i) => {
          return <>pokemon</>
          // console.log(pokemon);
          // <Card key={i} pokemon={pokemon} />;
        })}
      </div>
    )}
  </div>
  ); 
}


export default App;
