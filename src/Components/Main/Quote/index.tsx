import React, { useEffect, useState } from "react";
import "./Quote.scss"

const Quote = () => {
    const [namePokemon, setNamePokemon] = useState<string>("");
    const [currentInput, setCurrentInput] = useState<number>(1);
    const [currentDiv, setCurrentDiv] = useState<number>(1)
    const [statusMissOrErr, setStatusMissOrErr] = useState<boolean | null>(null);

    const pokemon = "pikachu"
    const quantidadeTentativas = 10;
    const tamanhoPalavra = pokemon.length;

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
            console.log(currentInput);
        }

    }

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key == "Backspace") {
            getPreviousId()
            setNamePokemon(namePokemon.substring(0, namePokemon.length - 1))
        }
    }

    function handleSubmit(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key == "Enter") {
            setCurrentDiv(currentDiv + 1)
            setCurrentInput(1)
            if (namePokemon === pokemon) {
                setStatusMissOrErr(true)
                console.log("acerto")
            } else {
                setStatusMissOrErr(false)
                console.log("erro")
            }
        }
    }
    function createInputs(id: number) {

        const renderInputs = []
        for (let x = 1; x <= tamanhoPalavra; x++) {
            renderInputs.push(<input type="text" id={`${id}${x}`} className={`${x}`} onKeyUp={handleKeyPress} onInput={handleInput} maxLength={1} />)
        }

        return renderInputs
    }

    const renderTentativas = [];
    for (let y = 1; y <= quantidadeTentativas; y++) {
        renderTentativas.push(<div id={`${y}`} onKeyUp={handleSubmit} className={` ${y} ${y == currentDiv? "active": "desactive"}`}>
            {createInputs(y)}
        </div>)
    }
    console.log(namePokemon)

    useEffect(() => {
        // const element = document.querySelector("#1");
        // if (element) {
        //     console.log(element.appendChild);
        // }
        // document.getElementById(`active >${currentInput}`)?.focus();
        // const element = document.getElementsByClassName(`${currentDiv}`);
        // element?.;
        console.log(`${currentDiv}${currentInput}`)
        document.getElementById(`${currentDiv}${currentInput}`)?.focus();
    }, [currentInput, currentDiv])

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
            !statusMissOrErr && statusMissOrErr != null && <div>Errado</div>
        }
        {/* // <div>
        //     <input type="text" onInput={handleInput} maxLength={1}/>
        //     <input type="text" id={"1"} maxLength={1}/>
        // </div> */}

    </main>
}

export default Quote;