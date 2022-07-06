import { CellTower } from "@mui/icons-material";
import React, { useState } from "react";
import "./SingleCard.css";

export default function SingleCard({ card, clickReveal, disabled, flipped }) {
  
  function handleClick() {
    if (!disabled) {
      clickReveal(card)
    }
  }
  if (card.matched) {
    return <div style={{ opacity: 0}} className="card"><div className="matched"></div></div>
  }
  if (flipped) {
    return (
      <div style={{ backgroundColor: "lightgrey" }}  className="card">
        <div className="flipped">
          {card.value}
        </div>
      </div>
    )
  } else {
    return <div className="card" onClick={handleClick} style={{ color: "white", backgroundImage: "linear-gradient(red, maroon)"}}><div className="hidden">?</div></div>
  }

}
