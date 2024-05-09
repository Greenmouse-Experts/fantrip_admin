import Tabs from "../components/Tabs";
import GuestListing from "../modules/users/guest";
import HostListing from "../modules/users/host";

const UsersPage = () => {
  const userTabs = [
    {
      title: <p>Guests</p>,
      content: <GuestListing />,
    },
    {
      title: <p>Hosts</p>,
      content: <HostListing />,
    },
  ];
  return (
    <div>
      <div>
        <Tabs tabs={userTabs} type="charts" />
      </div>
    </div>
  );
};

export default UsersPage;
