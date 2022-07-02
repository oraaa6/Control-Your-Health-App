import { useSelector, useDispatch } from "react-redux";
import { countBmi, backToInitialValues } from "../slices/BMIPageslice";
import ResponseBMI from "../responseBmi/responseBmi";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export type State = {
  bmi: {
    sum: number;
  };
};

const BMIPage = () => {
  const bmiValue = useSelector((state: State) => state.bmi);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    criteriaMode: "all",
  });

  type FormInputs = {
    weight: number;
    height: number;
  };

  const onCalculate = (values: FormInputs) => {
    dispatch(
      countBmi(
        ((values.weight / Math.pow(values.height, 2)) * 10000).toFixed(2)
      )
    );
  };

  const onBackToMain = () => {
    reset();
    dispatch(backToInitialValues());
  };

  const mainView = (
    <>
      <p>
        The BMI (Body Mass Index) is nothing more than the ratio of a person's
        weight to their height. This formula is almost 200 years old and was
        developed in 1832 by Adolph Quetelet - a Belgian statistician. However,
        it did not come into general use until the 1970s. It was then that the
        term Body Mass Index, BMI for short, became popular. Since then, BMI
        calculation has been the most popular way to initially diagnose
        overweight, obesity and underweight.
      </p>
      <div>
        <form onSubmit={handleSubmit(onCalculate)}>
          <div>
            <label htmlFor="weight">weight</label>
            <input
              type="number"
              placeholder="kg"
              {...register("weight", {
                required: "this is required",
                min: {
                  value: 30,
                  message: "the value cannot be less than 30",
                },
                max: {
                  value: 350,
                  message: "the value cannot be greater than 350",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="weight"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              }
            />
          </div>
          <div>
            <label htmlFor="height">height</label>
            <input
              type="number"
              {...register("height", {
                required: "this is required",
                min: {
                  value: 100,
                  message: "the value cannot be less than 100",
                },
                max: {
                  value: 250,
                  message: "the value cannot be greater than 250",
                },
              })}
              placeholder="cm"
            />
            <ErrorMessage
              errors={errors}
              name="height"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              }
            />
          </div>
          <button type="submit">calculate</button>
        </form>
      </div>
    </>
  );

  return (
    <>
      {bmiValue.sum > 0 ? (
        <>
          <p>Your result is: {bmiValue.sum}</p>
          <ResponseBMI />
          <button onClick={onBackToMain}>Calculate again</button>
        </>
      ) : (
        <>{mainView}</>
      )}
    </>
  );
};

export default BMIPage;
