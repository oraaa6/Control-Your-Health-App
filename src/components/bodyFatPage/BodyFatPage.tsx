import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { countBodyFat, backToInitialValues } from "../slices/bodyFatSlice";
import { InitialValue } from "../slices/bodyFatSlice";
import InputsSex from "./inputsSex";
import { useState } from "react";

export type State = {
  bodyFat: { sum: InitialValue };
};

const inputData = [
  { id: 1, name: "woman" },
  { id: 2, name: "man" },
];

const BodyFatPage = () => {
  const bodyFatValue = useSelector((state: State) => state.bodyFat);
  console.log(bodyFatValue);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const [selectedSex, setSelectedSex] = useState({
    options: [
      {
        id: 1,
        name: "Item 1",
      },
      {
        id: 2,
        name: "Item 2",
      },
    ],
    optionSelected: 2,
  });
  //@ts-ignore
  const toggleInputs = (e) => {
    //@ts-ignore
    setSelectedSex({ optionSelected: e.target.id });
    //@ts-ignore
  };
  const dispatch = useDispatch();

  // type FormInputs = {
  //   sex: string;
  //   weight: number;
  //   height: number;
  //   age: number;
  //   activityIndex: number;
  // };
  //@ts-ignore
  const onCalculateBodyFat = (value) => {
    console.log(value);
    if (value.sex === "woman") {
      dispatch(countBodyFat({ sum: 30 }));
    } else if (value.sex === "men") {
      dispatch(countBodyFat({ sum: 20 }));
    }
  };

  const onBackToMain = () => {
    reset();
    dispatch(backToInitialValues());
  };

  const mainView = (
    <form onSubmit={handleSubmit(onCalculateBodyFat)}>
      <div>
        <p>
          The Body Fat Calculator is an indicator of the amount (expressed as a
          percentage) of body fat. The percentage of having body fat can also
          show us the state of metabolism. We must bear in mind that this
          calculator is not a determinant of fitness, form or health. However,
          the body fat index calculator shows us a lot of information about our
          body. A very important tool showing progress in weight loss and
          building muscle mass
        </p>
        <div>
          <input type="checkbox" name="woman" id="1" />
          <input type="checkbox" name="men" id="2" />
          {inputData.map((data) => (
            <input
              //@ts-ignore
              onChange={(e) => toggleInputs(e)}
              //@ts-ignore
              type="checkbox"
              name={data.name}
              //@ts-ignore
              checked={setSelectedSex({})}
              value={data.name}
            />
          ))}
          {/* <label htmlFor="woman">Woman</label>
          <input
            type="radio"
            value="woman"
            {...register("sex", {
              required: "this is required",
            })}
          />
          <label htmlFor="men">Men</label>
          <input
            type="radio"
            value="men"
            {...register("sex", {
              required: "this is required",
            })}
          /> */}
          <ErrorMessage
            errors={errors}
            name="sex"
            render={({ message }) => <p>{message}</p>}
          />
        </div>
        <InputsSex
          measurementName="triceps"
          register={register}
          options={{
            required: {
              value: true,
              message: "this is required",
            },
            min: {
              value: 15,
              message: "min value is 15",
            },
          }}
          errors={errors}
        />
        <InputsSex
          measurementName="triceps"
          register={register}
          options={{
            required: {
              value: true,
              message: "this is required",
            },
            min: {
              value: 15,
              message: "min value is 15",
            },
          }}
          errors={errors}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="age"
          {...register("age", {
            required: "this is required",
            min: {
              value: 10,
              message: "the value cannot be less than 100",
            },
            max: {
              value: 120,
              message: "the value cannot be greater than 250",
            },
          })}
        />
        <ErrorMessage
          errors={errors}
          name="age"
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
  );
  return (
    <>
      {bodyFatValue.sum > 0 ? (
        <>
          {/* <ResponseCalories /> */}
          <button onClick={onBackToMain}>Calculate again</button>
        </>
      ) : (
        <>{mainView}</>
      )}
    </>
  );
};

export default BodyFatPage;
