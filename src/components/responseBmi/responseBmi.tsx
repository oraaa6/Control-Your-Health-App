import { useSelector } from "react-redux";
import { State } from "../BMIPage/BMIPage";

const ResponseBMI = () => {
  const bmiValue = useSelector((state: State) => state.bmi);
  const obesityText =
    "Obesity III degree. Talk to your doctor about the best way to lose weight. Include fruits, vegetables and whole grains in your diet. Exercise regularly. Even a little bit of physical activity has satisfactory benefits for your health.";
  const emaciationText =
    "You weigh far too little! Being seriously underweight can weaken your immune system and also increase your risk of osteoporosis and other serious illnesses. Talk to your doctor and try to figure out how to achieve a healthy weight and what is causing your current weight deficiency.";

  const result = <p>Your result is: {bmiValue.sum}</p>;

  if (bmiValue.sum < 15) {
    return (
      <>
        {result} <p>{emaciationText}</p>
      </>
    );
  } else if (bmiValue.sum > 15 && bmiValue.sum < 16.4) {
    return (
      <>
        {result} <p>{emaciationText}</p>
      </>
    );
  } else if (bmiValue.sum > 16.4 && bmiValue.sum < 18.4) {
    return (
      <>
        {result}
        <p>
          You weigh too little! Being underweight can weaken your immune system
          and also increase your risk of osteoporosis and other serious
          diseases. Talk to your doctor and try to figure out how to achieve a
          healthy weight and what is causing your current weight deficiency.
        </p>
      </>
    );
  } else if (bmiValue.sum > 18.5 && bmiValue.sum < 24.9) {
    return (
      <>
        {result}
        <p>Your weight is correct! In order to maintain it, first of all:</p>
        <ul>
          <li>Enrich your diet with vegetables, fruits and whole grains.</li>
          <li>Exercise regularly.</li>
        </ul>
      </>
    );
  } else if (bmiValue.sum > 25.0 && bmiValue.sum < 29.9) {
    return (
      <>
        {result}
        <p>
          You are overweight! Talk to your doctor about the best way to lose
          weight. Consider healthy eating habits as a lifestyle:
        </p>
        <ul>
          <li>
            Enrich your daily menu with fruits, vegetables and whole grains.
          </li>
          <li>Exercise regularly.</li>
          <li>Set a goal, which is the number of kilos to lose.</li>
          <li>
            Keep a diary and write down your training plan and daily menu.
          </li>
        </ul>
      </>
    );
  } else if (bmiValue.sum > 30.0 && bmiValue.sum < 34.9) {
    return (
      <>
        {result}
        <p>Obesity I degree. {obesityText} </p>
      </>
    );
  } else if (bmiValue.sum > 35.0 && bmiValue.sum < 39.9) {
    return (
      <>
        {result}
        <p>Obesity II degree. {obesityText} </p>
      </>
    );
  } else if (bmiValue.sum > 40) {
    return (
      <>
        {result}
        <p>Obesity III degree. {obesityText}</p>
      </>
    );
  }
  return null;
};

export default ResponseBMI;
