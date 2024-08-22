import { FC, useState } from "react";
import { CommunityItemTyping } from "../community-list";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../../../../../../services/api/routine";
import { toast } from "react-toastify";
import useAuth from "../../../../../../hooks/authUser";
import EditForm from "./edit-form";
import DeleteList from "./delete-list";

interface Props {
  item: CommunityItemTyping;
  socket: any;
  setChange: React.Dispatch<React.SetStateAction<string>>;
}
const ItemRender: FC<Props> = ({ item, socket, setChange }) => {
  const { token } = useAuth();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [name, setName] = useState(item.name);
  const [isBusy, setIsBusy] = useState(false);
  const [isDisclosed, setIsDisclosed] = useState(item.isDisclosed)

  const [image, setImage] = useState<File[] | undefined>();

  const handleDelete = () => {
    socket.emit("deleteCommunity", {
      id: item.id,
      token: `${token}`,
    });
    setIsBusy(false);
    setShowDelete(false);
    setChange(`${new Date()}`);
  };

  const handleSend = (data: any) => {
    socket.emit("updateCommunity", {
      id: item.id,
      name: data.name,
      icon: data.imageUrl ? data.imageUrl : item.icon,
      isDisclosed: isDisclosed,
      token: `${token}`,
    });
    setIsBusy(false);
    setShowEdit(false);
    setChange(`${new Date()}`);
  };

  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      const payload = {
        name: name,
        imageUrl: image,
      };
      handleSend(payload);
    },
    onError: () => {
      toast.error("Something went wrong");
      setIsBusy(false);
    },
  });

  const onSubmit = () => {
    setIsBusy(true);
    if (image) {
      const files = image[0];
      const fd = new FormData();
      fd.append("image", files);
      mutation.mutate(fd);
    } else {
      handleSend({ name: name, imageUrl: null });
    }
  };

  return (
    <div>
      <div className={`flex justify-between items-center py-2 px-2`}>
        <div className="flex gap-x-2 items-center">
          <img src={item.icon} alt="icon" className="w-5 h-5" />
          <p>{item.name}</p>
        </div>
        <div className="flex item-center gap-x-2">
          <BiEdit
            className="cursor-pointer"
            onClick={() => {
              setShowEdit(!showEdit);
              setShowDelete(false);
            }}
          />
          <RiDeleteBin5Line
            className="text-red-500 cursor-pointer"
            onClick={() => {
              setShowEdit(false);
              setShowDelete(!showDelete);
            }}
          />
        </div>
      </div>
      <div>
        {showEdit && (
          <div>
            <EditForm
              handleSubmit={onSubmit}
              icon={item.icon}
              name={name}
              setName={setName}
              setImage={setImage}
              active={isDisclosed}
              setActive={setIsDisclosed}
              isBusy={isBusy}
            />
          </div>
        )}
        {showDelete && (
          <div>
            <DeleteList handleDelete={handleDelete}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemRender;
