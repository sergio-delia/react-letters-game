import React from "react";

const Card = ({ card }) => {
  return (
    <div className="card">
      <img src={`images/${card}.png`} alt={card} />
    </div>
  );
};

export default Card;