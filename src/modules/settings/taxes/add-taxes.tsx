import { FC, useState } from "react";
import { AddTaxItem } from "../../../contracts/routine";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../../../components/TextInput";
import { Country } from "country-state-city";
import Button from "../../../components/Button";
import { BeatLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRefetch } from "../../../hooks/useRefetch";
import { createTax } from "../../../services/api/taxes-api";

interface Props {
  close: () => void;
}
const AddTaxes: FC<Props> = ({ close }) => {
  const [isBusy, setIsBusy] = useState(false);
  const { revalidateRoute } = useRefetch();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AddTaxItem>({
    mode: "onChange",
    defaultValues: {
      rate: 0,
      country: "",
    },
  });
  const addAction = useMutation({
    mutationFn: createTax,
    mutationKey: ["add-taxes"],
  });
  const onSubmit = (data: AddTaxItem) => {
    const payload = {
        rate: Number(data.rate),
        country: data.country
    }
    setIsBusy(true);
    addAction.mutate(payload, {
      onSuccess: () => {
        toast.success("Property added Successfully");
        revalidateRoute("get-taxes");
        setIsBusy(false);
        close();
      },
      onError: () => {
        toast.error("Something went wrong");
        setIsBusy(false);
      },
    });
  };
  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
        <Controller
          name="country"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Value is required",
            },
          }}
          render={({ field }) => (
            <div>
              <p className="text-[#767676] fw-500 mb-1">Country</p>
              <select
                {...field}
                className="p-3 w-full border border-gray-400 rounded-lg outline-none"
              >
                {Country.getAllCountries().map((item) => (
                  <option value={item.name} key={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        />
        <Controller
          name="rate"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter tax rate",
            },
            min: 1,
            max: 99,
          }}
          render={({ field }) => (
            <TextInput
              label="Tax Rate (%)"
              labelClassName="text-[#767676] fw-500 "
              type={InputType.number}
              error={errors.rate?.message}
              {...field}
              ref={null}
            />
          )}
        />
        <div className="mt-7">
          <Button
            title={isBusy ? <BeatLoader size={12} color="white" /> : "Submit"}
            type="int"
            disabled={!isValid || isBusy}
          />
        </div>
      </form>
    </div>
  );
};

export default AddTaxes;
