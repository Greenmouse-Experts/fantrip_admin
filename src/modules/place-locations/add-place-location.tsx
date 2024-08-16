/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../../components/TextInput";
import ImageInput from "../../components/ImageInput";
import Button from "../../components/Button";
import { BeatLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../../services/api/routine";
import { toast } from "react-toastify";
import { useRefetch } from "../../hooks/useRefetch";
import { PlaceItemLocation } from "../../contracts/routine";
import { createPlace } from "../../services/api/place-api";
import SelectInput from "../../components/select";

interface SpotItem {
  id: string;
  name: string;
}

interface Props {
  close: () => void;
  spots: SpotItem[];
  isgettingSpot: boolean;
}

const AddPlaceLocation: FC<Props> = ({ close, spots, isgettingSpot }) => {
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
      location: "",
      spot: "",
      imageUrl: "",
    },
  });

  const addAction = useMutation({
    mutationFn: createPlace,
    mutationKey: ["add-place"],
  });

  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      const spotName = watch("spot");
      const spotID = spots.find((spot) => spot.name === spotName)?.id;

      const payload:any = {
        location: watch("location"),
        spot: spotID,
        picture: data.image,
      };

      addAction.mutate(payload, {
        onSuccess: () => {
          toast.success("Place added Successfully");
          setIsBusy(false);
          revalidateRoute("get-top-places");
          close();
        },
        onError: (err: any) => {
          toast.error(err.response.data.message);
          setIsBusy(false);
        },
      });
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
      setIsBusy(false);
    },
  });

  const onSubmit = (data: PlaceItemLocation) => {
    setIsBusy(true);

    if (selectedImg?.length) {
      const files = selectedImg[0];
      const fd = new FormData();
      fd.append("image", files);
      mutation.mutate(fd);
    } else {
      const spotName = watch("spot");
      const spotID = spots.find((spot) => spot.name === spotName)?.id;

      addAction.mutate({ ...data, spot: spotID,}, {
        onSuccess: () => {
          toast.success("Place added Successfully");
          setIsBusy(false);
          close();
        },
        onError: (err: any) => {
          toast.error(err.response.data.message);
          setIsBusy(false);
        },
      });
    }
  };

  if (isgettingSpot) return <div>Loading...</div>;

  const spotNames = spots?.map((item) => item.name) || [];

  return (
    <div className="mt-3">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <Controller
          name="location"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter place location",
            },
          }}
          render={({ field }) => (
            <TextInput
              label="Location"
              labelClassName="text-[#767676] fw-500"
              type={InputType.text}
              error={errors.location?.message}
              {...field}
              ref={null}
            />
          )}
        />
        <Controller
          name="spot"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please select a spot",
            },
          }}
          render={({ field }) => (
            <SelectInput
              id="spot"
              label="Select Spot"
              items={spotNames}
              handleChange={field.onChange}
              value={field.value}
              placeholder="Select spot"
              error={errors.spot?.message}
            />
          )}
        />
        <ImageInput label="Place Image" setImage={setSelectedImg} />
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

export default AddPlaceLocation;
