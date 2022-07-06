import { LocalFireDepartment } from "@mui/icons-material";
import { textAlign } from "@mui/system";
import React, { useEffect, useState } from "react";
import SingleCard from "./SingleCard/SingleCard";
import "./MatchingGame.css"

const symbolSet = ['♠️', '♣️', '♥️', '♦️', '🃏', '🗿', '+', '$']

export default function Board() {
  const [deck, setDeck] = useState([])
  const [cardOne, setCardOne] = useState(null)
  const [cardTwo, setCardTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const matchingSet = [...symbolSet, ...symbolSet]

  function clickReveal(card) {
    cardOne ? setCardTwo(card) : setCardOne(card)
  }

  function reset() {
    setCardOne(null)
    setCardTwo(null)
    setDisabled(false)
  }

  function shuffle() {

    let shuffledSet = matchingSet.sort(() => Math.random() - .5)
    setDeck(shuffledSet.map((value, index) => ({
      value,
      matched: false,
      index,
    })))
    
  }

  useEffect(() => {
    if (deck.length === 0) {
      shuffle()
    }
  }, [deck])

  function checkWinState(){
    if(!deck.some((card) => card.matched == false)){
      return(
        <div style={{textAlign: "center"}}>
          <div >Congratulations!</div><br/>
          <button style={{cursor: "pointer"}} onClick={shuffle}>Rematch</button>
        </div>
      )
    }
  }

  function evaluateCards() {
    if (cardOne.value === cardTwo.value) {
      setDeck(prevCards => {
        return prevCards.map(card => {
          if (card.value === cardOne.value) {
            return { ...card, matched: true }
          } else {
            return card
          }
        })
      })
      
      reset()
    } else {
      reset()
    }
  }

  useEffect(() => {
    if (cardOne && cardTwo) {
      setDisabled(true)
      setTimeout(() => evaluateCards(), 2000)
    }
  }, [cardOne, cardTwo])


  return (
    <div>
      <h1 className="title"><u>Matching Game</u></h1>
      <div className="grid">
        {deck.map((card, index) => (
          <SingleCard
            key={index}
            card={card}
            clickReveal={clickReveal}
            disabled={disabled}
            flipped={card === cardOne || card === cardTwo}
          />
        ))}
      </div>
      {checkWinState()}
    </div>
  )
}
