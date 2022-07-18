import { useSelector } from "react-redux";
import { State } from "../bodyFatPage/BodyFatPage";

const ResponseBodyFat = () => {
  const bodyFatValue = useSelector((state: State) => state.bodyFat);
  
  return (
    <>
      <p>Your Body Fat is: {bodyFatValue.sum}</p>
      <p>
        Basic metabolism - is the lowest level of energy transformations,
        conditioning the supply of energy necessary to maintain basic life
        functions in optimal living conditions.
      </p>
    </>
  );
};

export default ResponseBodyFat;
