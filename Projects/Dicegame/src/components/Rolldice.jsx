import styled from "styled-components";

function Rolldice({ rolldice, dice }) {
  return (
    <Dicecont>
      <div className="dice" onClick={rolldice}>
        <img src={`/images/dice/dice_${dice}.png`} alt="dice 1"></img>
      </div>
      <p>Click on Dice to roll</p>
    </Dicecont>
  );
}

export default Rolldice;
const Dicecont = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .dice {
    cursor: pointer;
  }
  .dice img {
    margin-top: -53px;
  }
  p {
    font-size: 20px;
    font-weight: 700;
  }
`;
