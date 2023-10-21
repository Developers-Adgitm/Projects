import styled from "styled-components";
import Numberselector from "./Numberselector";
import Score from "./Score";
import Rolldice from "./Rolldice";
import { useState } from "react";
import { Button, OutlineButton } from "../styled/Button";
import Rules from "./Rules";

const Mainscreen = () => {
  const [score, setscore] = useState(0);
  const [selectednum, setselectednum] = useState();
  const [dice, setdice] = useState(1);
  const [error, seterror] = useState("");
  const [showRules, setShowRules] = useState(false);

  const generaterandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  const rolldice = () => {
    if (!selectednum) {
      seterror("You have not selected any number");
      return;
    }
    const randomnum = generaterandom(1, 7);
    setdice((prev) => randomnum);

    if (selectednum == randomnum) {
      setscore((prev) => prev + randomnum);
    } else {
      setscore((prev) => prev - 2);
    }
    setselectednum(undefined);
  };
  const resetScore = () => {
    setscore(0);
  };
  return (
    <Maincont>
      <div className="maincont">
        <Score score={score} />
        <Numberselector
          error={error}
          seterror={seterror}
          selectednum={selectednum}
          setselectednum={setselectednum}
        />
      </div>
      <Rolldice dice={dice} rolldice={rolldice} />
      <div className="btns">
        <OutlineButton onClick={resetScore}>Reset Score</OutlineButton>
        <Button onClick={() => setShowRules((prev) => !prev)}>
          {showRules ? "Hide" : "Show"} Rules
        </Button>
      </div>

      {showRules && <Rules />}
    </Maincont>
  );
};

export default Mainscreen;

const Maincont = styled.main`
  padding-top: 70px;
  .maincont {
    display: flex;
    justify-content: space-around;
    align-items: end;
  }
  .btns {
    margin-top: -7px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-left: -85px;
  }
`;
