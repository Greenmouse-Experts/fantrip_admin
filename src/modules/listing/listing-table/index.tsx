import { useQuery } from "@tanstack/react-query";
import { getStayListing } from "../../../services/api/stay-api";
import StayTableListing from "./component/table-list";
import HueSpinner from "../../../components/loaders/hue-spinner";

const ListingTable = () => {
  const { isLoading, data } = useQuery({
    queryFn: getStayListing,
    queryKey: ["get-listing"],
  });
  return (
    <div>
      {isLoading && (
        <div className="place-center py-12 lg:py-24">
          <HueSpinner size={1.3} />
        </div>
      )}
      {!isLoading && !!data?.data?.length && (
        <StayTableListing data={data?.data} />
      )}
    </div>
  );
};

export default ListingTable;
