import Tabs from "../../components/Tabs";
import NotifyList from "./components/notify-list";

const NotificationIndex = () => {
  const notifyTabs = [
    {
      title: (
        <div className="flex item-end gap-x-6">
          All{" "}
          <p className="bg-orange-600 place-center text-white fw-500 fs-400 w-8 h-8">
            12
          </p>
        </div>
      ),
      content: <NotifyList data={[]}/>,
    },
    {
      title: (
        <div className="flex item-end gap-x-6">
          Unread{" "}
          <p className="bg-orange-600 place-center text-white fw-500 fs-400 w-8 h-8">
            21
          </p>
        </div>
      ),
      content: <></>,
    },
  ];
  return (
    <div>
      <div>
        <Tabs tabs={notifyTabs} type="" />
      </div>
    </div>
  );
};

export default NotificationIndex;
