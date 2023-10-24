import styled from "styled-components";
function Score({score}) {
  return (
    <Scorecontainer>
      <h1>{score}</h1>
      <p>Total Score</p>
    </Scorecontainer>
  );
};

export default Score;
const Scorecontainer = styled.div`
max-width: 200px;
text-align: center;
  h1 {
    font-size: 100px;
    line-height: 0px;
    margin-top: -132px;
    margin-left: -154px;
  }
  p {
    font-size: 24px;
    font-weight: 700;
    margin-left: -140px;
    margin-top: -10px;
  }
`;
