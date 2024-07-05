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
import { PlaceItemInput } from "../../contracts/routine";
import { createSpot } from "../../services/api/place-api";

interface Props {
  close: () => void;
}
const AddPlace: FC<Props> = ({ close }) => {
  const [isBusy, setIsBusy] = useState(false);
  const [selectedImg, setSelectedImg] = useState<File[] | undefined>();
  const {revalidateRoute} = useRefetch()
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PlaceItemInput>({
    mode: "onChange",
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });
  const addAction = useMutation({
    mutationFn: createSpot,
    mutationKey: ["add-spots"],
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
          toast.success("Place added Successfully");
          setIsBusy(false);
          revalidateRoute("get-spots");
          close()
        },
        onError: (err:any) => {
          toast.error(err.response.data.message);
          setIsBusy(false);
        },
      });
    },
    onError: (err:any) => {
      toast.error(err.response.data.message);
      setIsBusy(false);
    },
  });

  const onSubmit = (data: PlaceItemInput) => {
    setIsBusy(true);
    if (selectedImg?.length) {
      const files = selectedImg[0];
      const fd = new FormData();
      fd.append("image", files);
      mutation.mutate(fd);
    } else {
      addAction.mutate(data, {
        onSuccess: () => {
          toast.success("Place added Successfully");
          setIsBusy(false);
          close()
        },
        onError: (err:any) => {
          toast.error(err.response.data.message);
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
              message: "Please enter place name",
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
        <ImageInput label="Spot Image/Icon" setImage={setSelectedImg} />
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

export default AddPlace;
