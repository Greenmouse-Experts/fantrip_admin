
import { FC, useState } from "react";
import { BsChatDots, BsFillHouseCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import AltName from "../../../../../../../components/alt-name";
import { formatName } from "../../../../../../../utils/formatHelp";
import { useChat } from "../../../../../../../hooks/useChat";
import { useUtils } from "../../../../../../../hooks/useUtils";

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
    favTeam: string;
    bio: string;
  };
  close: () => void;
}
const ProfileModal: FC<Props> = ({ user, close }) => {
  const { saveGuestInfo } = useChat();
  const { toggleStayChatmodal: setShowModal } = useUtils();
  const [initLength, setInitLength] = useState<number>(150);
  const navigate = useNavigate()

  const handleViewAll = () => {
    const num = initLength === 400 ? 150 : 400;
    setInitLength(num);
  };

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
    saveGuestInfo(payload, '');
    setShowModal(true);
    close();
  };

  return (
    <div>
      <div className="lg:m-2 p-4 meet-drop rounded-[23px] bg-white dark:bg-darkColor">
        <div className="flex">
          <div className="w-5/12 text-center">
            <div className="w-7/12 mx-auto aspect-square rounded-full bg-gray-400">
              {user?.picture && (
                <img
                  src={user?.picture}
                  alt="profile"
                  className="w-full h-full object-cover circle"
                />
              )}
            </div>
            <p className="fw-600  lg:text-xl my-1">
              <AltName
                name={`${user?.firstName} ${user?.lastName}`}
                nick={user.nickname}
                useNick={user.isNickname}
              />
            </p>
            <p className="fw-600 text-orange-600 fs-500">{user?.favTeam}</p>
          </div>
          <div className="w-7/12 flex justify-center">
            <div className="w-10/12 grid divide-y-2">
              <div>
                <p>
                  {formatName(user?.bio, initLength)}
                  {user?.bio?.length > 150 && (
                    <span className="fw-500 text-prima" onClick={handleViewAll}>
                      view {initLength === 150?'more' : 'less'}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <button
            onClick={() => openChatWithUser()}
            className="flex gap-x-2 p-2 fs-400 md:fs-600 items-center fw-500 dark:text-white"
          >
            <BsChatDots className="dark:text-white" />
            Chat with{" "}
            <AltName
              name={`${user?.firstName} ${user?.lastName}`}
              nick={user.nickname}
              useNick={user.isNickname}
            />
          </button>
          {user.role === "host" && <button
            onClick={() => navigate(`/users/host/${user.id}`)}
            className="flex gap-x-2 p-2 fs-400 md:fs-600 items-center fw-500 text-left dark:text-white"
          >
            <BsFillHouseCheckFill className="dark:text-white text-lg shink-0" />{" "}
            <div className="inline-block gap-x-1">
              <p className="inline">View</p>
              {" "}
              <AltName
                name={`${user?.firstName} ${user?.lastName}`}
                nick={user.nickname}
                useNick={user.isNickname}
              />{" "}
              <p className="inline">profile</p>
            </div>
          </button>}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
