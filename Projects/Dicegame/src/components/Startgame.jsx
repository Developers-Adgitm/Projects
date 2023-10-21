import styled from "styled-components";
import { Button } from "../styled/Button";
import Rolldice from "../rolldice.json";
import Lottie from "lottie-react";
import "../components/Startgame.css";
const StartGame = ({ toggle }) => {
  return (
    <Container className="forall">
      <div className="frontimg">
        <Lottie className="rolling" animationData={Rolldice} />
      </div>
      <div className="content">
        <h1>DICE GAME</h1>
        <Button onClick={toggle}>Play Now</Button>
      </div>
    </Container>
  );
};

export default StartGame;

const Container = styled.div`
  /* max-width: 1180px; */
  height: 100%;
  display: flex;
  margin: 0 auto;
  align-items: center;

  .content h1 {
    font-size: 100px;
    white-space: nowrap;
    margin-bottom: 16px;
    margin-top: -13px;
    position: relative;
  }
  /* .frontimg{
  position: relative;
  margin-left: 70px;
  margin-top: 108px;
} */
  /* .content BUTTON{
  position: relative;
} */
`;
