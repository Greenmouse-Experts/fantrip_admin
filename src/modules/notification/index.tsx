import { useQuery } from "@tanstack/react-query";
import Tabs from "../../components/Tabs";
import NotifyList from "./components/notify-list";
import { getNotify } from "../../services/api/users-api";
import { useState } from "react";
import { toast } from "react-toastify";
import HueSpinner from "../../components/loaders/hue-spinner";
import { NotifyItem } from "../../contracts/routine";

const NotificationIndex = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-notifications"],
    queryFn: () => getNotify(page),
  });

  const count = data?.count;
  const handleNext = () => {
    if (page * 12 >= count) {
      toast.info("This is the last page");
    } else {
      setPage(page + 1);
    }
  };
  const handlePrev = () => {
    if (page === 1) {
      toast.info("This is the first page");
    } else {
      setPage(page - 1);
    }
  };

  const unreadLength =
    data?.data?.filter((item: NotifyItem) => !item.read)?.length || 0;

  const notifyTabs = [
    {
      title: (
        <div className="flex item-end gap-x-6">
          All{" "}
          <p className="bg-orange-600 place-center text-white fw-500 fs-400 w-8 h-8">
            {data?.data?.length}
          </p>
        </div>
      ),
      content: (
        <NotifyList data={data?.data || []} type="all" refetch={refetch} />
      ),
    },
    {
      title: (
        <div className="flex item-end gap-x-6">
          Unread{" "}
          <p className="bg-orange-600 place-center text-white fw-500 fs-400 w-8 h-8">
            {unreadLength}
          </p>
        </div>
      ),
      content: (
        <NotifyList data={data?.data || []} type="read" refetch={refetch} />
      ),
    },
  ];
  return (
    <div>
      {isLoading && (
        <div className="place-center py-12 lg:py-24">
          <HueSpinner size={1.3} />
        </div>
      )}
      {!isLoading && !!data?.data?.length && <Tabs tabs={notifyTabs} type="" />}
      <div className="flex justify-end mt-4">
        {page > 1 && (
          <button className="btn-int px-4 py-2" onClick={handlePrev}>
            Prev
          </button>
        )}
        {count > 10 && (
          <button className="btn-int px-4 py-2" onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationIndex;
