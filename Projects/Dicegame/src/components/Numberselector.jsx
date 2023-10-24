import styled from "styled-components";
function Numberselector({ seterror, error, selectednum, setselectednum }) {
  const array = [1, 2, 3, 4, 5, 6];
  const numberselectorhandler = (value) => {
    setselectednum(value);
    seterror("");
  };

  return (
    <Numberselectors>
      <p className="error">{error}</p>
      <div className="numbers">
        {array.map((value, i) => (
          <Box
            isselected={value === selectednum}
            key={i}
            onClick={() => numberselectorhandler(value)}
          >
            {value}
          </Box>
        ))}
      </div>
      <p>Select a Number</p>
    </Numberselectors>
  );
}

export default Numberselector;

const Numberselectors = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  .numbers {
    display: flex;
    gap: 24px;
    margin-top: -40px;
    margin-right: -100px;
  }
  p {
    font-size: 24px;
    font-weight: 700;
  }
  .error {
    color: red;
    margin-top: 13px;
    margin-bottom: 44px;
  }
`;
const Box = styled.div`
  height: 72px;
  width: 72px;
  border: 2px solid black;
  display: grid;
  place-items: center;
  font-size: 24px;
  font-weight: 700;
  background-color: ${(props) => (props.isselected ? "black" : "white")};
  color: ${(props) => (!props.isselected ? "black" : "white")};
`;
