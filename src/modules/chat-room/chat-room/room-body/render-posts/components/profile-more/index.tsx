import {
  Menu,
  Button,
  MenuItem,
  MenuList,
  MenuHandler,
} from "@material-tailwind/react";
import { FC } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import useAuth from "../../../../../../../hooks/authUser";
import { useChat } from "../../../../../../../hooks/useChat";
import { useUtils } from "../../../../../../../hooks/useUtils";
import useDialog from "../../../../../../../hooks/useDialog";
import ReusableModal from "../../../../../../../components/ReusableModal";

interface Props {
  user: {
    firstName: string;
    lastName: string;
    nickname: string;
    verifiedAsHost: boolean;
    role: string;
    picture: string;
    isNickname: boolean;
    id: string;
  };
  id: string;
  socket: any;
}
const ProfileMore: FC<Props> = ({ user, id, socket }) => {
  const { token } = useAuth();
  const { saveGuestInfo } = useChat();
  const { toggleStayChatmodal: setShowModal } = useUtils();
  const { Dialog, setShowModal: ShowDialog } = useDialog();

  const openChatWithUser = () => {
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      nickname: user.nickname,
      verifiedAsHost: user.verifiedAsHost,
      role: user.role,
      picture: user.picture,
    };
    saveGuestInfo(payload, "");
    setShowModal(true);
    close();
  };

  const deleteUserPost = () => {
    const payload = {
      token: token,
      id: id,
    };
    socket.emit("deletePost", payload);
  };

  return (
    <div>
      <div>
        <Menu>
          <MenuHandler>
            <Button className="bg-transparent p-0 m-0 text-black shadow-none">
              <div className="flex gap-x-2 items-center">
                <BsThreeDotsVertical size={19} className="text-2xl" />
              </div>
            </Button>
          </MenuHandler>
          <MenuList className="text-black !w-[200px]">
            <MenuItem onClick={openChatWithUser}>
              <p className="text-black fs-400">Start Chat</p>
            </MenuItem>
            <MenuItem>
              <p className="text-black fs-400">View User Profile</p>
            </MenuItem>
            <MenuItem onClick={() => ShowDialog(true)}>
              <p className="text-red-500 fs-400">Delete Post</p>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      <Dialog title="" size="sm">
        <ReusableModal
          title="Are you sure you want to delete this post"
          action={deleteUserPost}
          actionTitle="Yes, Delete"
          cancelTitle="No, Close"
          closeModal={() => ShowDialog(false)}
          isBusy={false}
        />
      </Dialog>
    </div>
  );
};

export default ProfileMore;
