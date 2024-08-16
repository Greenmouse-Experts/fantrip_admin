/* eslint-disable no-extra-boolean-cast */
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../../../components/TextInput";
import ImageInput from "../../../components/ImageInput";
import Button from "../../../components/Button";
import { BeatLoader } from "react-spinners";
import { Switch } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../../../services/api/routine";
import { useRefetch } from "../../../hooks/useRefetch";
import {  PlaceItemLocation } from "../../../contracts/routine";
import { updateTopPlace } from "../../../services/api/place-api";

interface Props {
  item: PlaceItemLocation | undefined;
  close: () => void;
}
const EditPlaceModal: FC<Props> = ({ item, close }) => {
  const [isBusy, setIsBusy] = useState(false);
  const [selectedImg, setSelectedImg] = useState<File[] | undefined>();
  const { revalidateRoute } = useRefetch();
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PlaceItemLocation>({
    mode: "onChange",
    defaultValues: {
      location: item?.location || "",
      picture: item?.picture || "",
      published: item?.published,
    },
  });
  const updateAction = async (payload: PlaceItemLocation) => {
    await updateTopPlace(item?.id || "", payload)
      .then(() => {
        toast.success("Place updated Successfully");
        setIsBusy(false);
        revalidateRoute("get-top-places");
        close();
      })
      .catch(() => {
        toast.error("Something went wrong");
        setIsBusy(false);
      });
  };
  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload:any = {
        location: watch("location"),
        published: watch("published"),
        imageUrl: data.image,
      };
      updateAction(payload);
    },
    onError: () => {
      toast.error("Something went wrong");
      setIsBusy(false);
    },
  });

  const onSubmit = (data: PlaceItemLocation) => {
    setIsBusy(true);
    if (!!selectedImg?.length) {
      const files = selectedImg[0];
      const fd = new FormData();
      fd.append("image", files);
      mutation.mutate(fd);
    } else {
      updateAction(data);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <Controller
          name="location"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter Place name",
            },
          }}
          render={({ field }) => (
            <TextInput
              label="Name"
              labelClassName="text-[#767676] fw-500 "
              type={InputType.text}
              error={errors.location?.message}
              {...field}
              ref={null}
            />
          )}
        />
        <Controller
          name="published"
          control={control}
          render={({ field }) => (
            <div className="flex gap-x-4 items-center">
              <label className="text-[#767676] fw-500 ">published</label>
              <div className="pt-1">
                <Switch
                  crossOrigin={""}
                  checked={field.value}
                  onChange={field.onChange}
                  color="green"
                />
              </div>
            </div>
          )}
        />
        <ImageInput
          prevValue={item?.picture}
          label="Location Image"
          setImage={setSelectedImg}
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

export default EditPlaceModal;
