import all from "../../../assets/svg/all.svg";
import active from "../../../assets/svg/active.svg";
import saved from "../../../assets/svg/saved.svg";
import cancel from "../../../assets/svg/pending.svg";
import { useQuery } from "@tanstack/react-query";
import { getStayStats } from "../../../services/api/stay-api";

const ListingAnalytics = () => {
  const { data } = useQuery({
    queryKey: ["get-listing-stat"],
    queryFn: getStayStats,
  });
  const listing = [
    {
      name: "Total Listing",
      number: data?.total || 0,
      img: <img src={all} alt="" />,
    },
    {
      name: "Active Listing",
      number: data?.active || 0,
      img: <img src={active} alt="" />,
    },
    {
      name: "Drafts",
      number: data?.drafts || 0,
      img: <img src={saved} alt="" />,
    },
    {
      name: "Pending Approval",
      number: "0",
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
