import React, { ChangeEvent, FC } from "react";
import { BeatLoader } from "react-spinners";
import TextInput, { InputType } from "../../../../../../components/TextInput";
import ImageInput from "../../../../../../components/ImageInput";
import Button from "../../../../../../components/Button";

interface Props {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<File[] | undefined>>;
  icon: string;
  isBusy: boolean;
  handleSubmit: () => void;
}
const EditForm: FC<Props> = ({
  name,
  setName,
  setImage,
  isBusy,
  icon,
  handleSubmit,
}) => {
  return (
    <div>
      <div>
        <TextInput
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          type={InputType.text}
        />
      </div>
      <div>
        <ImageInput label="" setImage={setImage} prevValue={icon} />
      </div>
      <div className="flex justify-end mt-2">
        <Button
          title={isBusy ? <BeatLoader /> : "Update"}
          onClick={handleSubmit}
          altClassName="btn-primary px-6 py-2"
        />
      </div>
    </div>
  );
};

export default EditForm;
