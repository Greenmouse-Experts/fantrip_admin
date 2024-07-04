import { FC, useState } from "react";
import { AddTaxItem, TaxItem } from "../../../../contracts/routine";
import { Controller, useForm } from "react-hook-form";
import { Country } from "country-state-city";
import TextInput, { InputType } from "../../../../components/TextInput";
import Button from "../../../../components/Button";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useRefetch } from "../../../../hooks/useRefetch";
import { updateTax } from "../../../../services/api/taxes-api";
import { Switch } from "@material-tailwind/react";

interface Props {
  item: TaxItem | undefined;
  close: () => void;
}
const EditTaxModal: FC<Props> = ({ item, close }) => {
  const [isBusy, setIsBusy] = useState(false);
  const { revalidateRoute } = useRefetch();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AddTaxItem>({
    mode: "onChange",
    defaultValues: {
      rate: Number(item?.rate) || 0,
      country: item?.country || "",
      isActive: item?.isActive
    },
  });
  const onSubmit = async (data: AddTaxItem) => {
    setIsBusy(true);
    await updateTax(item?.id || "", data)
      .then(() => {
        toast.success("Tax record updated Successfully");
        setIsBusy(false);
        revalidateRoute("get-taxes");
        close();
      })
      .catch(() => {
        toast.error("Something went wrong");
        setIsBusy(false);
      });
  };
  return (
    <div>
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
            <div className="mt-5">
              <p className="text-[#767676] fw-500 mb-1">Country</p>
              <select
                {...field}
                disabled
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
          name="isActive"
          control={control}
          render={({ field }) => (
            <div className="flex gap-x-4 items-center mt-1">
              <label className="text-[#767676] fw-500 ">Active</label>
              <div className="pt-1">
                <Switch
                  crossOrigin={""}
                  checked={field.value}
                  onChange={field.onChange}
                />
              </div>
            </div>
          )}
        />
        <Controller
          name="rate"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter Property name",
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
            title={isBusy ? <BeatLoader size={12} color="white" /> : "Update"}
            type="int"
            disabled={!isValid || isBusy}
          />
        </div>
      </form>
    </div>
  );
};

export default EditTaxModal;
