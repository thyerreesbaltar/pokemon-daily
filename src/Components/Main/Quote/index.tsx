import React, { useEffect, useState } from "react";
import "./Quote.scss"
import imageReact from "../../../assets/react.svg"

const Quote = () => {
    const [namePokemon, setNamePokemon] = useState<string>("");
    const [currentInput, setCurrentInput] = useState<number>(1);
    const [currentDiv, setCurrentDiv] = useState<number>(1)
    const [statusMissOrErr, setStatusMissOrErr] = useState<boolean | null>(null);
    const [statusLetter, setStatusLetter] = useState<string>("")
    const [numberTips, setNumberTips] = useState<string>("")
    const [tipsArray, setTipsArray] = useState<Array<string>>([])
    const [clickBackSpace, setClickBackSpace] = useState<number>(1)
    const pokemon = {
        name: "pikachu",
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
            // console.log(document.getElementById(`${currentDiv}${currentInput - 1}`))

            const elemet = document.getElementById(`${currentDiv}${currentInput - 1}`) as HTMLInputElement
            if (elemet) {
                elemet.value = ""

                setNamePokemon(namePokemon.substring(0, namePokemon.length - 1))
        console.log(namePokemon)

            }
            // console.log(`${currentDiv}${currentInput - 1}`)
            // // document.getElementById(`${currentDiv}${currentInput + 1}`)
            // console.log(document.getElementById(`${currentDiv}${currentInput - 1}`))
            return setCurrentInput(currentInput - 1);
        }
    }

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {

        // console.log(currentInput);
        if (e.target.value.length == 1) {
            // e.target.setAttribute("value", e.target.value)
            getNextId()
            const typedLetter = e.target.value;
            setNamePokemon(`${namePokemon}${typedLetter}`)

        }
    }
    function teste(e: React.ChangeEvent<HTMLInputElement>) {
        e.target.value = ""
        document.getElementById(`${currentDiv}${currentInput - 1}`)
    }

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        // console.log(typeof e.currentTarget.value)
        // console.log(clickBackSpace)
        // const element = e.target
        // console.log(element.value)

        // if(!(e.currentTarget.value.length)){

        if (e.key == "Backspace") {
            setClickBackSpace(clickBackSpace + 1)
            setNamePokemon(namePokemon.substring(0, namePokemon.length - 1))
            if (clickBackSpace > 1) {
                setClickBackSpace(1);
                getPreviousId()
                // console.log(e.currentTarget.value )
                // e.currentTarget.value = ""
                // const input = 
                // document.getElementById(`${currentDiv}${currentInput - 1}`).ge
                // input?.set
            }
        }
        // else {
        //     console.log("teste")
        // }
        // }
    }

    function checkLetterinNamePokemon(pokemon: string) {
        const namePokemonArray = namePokemon.split("");
        // const letterInNamePokemonArray = 
        namePokemonArray.map((letter, index) => {
            if (pokemon.includes(letter)) {
                if (pokemon[index] === letter) {
                    document.getElementById(`${currentDiv}${index + 1}`)?.setAttribute("class", "Correct-position")
                } else {
                    document.getElementById(`${currentDiv}${index + 1}`)?.setAttribute("class", "Incorrect-position")
                }
            }
        })
    }
    function unlockNextLine() {
        document.getElementById(`linha-${currentDiv}`)?.setAttribute("class", "teste")
    }

    function handleSubmit(e: React.KeyboardEvent<HTMLDivElement>) {
        // console.log("teste".split(""))
        console.log(namePokemon)
        if (e.key == "Enter") {
            if (namePokemon === pokemon.name) {
                setStatusMissOrErr(true)
                // console.log("acerto")
            } else {
                setCurrentDiv(currentDiv + 1)
                setCurrentInput(1)
                unlockNextLine()
                setNamePokemon("")
                checkLetterinNamePokemon(pokemon.name)
                tips()
                if (currentDiv === quantidadeTentativas) {
                    setStatusMissOrErr(false)
                }

            }
        }
    }

    function tips() {
        // const tipsArray = []
        switch (numberTips) {
            case "dica 1":
                setTipsArray([...tipsArray, pokemon.generetion + " Gen"])
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
            renderInputs.push(<input type="text" id={`${id}${x}`} onKeyUp={handleKeyPress} maxLength={1} onInput={handleInput} disabled={id !== currentDiv} />)
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

    }, [currentInput, currentDiv, namePokemon])
    // console.log(currentInput)
    return <main>
        <div className="Tips">
            {
                tipsArray.length !== 0 &&
                <span>Dicas: </span>
            }
            <ul>
                {tipsArray?.map((tip, index) => <li key={index}>{tip}</li>)}
            </ul>
        </div>
        <div className="Pokemon-name">
            {
                renderTentativas
            }
        </div>
        {
            statusMissOrErr !== null && <div className={`message ${ statusMissOrErr? "win": "lose"}`}>
                <h2>Você {statusMissOrErr? "acertou": "errou"} o nome do pokemon secreto</h2>
                <div className="Data-pokemon">
                    {/* <imageReact/> */}
                    <img src={imageReact} alt={pokemon.name} />
                    <div>
                        <p id="name">
                            <span>Nome:</span>
                            {pokemon.name}
                        </p>

                        <p id="gen">
                            <span>Geração:</span>

                            {pokemon.generetion}
                        </p>

                        <div id="first-type">
                            <span>Tipo:</span>
                            <div className="type-pokemon">
                                <p className="type">
                                {pokemon.type[0]} 
                                </p>
                                <p className="type">
                                {pokemon.type[1]}
                                </p>

                            </div>
                        </div>

                        <p id="height">
                        <span>Altura:</span>
                            {pokemon.altura}
                        </p>

                        <p id="Weight">
                        <span>Peso:</span>
                            {pokemon.peso}
                        </p>
                    </div>
                </div>
            </div>
        }
        {/* {
            namePokemon
        } */}
        {
            !statusMissOrErr && statusMissOrErr != null && <div>Errado</div>
        }
        {/* // <div>
        //     <input type="text" onInput={handleInput} maxLength={1}/>
        //     <input type="text" id={"1"} maxLength={1}/>
        // </div> */}

    </main>
}

export default Quote;