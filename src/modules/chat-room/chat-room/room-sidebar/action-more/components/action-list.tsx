import { BsFillBarChartLineFill } from "react-icons/bs";
import { GoChevronRight } from "react-icons/go";
import { MdQuiz } from "react-icons/md";
import CreateQuiz from "../create-quiz";
import CreatePoll from "../creat-poll";
import useDialog from "../../../../../../hooks/useDialog";
import { FC } from "react";

interface Props {
  socket: any;
  reload: () => void;
}
const ActionLists:FC<Props> = ({socket, reload}) => {

  const { Dialog, setShowModal } = useDialog();
  const { Dialog:Quiz, setShowModal:ShowQuiz } = useDialog();

  
  return (
    <>
      <div className="h-[200px]">
        <ul className="grid gap-6">
          <li
            className="flex cursor-pointer lg:pr-2 justify-between items-center"
            onClick={() => setShowModal(true)}
          >
            <p className="flex items-center  gap-x-4">
              <BsFillBarChartLineFill className="text-lg lg:text-xl" />
              <span>Create Poll</span>
            </p>
            <GoChevronRight className="text-[#8C8C8C]" />
          </li>
          <li
            className="flex cursor-pointer lg:pr-2 justify-between items-center"
            onClick={() => ShowQuiz(true)}
          >
            <p className="flex items-center  gap-x-4">
              <MdQuiz className="text-lg lg:text-xl" />
              <span>Game Quiz</span>
            </p>
            <GoChevronRight className="text-[#8C8C8C]" />
          </li>
          {/* <li
            onClick={() => navigate("/community-guidelines")}
            className="flex cursor-pointer lg:pr-2 justify-between items-center"
          >
            <p className="flex items-center  gap-x-4">
              <FaFile className="text-lg lg:text-xl" />
              <span>Guidelines</span>
            </p>
            <GoChevronRight className="text-[#8C8C8C]" />
          </li> */}
        </ul>
      </div>
      <Dialog title="Create Poll" size="md">
        <CreatePoll
          socket={socket}
          reload={reload}
          close={() => setShowModal(false)}
        />
      </Dialog>
      <Quiz title="Create Quiz" size="md">
        <CreateQuiz
          socket={socket}
          reload={reload}
          close={() => ShowQuiz(false)}
        />
      </Quiz>
    </>
  );
};

export default ActionLists;
