import { useSelector } from "react-redux";
import { State } from "../CaloriesPage/CaloriesPage";

const ResponseCalories = () => {
  const caloriesValue = useSelector((state: State) => state.calories.value);
  return (
    <>
      <p>Your Basic Metabolism is: {caloriesValue.sumPPM}</p>
      <p>Your Total Metabolism is: {caloriesValue.sumCPM}</p>
      <p>
        Basic metabolism - is the lowest level of energy transformations,
        conditioning the supply of energy necessary to maintain basic life
        functions in optimal living conditions.
      </p>
      <p>
        Basic metabolism - it is the sum of all human energy expenditure during
        the day, taking into account physical activity. Caloric requirement,
        which is the number of calories that keeps your body weight constant.
        The number of calories that covers the daily needs of the body, taking
        into account energy expenditure related to physical activity.
      </p>
    </>
  );
};

export default ResponseCalories;
