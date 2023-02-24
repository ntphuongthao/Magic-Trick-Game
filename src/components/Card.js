import './Card.css';

const Card = ({src, handleChoice, flipped, disabled}) => {
  const handleClick = () => {
    if (!disabled)
      handleChoice();
  }

  return (
    <div className='card'>
      <div className={flipped ? "flipped": ""}>
        <img src={src} className="front" alt='card front'></img>
        <img
          src="/img/cover.png"
          className="back"
          alt='card back'
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default Card;