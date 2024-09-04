import { FC, useState } from "react";
import dayjs from "dayjs";
import useAuth from "../../../../../../../hooks/authUser";
import { PollQuestion } from "../../../../../../../contracts/chat";

interface Props {
  data: PollQuestion;
  socket: any;
  reload: () => void;
}
const PollQuestionIndex: FC<Props> = ({ data, socket, reload }) => {
  const { token } = useAuth();
  // const [showPoll, setShowPoll] = useState(false)
  const [showResult, setShowResult] = useState<string>(
    dayjs().isBefore(dayjs(data.expiryDate)) ? "" : data.id
  );

  const hasTrueValue = data.voteResults.find((where) => where.myVote);

  const markQuestion = (index: number) => {
    const payload = {
      token: token,
      pollQuestionId: data.id,
      choice: index,
    };
    socket.emit("voteUnvote", payload);
    setShowResult(data.id);
    reload();
  };

  return (
    <div className="p-2 mb-4 rounded-lg glass">
      {showResult === data.id || hasTrueValue ? (
        <>
          {data?.voteResults?.map((item, i) => (
            <div
              className={`border scale-ani border-gray-300 rounded-lg px-3 mb-2 py-2`}
              key={i}
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-x-2 items-center">
                  <input type="radio" checked={item.myVote} disabled />
                  <p className="fs-400">{item.option}</p>
                </div>
                <div>
                  <p className="fs-400">
                    {item.total} {item.total > 1 ? "votes" : "vote"}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <div className="relative bg-gray-200 h-[15px] rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.percentage}%` }}
                    className="bg-[#9847FE] h-full"
                  ></div>
                  <p
                    className={`text-[9px] absolute top-[1px] fw-500  w-full text-center ${
                      item.percentage > 45 ? "text-white" : "text-black"
                    }`}
                  >
                    {item.percentage}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {data.options.map((item, i) => (
            <div className="mb-2" key={i}>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => markQuestion(i)}
              >
                <div className="flex gap-x-2 items-center">
                  <input type="radio" />
                  <p className="fs-500">{item}</p>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PollQuestionIndex;
