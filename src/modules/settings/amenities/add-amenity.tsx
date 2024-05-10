import { FC, useState } from "react";
import { AmenityItemInput } from "../../../contracts/routine";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../../../components/TextInput";
import ImageInput from "../../../components/ImageInput";
import Button from "../../../components/Button";
import { BeatLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../../../services/api/routine";
import { toast } from "react-toastify";
import { createAmenity } from "../../../services/api/amenities-api";
import { useRefetch } from "../../../hooks/useRefetch";

interface Props {
  close: () => void;
}
const AddAmenity: FC<Props> = ({ close }) => {
  const [isBusy, setIsBusy] = useState(false);
  const [selectedImg, setSelectedImg] = useState<File[] | undefined>();
  const {revalidateRoute} = useRefetch()
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AmenityItemInput>({
    mode: "onChange",
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });
  const addAction = useMutation({
    mutationFn: createAmenity,
    mutationKey: ["add-amenity"],
  });
  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      const payload = {
        name: watch("name"),
        imageUrl: data.image,
      };
      addAction.mutate(payload, {
        onSuccess: () => {
          toast.success("Amenity added Successfully");
          setIsBusy(false);
          revalidateRoute("get-amenties");
          close()
        },
        onError: () => {
          toast.error("Something went wrong");
          setIsBusy(false);
        },
      });
    },
    onError: () => {
      toast.error("Something went wrong");
      setIsBusy(false);
    },
  });

  const onSubmit = (data: AmenityItemInput) => {
    setIsBusy(true);
    if (selectedImg?.length) {
      const files = selectedImg[0];
      const fd = new FormData();
      fd.append("image", files);
      mutation.mutate(fd);
    } else {
      addAction.mutate(data, {
        onSuccess: () => {
          toast.success("Amenity added Successfully");
          setIsBusy(false);
          close()
        },
        onError: () => {
          toast.error("Something went wrong");
          setIsBusy(false);
        },
      });
    }
  };
  return (
    <div className="mt-3">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <Controller
          name="name"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter amenity name",
            },
          }}
          render={({ field }) => (
            <TextInput
              label="Name"
              labelClassName="text-[#767676] fw-500 "
              type={InputType.text}
              error={errors.name?.message}
              {...field}
              ref={null}
            />
          )}
        />
        <ImageInput label="Amenity Image/Icon" setImage={setSelectedImg} />
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

export default AddAmenity;
