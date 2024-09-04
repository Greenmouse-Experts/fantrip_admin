import { FC, useEffect, useRef, useState } from "react";
import { IoImageOutline, IoVideocamOutline } from "react-icons/io5";
import {
  Menu,
  Button,
  MenuItem,
  MenuList,
  MenuHandler,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { FaChevronDown } from "react-icons/fa6";
import useAuth from "../../../../../../hooks/authUser";
import {
  uploadImage,
  uploadVideo,
} from "../../../../../../services/api/routine";
import DisplayInput from "./display-input";
import { useChat } from "../../../../../../hooks/useChat";

interface Props {
  socket: any;
  setReload: () => void;
}
const IndexDisplayUi: FC<Props> = ({ socket, setReload }) => {
  const { user, token } = useAuth();
  const { community } = useChat();
  const [showInput, setShowInput] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState({
    name: community.communities?.length ? community.communities[0].name : "",
    id: community.communities?.length ? community.communities[0].id : "",
  });
  const postRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (postRef.current && !postRef.current.contains(event.target as Node)) {
      setShowInput(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // input for post
  const [isBusy, setIsBusy] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [photo, setPhoto] = useState<File[] | undefined>([]);
  const [video, setVideo] = useState<File[] | undefined>([]);

  // handle show input
  const handleShowInput = () => {
    setShowInput(!showInput);
  };

  const handlePost = () => {
    setIsBusy(true);
    const payload = {
      token: token,
      message: textInput,
      file: null,
      community: selectedChannel.id,
    };
    if (photo?.length) {
      const files = photo[0];
      const fd = new FormData();
      fd.append("image", files);
      uploadImage(fd)
        .then((res) => {
          payload.file = res.image;
          socket.emit("createPost", payload);
          setIsBusy(false);
          setTextInput("");
          setPhoto([]);
          setShowInput(false);
          setReload();
        })
        .catch((error: any) => {
          toast.error(error.response.data.message);
          setIsBusy(false);
        });
    } else if (video?.length) {
      const files = video[0];
      const fd = new FormData();
      fd.append("video", files);
      uploadVideo(fd)
        .then((res) => {
          payload.file = res.video;
          socket.emit("createPost", payload);
          setIsBusy(false);
          setTextInput("");
          setVideo([]);
          setShowInput(false);
          setReload();
        })
        .catch((error: any) => {
          toast.error(error.response.data.message);
          setIsBusy(false);
        });
    } else {
      socket.emit("createPost", payload);
      setIsBusy(false);
      setTextInput("");
      setPhoto([]);
      setShowInput(false);
      setReload();
    }
  };

  return (
    <div className="relative">
      <div
        onClick={() => handleShowInput()}
        className={`border border-[#D2D2D2] flex items-center justify-between cursor-pointer p-[2px] pl-1 pr-5 ${
          showInput
            ? "rounded-t-[18px] pt-[3px] border-b-white"
            : "rounded-full"
        }`}
      >
        <div className="flex gap-x-6 items-center">
          <div className="w-[32px] h-[32px] bg-gradient p-[1px] circle">
            <img
              src={
                user.image ||
                "https://res.cloudinary.com/greenmouse-tech/image/upload/v1721902661/fantrip/avatars_cyhkdy.webp"
              }
              alt="profile"
              className="w-full h-full circle object-cover"
            />
          </div>
          <p className="fw-500">Make a Post!!</p>
        </div>
        <div className="">
          {showInput ? (
            ""
          ) : (
            <div className="flex gap-x-3">
              <IoImageOutline className="text-[#8C8C8C] text-lg" />
              <IoVideocamOutline className="text-[#8C8C8C] text-lg" />
            </div>
          )}
        </div>
      </div>
      {showInput && (
        <div
          ref={postRef}
          className={`border-b border-x border-[#D2D2D2] z-[1] absolute w-full p-2 bg-white dark:bg-darkColor rounded-b-xl`}
        >
          <div className="absolute z-[20] -top-7 right-5">
            <Menu ref={postRef as any}>
              <MenuHandler>
                <Button className="bg-transparent p-0 m-0 text-black dark:text-white shadow-none">
                  <div className="flex fs-400 gap-x-2 items-center">
                    {selectedChannel.name}{" "}
                    <FaChevronDown size={14} className="text-xs" />
                  </div>
                </Button>
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
          <DisplayInput
            isBusy={isBusy}
            text={textInput}
            setText={setTextInput}
            photos={photo || []}
            setImage={setPhoto}
            video={video || []}
            setVideo={setVideo}
            handlePost={handlePost}
          />
        </div>
      )}
    </div>
  );
};

export default IndexDisplayUi;
