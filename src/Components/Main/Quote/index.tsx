import React, { useEffect, useState } from "react";
import "./Quote.scss"

const Quote = () => {
    const [namePokemon, setNamePokemon] = useState<string>("");
    const [currentInput, setCurrentInput] = useState<number>(1);
    const [currentDiv, setCurrentDiv] = useState<number>(1)
    const [statusMissOrErr, setStatusMissOrErr] = useState<boolean | null>(null);
    const [statusLetter, setStatusLetter] = useState<string>("")
    const [numberTips, setNumberTips] = useState<string>("")
    const [tipsArray, setTipsArray] = useState<Array<string>>([])
    const pokemon = {
        name:"pikachu",
        generetion: "1º",
        type: [
            "agua",
            "agua"
        ],
        peso: "1000Kg",
        altura: "1.5m"
    }

    const quantidadeTentativas = 5;
    const tamanhoPalavra = pokemon.name.length;

    function getNextId() {
        if (currentInput !== tamanhoPalavra) {
            return setCurrentInput(currentInput + 1);
        }
    }
    function getPreviousId() {
        if (currentInput !== 1) {
            return setCurrentInput(currentInput - 1);
        }
    }
    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value.length == 1) {
            getNextId()
            const typedLetter = e.target.value;
            setNamePokemon(`${namePokemon}${typedLetter}`)
            // console.log(currentInput);
        }

    }

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key == "Backspace") {
            getPreviousId()
            setNamePokemon(namePokemon.substring(0, namePokemon.length - 1))
        }
    }

    function checkLetterinNamePokemon(pokemon: string) {
        const namePokemonArray = namePokemon.split("");
        // const letterInNamePokemonArray = 
        namePokemonArray.map((letter, index) => {
            if(pokemon.includes(letter)) {
                if(pokemon[index] === letter){
                    document.getElementById(`${currentDiv}${index + 1}`)?.setAttribute("class", "PosicaoCorreta")
                }else {
                    document.getElementById(`${currentDiv}${index + 1}`)?.setAttribute("class", "PosicaoErrada")
                }
            }
        })
    }

    function handleSubmit(e: React.KeyboardEvent<HTMLDivElement>) {
        // console.log("teste".split(""))
        if (e.key == "Enter") {
            if (namePokemon === pokemon.name) {
                setStatusMissOrErr(true)
                console.log("acerto")
            } else {
                setCurrentDiv(currentDiv + 1)
                setCurrentInput(1)
                setStatusMissOrErr(false)
                setNamePokemon("")
                checkLetterinNamePokemon(pokemon.name)
                tips()
                
            }
        }
    }

    function tips() {
        // const tipsArray = []
        switch (numberTips) {
            case "dica 1": 
                setTipsArray([...tipsArray, pokemon.generetion])
                // tipsArray.push(<div>{pokemon.generetion}</div>)
                break;
                // return  <div>{pokemon.generetion}</div>
            case "dica 2":
                setTipsArray([...tipsArray, pokemon.type[0]])

                // tipsArray.push(<div>{pokemon.type[0]}</div>)
                break;
                // console.log("entro")
                // return  <div>{pokemon.type[0]}</div>
            case "dica 3":
                setTipsArray([...tipsArray, pokemon.type[1]])

            // tipsArray.push(<div>{pokemon.type[1]}</div>)
                break;
                    // return  <div>{pokemon.type[1]}</div>
            case "dica 4":
                setTipsArray([...tipsArray, pokemon.peso])

            // tipsArray.push(<div>{pokemon.peso}</div>)
                break;
                // return  <div>{pokemon.peso}</div>
            case "dica 5":
                setTipsArray([...tipsArray, pokemon.altura])

            // tipsArray.push(<div>{pokemon.altura}</div>)
                break;
                    // return  <div>{pokemon.altura}</div>
        }
    }
    function createInputs(id: number) {

        const renderInputs = []
        for (let x = 1; x <= tamanhoPalavra; x++) {
            renderInputs.push(<input type="text" id={`${id}${x}`} onKeyUp={handleKeyPress} onInput={handleInput} maxLength={1} />)
        }

        return renderInputs
    }

    const renderTentativas = [];
    for (let y = 1; y <= quantidadeTentativas; y++) {
        renderTentativas.push(<div id={`linha-${y}`} onKeyUp={handleSubmit}>
            {createInputs(y)}
        </div>)
    }
    // console.log(namePokemon)

    useEffect(() => {
        // const element = document.querySelector("#1");
        // if (element) {
        //     console.log(element.appendChild);
        // }
        // document.getElementById(`active >${currentInput}`)?.focus();
        // const element = document.getElementsByClassName(`${currentDiv}`);
        // element?.;
        // console.log(`${currentDiv}${currentInput}`)
        document.getElementById(`${currentDiv}${currentInput}`)?.focus();
        setNumberTips(`dica ${currentDiv}`)
        
    }, [currentInput, currentDiv])
    console.log(tipsArray)
    return <main>
        <div>
            {
                renderTentativas
            }
        </div>
        {
            statusMissOrErr && <div>Correto</div>
        }
        {
            namePokemon
        }
        {
            !statusMissOrErr && statusMissOrErr != null && <div>Errado</div>
        }
        {tipsArray?.map((tip) => <div>{tip}</div>)}
        {/* // <div>
        //     <input type="text" onInput={handleInput} maxLength={1}/>
        //     <input type="text" id={"1"} maxLength={1}/>
        // </div> */}

    </main>
}

export default Quote;