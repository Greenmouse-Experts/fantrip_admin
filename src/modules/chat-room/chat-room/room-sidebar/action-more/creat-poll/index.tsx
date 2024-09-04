import { FC, useState } from "react";
import PollInput from "./poll-input";
import {
  Menu,
  Button as Bitton,
  MenuItem,
  MenuList,
  MenuHandler,
} from "@material-tailwind/react";
import useAuth from "../../../../../../hooks/authUser";
import { useChat } from "../../../../../../hooks/useChat";
import { FaChevronDown } from "react-icons/fa6";
import Button from "../../../../../../components/Button";

interface Props {
  socket: any;
  reload: () => void;
  close: () => void;
}
const CreatePoll: FC<Props> = ({ socket, reload, close }) => {
  const { token } = useAuth();
  const { community } = useChat();
  const [selectedChannel, setSelectedChannel] = useState({
    name: community.communities.length ? community.communities[0].name : "",
    id: community.communities.length ? community.communities[0].id : "",
  });

  //   poll input
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [expiresAt, setExpiresAt] = useState<string>("");
  const [multiVote, setMultivote] = useState<boolean>(false);

  const onSubmit = () => {
    const payload = {
      token: token,
      message: question,
      file: "",
      community: selectedChannel.id,
      chatType: "poll",
      pollQuestion: {
        question: question,
        options: options,
        expiryDate: expiresAt,
        multipleVote: multiVote,
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
      <PollInput
        question={question}
        setQuestion={setQuestion}
        options={options}
        setOption={setOptions}
        multiVote={multiVote}
        setMultiVote={setMultivote}
        expiresAt={expiresAt}
        setExpiresAt={setExpiresAt}
      />
      <div className="mt-6">
        <Button title="Post" type="int" onClick={onSubmit} />
      </div>
    </div>
  );
};

export default CreatePoll;
