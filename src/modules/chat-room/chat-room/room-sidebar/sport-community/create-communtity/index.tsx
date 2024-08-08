import { useState } from "react";
import io from "socket.io-client";
import { SOCKET_URL } from "../../../../../../services/constant";
import useAuth from "../../../../../../hooks/authUser";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../../../../../../services/api/routine";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../../../../../../components/TextInput";
import ImageInput from "../../../../../../components/ImageInput";
import { BeatLoader } from "react-spinners";
import Button from "../../../../../../components/Button";

export interface CreateProps {
  token: string;
  name: string;
  icon: string;
  isDisclosed: boolean;
}
const socket = io(`${SOCKET_URL}`);
const CreateCommunity = () => {
  const { token } = useAuth();
  const [isBusy, setIsBusy] = useState(false);
  const [iconInput, setIconInput] = useState<File[] | undefined>([]);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const handleSend = (data: any) => {
    socket.emit("createCommunity", {
      name: data.name,
      icon: data.imageUrl,
      isDisclosed: true,
      token: `${token}`,
    });
  };

  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      const payload = {
        name: watch("name"),
        imageUrl: data.image,
      };
      handleSend(payload);
    },
    onError: () => {
      toast.error("Something went wrong");
      setIsBusy(false);
    },
  });
  const onSubmit = (data: any) => {
    setIsBusy(true);
    if (iconInput?.length) {
      const files = iconInput[0];
      const fd = new FormData();
      fd.append("image", files);
      mutation.mutate(fd);
    } else {
      handleSend({ name: data.name, imageUrl: null });
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
        <ImageInput label="Amenity Image/Icon" setImage={setIconInput} />
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

export default CreateCommunity;
