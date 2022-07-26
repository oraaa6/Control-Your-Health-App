import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { countBodyFat, backToInitialValues } from "../slices/bodyFatSlice";
import { InitialValue } from "../slices/bodyFatSlice";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResponseBodyFat from "../bodyFatResponse/responseBodyFat";
import Input from "../input/input";
import "./bodyFatPage.scss";
import Button from "../button/button";

export type State = {
  bodyFat: {
    sum: InitialValue;
  };
};

const BodyFatPage = () => {
  const bodyFatValue = useSelector((state: State) => state.bodyFat);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs | any>({
    criteriaMode: "all",
  });

  const [selectedSex, setSelectedSex] = useState([
    { id: "1", label: "Men", isChecked: false },
    { id: "2", label: "Woman", isChecked: false },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    reset();
    setSelectedSex(
      selectedSex.map((sex) =>
        sex.id === e.target.value
          ? { ...sex, isChecked: !sex.isChecked }
          : { ...sex, isChecked: false }
      )
    );
  };

  type FormInputs = {
    waist: string;
    hips: string;
    neck: string;
    height: number;
  };

  const onCalculateBodyFat: SubmitHandler<FormInputs> = (value) => {
    selectedSex.forEach((sex) => {
      if (sex.label === "Woman" && sex.isChecked === true) {
        const measurmentSumWoman =
          parseInt(value.waist) + parseInt(value.hips) - parseInt(value.neck);
        const bodyDensityWoman =
          1.29579 -
          0.35004 * Math.log10(measurmentSumWoman) +
          0.221 * Math.log10(value.height);
        const bodyFatWoman = 495 / bodyDensityWoman - 450;
        dispatch(countBodyFat(bodyFatWoman.toFixed(2)));
      } else if (sex.label === "Men" && sex.isChecked === true) {
        const measurmentSumMen = parseInt(value.waist) - parseInt(value.neck);
        const bodyDensityMen =
          1.0324 -
          0.19077 * Math.log10(measurmentSumMen) +
          0.15456 * Math.log10(value.height);
        const bodyFatMen = 495 / bodyDensityMen - 450;
        dispatch(countBodyFat(bodyFatMen.toFixed(2)));
      }
    });
  };

  const navigate = useNavigate();

  let location = useLocation();
  useEffect(() => {
    dispatch(backToInitialValues());
  }, [location.pathname]);

  const onBackToMain = () => {
    reset();
    dispatch(backToInitialValues());
  };

  return (
    <>
      {bodyFatValue.sum !== 0 ? (
        <>
          <ResponseBodyFat />
          <Button text="Calculate again " onClick={onBackToMain} />
          <Button
            text="Back to main page"
            onClick={() => navigate("/Control-Your-Health-App/")}
          />
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit(onCalculateBodyFat)}>
            <div>
              <p>
                The Body Fat Calculator is an indicator of the amount (expressed
                as a percentage) of body fat. The percentage of having body fat
                can also show us the state of metabolism. We must bear in mind
                that this calculator is not a determinant of fitness, form or
                health. However, the body fat index calculator shows us a lot of
                information about our body. A very important tool showing
                progress in weight loss and building muscle mass
              </p>
              <div>
                {selectedSex.map((item) => (
                  <label key={item.id}>
                    {item.label}
                    <input
                      type="checkbox"
                      checked={item.isChecked}
                      value={item.id}
                      onChange={handleChange}
                    />
                  </label>
                ))}

                {selectedSex.map(
                  (item) =>
                    item.isChecked &&
                    ((item.label === "Woman" && (
                      <div key={item.label}>
                        <Input
                          name="hips"
                          register={register}
                          options={{
                            required: {
                              value: true,
                              message: "this is required",
                            },
                            min: {
                              value: 50,
                              message: "the value cannot be less than 50",
                            },
                            max: {
                              value: 250,
                              message: "the value cannot be greater than 250",
                            },
                          }}
                          errors={errors}
                          type="number"
                          unit="cm"
                        />
                        <Input
                          name="neck"
                          register={register}
                          options={{
                            required: {
                              value: true,
                              message: "this is required",
                            },
                            min: {
                              value: 10,
                              message: "the value cannot be less than 10",
                            },
                            max: {
                              value: 60,
                              message: "the value cannot be greater than 60",
                            },
                          }}
                          errors={errors}
                          type="number"
                          unit="cm"
                        />
                        <Input
                          name="waist"
                          register={register}
                          options={{
                            required: {
                              value: true,
                              message: "this is required",
                            },
                            min: {
                              value: 40,
                              message: "the value cannot be less than 40",
                            },
                            max: {
                              value: 200,
                              message: "the value cannot be greater than 200",
                            },
                          }}
                          errors={errors}
                          type="number"
                          unit="cm"
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
                              value: 250,
                              message: "the value cannot be greater than 250",
                            },
                          }}
                          errors={errors}
                          type="number"
                          unit="cm"
                        />
                        <button type="submit">calculate</button>
                      </div>
                    )) ||
                      (item.label === "Men" && (
                        <div key={item.label}>
                          <Input
                            name="neck"
                            register={register}
                            options={{
                              required: {
                                value: true,
                                message: "this is required",
                              },
                              min: {
                                value: 10,
                                message: "the value cannot be less than 10",
                              },
                              max: {
                                value: 60,
                                message: "the value cannot be greater than 60",
                              },
                            }}
                            errors={errors}
                            type="number"
                            unit="cm"
                          />
                          <Input
                            name="waist"
                            register={register}
                            options={{
                              required: {
                                value: true,
                                message: "this is required",
                              },
                              min: {
                                value: 40,
                                message: "the value cannot be less than 40",
                              },
                              max: {
                                value: 200,
                                message: "the value cannot be greater than 200",
                              },
                            }}
                            errors={errors}
                            type="number"
                            unit="cm"
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
                                value: 250,
                                message: "the value cannot be greater than 250",
                              },
                            }}
                            errors={errors}
                            type="number"
                            unit="cm"
                          />
                          <Button text="Calculate" />
                        </div>
                      )))
                )}
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default BodyFatPage;
