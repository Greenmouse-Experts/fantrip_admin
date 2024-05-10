import { FC, useState } from "react";
import { AmenityItem, AmenityItemInput } from "../../../../contracts/routine";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../../../../components/TextInput";
import ImageInput from "../../../../components/ImageInput";
import Button from "../../../../components/Button";
import { BeatLoader } from "react-spinners";
import { Switch } from "@material-tailwind/react";
import { updateAmenity } from "../../../../services/api/amenities-api";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../../../../services/api/routine";
import { useRefetch } from "../../../../hooks/useRefetch";

interface Props {
  item: AmenityItem | undefined;
  close: () => void;
}
const EditAmenityModal: FC<Props> = ({ item, close }) => {
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
      name: item?.name || "",
      imageUrl: item?.imageUrl || "",
      isPublished: item?.isPublished,
    },
  });
  const updateAction = async (payload: AmenityItemInput) => {
    await updateAmenity(item?.id || "", payload)
      .then(() => {
        toast.success("Amenity updated Successfully");
        setIsBusy(false);
        revalidateRoute("get-amenties");
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
      const payload = {
        name: watch("name"),
        isPublished: watch("isPublished"),
        imageUrl: data.image,
      };
      updateAction(payload);
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
      updateAction(data);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <Controller
          name="name"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter Amenity name",
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
        <Controller
          name="isPublished"
          control={control}
          render={({ field }) => (
            <div className="flex gap-x-4 items-center">
              <label className="text-[#767676] fw-500 ">Published</label>
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
        <ImageInput
          prevValue={item?.imageUrl}
          label="Amenity Image/Icon"
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

export default EditAmenityModal;
