
import React, { FC } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { toast } from "react-toastify";
import TextInput, { InputType } from "../../../../../../components/TextInput";
import { Switch } from "@material-tailwind/react";

interface Props {
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
  setOption: React.Dispatch<React.SetStateAction<string[]>>;
  multiVote: boolean;
  setMultiVote: React.Dispatch<React.SetStateAction<boolean>>;
  answer: number[];
  setAnswer: React.Dispatch<React.SetStateAction<number[]>>;
}
const QuizInput: FC<Props> = ({
  question,
  setQuestion,
  options,
  setOption,
  multiVote,
  setMultiVote,
  answer,
  setAnswer,
}) => {

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
          <div className="flex items-stretch">
            <div className="w-full">
              <TextInput
                type={InputType.text}
                placeholder={`Option ${i + 1}`}
                value={item}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleEditOptions(i, e.target.value)
                }
                key={i}
              />
            </div>
            <div
              className={`w-[60px] shrink-0 border rounded-lg m-1 cursor-pointer hover:bg-prima ${
                answer[0] === i ? "bg-prima" : ""
              }`}
              onClick={() => setAnswer([i])}
            ></div>
          </div>
        ))}
        <div className="mt-3 flex justify-end">
          <MdAddCircleOutline
            className="text-[#FC819F] text-2xl fw-600 cursor-pointerxx"
            onClick={handleAddNewInput}
          />
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

export default QuizInput;
