import { FC, useState } from "react";
import { QuizQuestion } from "../../../../../../../contracts/chat";
import useAuth from "../../../../../../../hooks/authUser";
import { extractNumbers } from "../../../../../../../utils/helper-function";

interface Props {
  data: QuizQuestion;
  socket: any;
  reload: () => void;
}
const QuizQuestionIndex: FC<Props> = ({ data, socket, reload }) => {
  const { token } = useAuth();
  const [showResult, setShowResult] = useState<number>();
  const [answer, setAnswer] = useState<number>(Number(extractNumbers(data.rightAnswer)[0]))
  const hasAttempt = data.attemptResults.find((where) => where.myAttempt);
  const markQuestion = (index: number) => {
    if (hasAttempt) {
      return;
    }
    const payload = {
      token: token,
      quizQuestionId: data.id,
      choice: [index],
    };
    socket.emit("attempt", payload);
    setShowResult(index);
    setAnswer(Number(extractNumbers(data.rightAnswer)[0]))
    reload();
  };

  const optionLabel = ["A", "B", "C", "D", "E", "F", "G"];

  return (
    <div className="p-2 mb-4 rounded-lg">
      <>
        {data.attemptResults.map((item, i) => (
          <div className="mb-4" key={i}>
            <div
              className="relative flex justify-between items-center cursor-pointer hover:scale-x-105 duration-100"
              onClick={() => markQuestion(i)}
            >
              <div
                className={`flex gap-x-2 items-center justify-between w-full bg-prima text-white rounded-full ${
                  showResult === i || item.myAttempt
                    ? "bg-[#FC819F]"
                    : "bg-primary"
                }`}
              >
                {/* <input type="radio" /> */}
                <div className={`absolute fw-500 shadow-xl w-12 h-12 circle place-center ${answer === i && hasAttempt? 'bg-green-500 text-white' : 'bg-white text-black'}`}>
                  <p>{optionLabel[i]}</p>
                </div>
                <p className="fs-500 pl-16 p-2">{item.option}</p>
                {hasAttempt && (
                  <p className="fs-500 fw-500 pr-3">{item.percentage}%</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </>
    </div>
  );
};

export default QuizQuestionIndex;
