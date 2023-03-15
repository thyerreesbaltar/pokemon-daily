import getKantoPokemons from './api/PokedexApi';
import './App.scss';
import Header from './Components/Header';
import Quote from './Components/Main/Quote';
// import Quote from './Components/Main/Quote';
function App()  {
  
  getKantoPokemons().then(() => console.log);
  return (
    <div className="App">
      <Header/>
      <Quote/>
    </div>
  )
}

export default App
