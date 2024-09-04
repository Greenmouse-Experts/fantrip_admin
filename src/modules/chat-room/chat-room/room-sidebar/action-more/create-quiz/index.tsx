import { FC, useState } from "react";
import {
  Menu,
  Button as Bitton,
  MenuItem,
  MenuList,
  MenuHandler,
} from "@material-tailwind/react";
import QuizInput from "./quiz-input";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../../../hooks/authUser";
import { useChat } from "../../../../../../hooks/useChat";
import { FaChevronDown } from "react-icons/fa6";
import Button from "../../../../../../components/Button";
import { toast } from "react-toastify";

interface Props {
  socket: any;
  reload: () => void;
  close: () => void;
}
const CreateQuiz: FC<Props> = ({ socket, reload, close }) => {
  const navigate = useNavigate();
  const { token, isLoggedIn } = useAuth();
  const { community } = useChat();
  const [selectedChannel, setSelectedChannel] = useState({
    name: community.communities.length ? community.communities[0].name : "",
    id: community.communities.length ? community.communities[0].id : "",
  });

  //   quiz input
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [multiVote, setMultivote] = useState<boolean>(false);
  const [answer, setAnswer] = useState<number[]>([]);

  const onSubmit = () => {
    if (!isLoggedIn) {
      navigate("/auth/login");
      return;
    }
    if (!answer.length) {
      toast.info("Please select an answer");
    }
    const payload = {
      token: token,
      message: question,
      file: "",
      community: selectedChannel.id,
      chatType: "quiz",
      quizQuestion: {
        question: question,
        options: options,
        multipleVote: multiVote,
        rightAnswer: answer,
      },
    };
    socket.emit("createPost", payload);
    reload();
    setTimeout(() => {
      close();
    }, 300);
  };

  return (
    <div className="relative">
      {" "}
      <div className="absolute -top-8 right-0">
        <Menu>
          <MenuHandler>
            <Bitton className="bg-transparent p-0 m-0 text-black dark:text-white shadow-none">
              <div className="flex fs-400 gap-x-2 items-center">
                {selectedChannel.name}{" "}
                <FaChevronDown size={14} className="text-xs" />
              </div>
            </Bitton>
          </MenuHandler>
          <MenuList className="text-black !w-[200px]">
            {community.communities.map((item) => (
              <MenuItem
                key={item.id}
                className="!z-20"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedChannel({ id: item.id, name: item.name });
                }}
              >
                <p className="!text-black z-20">{item.name}</p>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </div>
      <QuizInput
        question={question}
        setQuestion={setQuestion}
        options={options}
        setOption={setOptions}
        multiVote={multiVote}
        setMultiVote={setMultivote}
        answer={answer}
        setAnswer={setAnswer}
      />
      <div className="mt-6">
        <Button title="Post" type="int" onClick={onSubmit} />
      </div>
    </div>
  );
};

export default CreateQuiz;
