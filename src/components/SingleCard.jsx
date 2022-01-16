import "./SingleCard.css";

function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if(!disabled){
      handleChoice(card);
    }
  };

  return (
    <div className="relative card cursor-pointer">
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} alt="card front" className="card-img front w-full" />
        <img
          src="/img/cover.png"
          alt="card back"
          className=" card-img back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default SingleCard;
