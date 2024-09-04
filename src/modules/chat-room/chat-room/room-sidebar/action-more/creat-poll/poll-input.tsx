import { FC, useEffect, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { isNumber } from "../../../../../../utils/formatHelp";
import TextInput, { InputType } from "../../../../../../components/TextInput";
import { Switch } from "@material-tailwind/react";

interface Props {
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
  setOption: React.Dispatch<React.SetStateAction<string[]>>;
  expiresAt: string;
  setExpiresAt: React.Dispatch<React.SetStateAction<string>>;
  multiVote: boolean;
  setMultiVote: React.Dispatch<React.SetStateAction<boolean>>;
}
const PollInput: FC<Props> = ({
  options,
  setOption,
  setExpiresAt,
  multiVote,
  setMultiVote,
  question,
  setQuestion,
}) => {
  const [duration, setDuration] = useState<{
    days: number | null;
    hours: number | null;
    minute: number | null;
  }>({
    days: null,
    hours: null,
    minute: null,
  });

  const handleAddNewInput = () => {
    if (options.length <= 5) setOption([...options, ""]);
  };

  const handleEditOptions = (index: number, newValue: string) => {
    if (index < 0 || index >= options.length) {
      toast.info("Input not available");
      return;
    }
    const updatedArray = [...options];

    updatedArray[index] = newValue;

    setOption(updatedArray);
  };

  const handleDuration = (key: string, value: string) => {
    const inputValue = Number(value);
    if (!isNumber(inputValue)) {
      toast.info("Only accepts a set of numbers");
      return;
    }
    if (key === "days") {
      if (inputValue > 5 || inputValue < 0) {
        toast.info("Days value is out of bounds");
        return;
      } else {
        setDuration({ ...duration, days: inputValue });
      }
    } else if (key === "hours") {
      if (inputValue > 23 || inputValue < 0) {
        toast.info("Hours value is out of bounds");
        return;
      } else {
        setDuration({ ...duration, hours: inputValue });
      }
    } else if (key === "minute") {
      if (inputValue > 59 || inputValue < 0) {
        toast.info("Minutes value is out of bounds");
        return;
      } else {
        setDuration({ ...duration, minute: inputValue });
      }
    } else {
      return;
    }
  };

  const calculateTime = () => {
    const days = duration.days || 0;
    const hours = duration.hours || 0;
    const minutes = duration.minute || 0;
    const updatedDateTime = new Date();

    // Add days
    updatedDateTime.setDate(updatedDateTime.getDate() + days);

    // Add hours
    updatedDateTime.setHours(updatedDateTime.getHours() + hours);

    // Add minutes
    updatedDateTime.setMinutes(updatedDateTime.getMinutes() + minutes);

    // Update state with the new date and time
    setExpiresAt(dayjs(updatedDateTime).format("YYYY-MM-DDThh:mm"));
  };

  useEffect(() => {
    calculateTime();
  }, [duration]);

  return (
    <div>
      <div>
        <TextInput
          type={InputType.textarea}
          placeholder="Ask a Question"
          value={question}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuestion(e.target.value)
          }
        />
      </div>
      <div className="mt-3">
        {options.map((item, i) => (
          <TextInput
            type={InputType.text}
            placeholder={`Option ${i + 1}`}
            value={item}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleEditOptions(i, e.target.value)
            }
            key={i}
          />
        ))}
        <div className="mt-3 flex justify-end">
          <MdAddCircleOutline
            className="text-[#FC819F] text-2xl fw-600 cursor-pointerxx"
            onClick={handleAddNewInput}
          />
        </div>
      </div>
      <div>
        <p>Poll Duraion</p>
        <div className="grid grid-cols-3 gap-x-5">
          <div>
            <TextInput
              type={InputType.number}
              placeholder={`Days`}
              value={duration.days}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleDuration("days", e.target.value)
              }
            />
          </div>
          <div>
            <TextInput
              type={InputType.text}
              placeholder={`Hours`}
              value={duration.hours}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleDuration("hours", e.target.value)
              }
            />
          </div>
          <div>
            <TextInput
              type={InputType.text}
              placeholder={`Minutes`}
              value={duration.minute}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleDuration("minute", e.target.value)
              }
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-x-4 mt-4">
        <p>Allow Multiple Votes</p>
        <Switch
          crossOrigin={''}
          value={"multiVote"}
          checked={multiVote}
          onChange={() => setMultiVote(!multiVote)}
        />
      </div>
    </div>
  );
};

export default PollInput;
