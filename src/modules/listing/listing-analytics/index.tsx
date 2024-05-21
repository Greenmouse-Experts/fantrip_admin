import all from "../../../assets/svg/all.svg";
import active from "../../../assets/svg/active.svg";
import saved from "../../../assets/svg/saved.svg";
import cancel from "../../../assets/svg/cancel.svg";

const ListingAnalytics = () => {
  const listing = [
    {
      name: "Total Bookings",
      number: "200",
      img: <img src={all} alt="" />,
    },
    {
      name: "Active Bookings",
      number: "102",
      img: <img src={active} alt="" />,
    },
    {
      name: "Drafts",
      number: "20",
      img: <img src={saved} alt="" />,
    },
    {
      name: "Cancelled Bookings",
      number: "200",
      img: <img src={cancel} alt="" />,
    },
  ];
  return (
    <div className="grid grid-cols-4 gap-5">
      {listing.map((item) => (
        <div className="border border-gray-200 dark:border-[#343B4F] flex gap-x-2 p-4 rounded-[8px]">
          <div>{item.img}</div>
          <div>
            <p className="fw-500">{item.name}</p>
            <p className="fs-500 text-gray-600 dark:text-[#AEB9E1] mt-[1px]">
              {item.number}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListingAnalytics;
