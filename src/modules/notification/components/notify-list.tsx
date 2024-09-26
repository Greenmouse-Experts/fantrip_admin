import { FC } from "react";
import { LuClock } from "react-icons/lu";
import { MdOutlineLocalHotel } from "react-icons/md";
import { NotifyItem } from "../../../contracts/routine";
import { formatText } from "../../../utils/helper-function";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/react-query";
import { markNotify } from "../../../services/api/users-api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Props {
  data: NotifyItem[];
  type: "all" | "read";
  refetch: () => void
}
const NotifyList: FC<Props> = ({ data, type, refetch }) => {
  const navigate = useNavigate();
  let notifyToRender = data;

  if (type === "read") {
    notifyToRender = data.filter((item) => !item.read);
  }

  const readNotify = useMutation({
    mutationFn: markNotify,
  });

  const getRouteName = (name: string) => {
    console.log(name);
    
    return "";
  };

  const handleReadAndNavigate = (item: NotifyItem) => {
    readNotify.mutate(item.id, {
      onSuccess: () => {
        refetch()
        const route = getRouteName(item.title);
        if (route) {
          navigate(`${route}`);
        }
      },
      onError: (err: any) => {
        toast.error(err.response.data.message);
      },
    });
  };

  return (
    <div className="grid gap-3">
      {notifyToRender.map((item) => (
        <div
          className={`flex gap-x-2 border-b p-3  cursor-pointer ${item.read && 'opacity-60'}`}
          onClick={() => handleReadAndNavigate(item)}
        >
          <div className={`w-[40px] shrink-0 h-[40px] place-center ${item.read? 'bg-gray-500' : 'bg-orange-800'}`}>
            <MdOutlineLocalHotel className="text-2xl text-white" />
          </div>
          <div className="w-full">
            <div className="w-full flex justify-between">
              <div className="bg-orange-50 text-orange-600 px-2">
                <p>{item.title}</p>
              </div>
              <div className="flex justify-end gap-x-2 items-center opacity-75">
                <LuClock />
                <p>{dayjs(item.createdDate).fromNow()}</p>
              </div>
            </div>
            <div className="mt-1">
              <p>{formatText(item.body)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotifyList;
