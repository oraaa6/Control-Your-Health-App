import { useSelector, useDispatch } from "react-redux";
import { countBmi, backToInitialValues } from "../slices/BMIPageslice";
import ResponseBMI from "../responseBmi/responseBmi";
import { useForm } from "react-hook-form";
import Input from "../input/input";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "../button/button";

export type State = {
  bmi: {
    sum: number;
  };
};

export type FormInputs = {
  weight: number;
  height: number;
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
  const onCalculate = (values: FormInputs) => {
    dispatch(
      countBmi(
        ((values.weight / Math.pow(values.height, 2)) * 10000).toFixed(2)
      )
    );
  };

  let location = useLocation();
  useEffect(() => {
    dispatch(backToInitialValues());
  }, [location.pathname]);

  const navigate = useNavigate();

  const onBackToMain = () => {
    reset();
    dispatch(backToInitialValues());
  };

  return (
    <>
      {bmiValue.sum !== 0 ? (
        <>
          <ResponseBMI />
          <Button text="Calculate again " onClick={onBackToMain} />
          <Button
            text="Back to main page"
            onClick={() => navigate("/Control-Your-Health-App/")}
          />
        </>
      ) : (
        <>
          <p>
            The BMI (Body Mass Index) is nothing more than the ratio of a
            person's weight to their height. This formula is almost 200 years
            old and was developed in 1832 by Adolph Quetelet - a Belgian
            statistician. However, it did not come into general use until the
            1970s. It was then that the term Body Mass Index, BMI for short,
            became popular. Since then, BMI calculation has been the most
            popular way to initially diagnose overweight, obesity and
            underweight.
          </p>
          <div>
            <form onSubmit={handleSubmit(onCalculate)}>
              <Input
                name="weight"
                register={register}
                options={{
                  required: {
                    value: true,
                    message: "this is required",
                  },
                  min: {
                    value: 30,
                    message: "the value cannot be less than 30",
                  },
                  max: {
                    value: 350,
                    message: "the value cannot be greater than 350",
                  },
                }}
                errors={errors}
                type="number"
                unit="kg"
              />
              <Input
                name="height"
                register={register}
                options={{
                  required: {
                    value: true,
                    message: "this is required",
                  },
                  min: {
                    value: 100,
                    message: "the value cannot be less than 100",
                  },
                  max: {
                    value: 350,
                    message: "the value cannot be greater than 250",
                  },
                }}
                errors={errors}
                type="number"
                unit="cm"
              />
              <Button text="calculate" />
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default BMIPage;
