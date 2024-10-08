import { useQuery } from "@tanstack/react-query";
import { getStayListing } from "../../../services/api/stay-api";
import StayTableListing from "./component/table-list";
import HueSpinner from "../../../components/loaders/hue-spinner";
import { useState } from "react";
import { toast } from "react-toastify";

const ListingTable = () => {
  const [params, setParams] = useState({
    page: 1,
  });
  const { isLoading, data } = useQuery({
    queryFn: () => getStayListing(params),
    queryKey: ["get-listing", params],
  });
  const count = data?.count;
  const handleNext = () => {
    if (params.page * 10 >= count) {
      toast.info("This is the last page");
    } else {
      setParams({
        ...params,
        page: params.page + 1,
      });
    }
  };
  const handlePrev = () => {
    if (params.page === 1) {
      toast.info("This is the first page");
    } else {
      setParams({
        ...params,
        page: params.page - 1,
      });
    }
  };
  return (
    <div>
      {isLoading && (
        <div className="place-center py-12 lg:py-24">
          <HueSpinner size={1.3} />
        </div>
      )}
      {!isLoading && !!data?.data?.length && (
        <StayTableListing data={data?.data} page={params.page}
        count={count || 0}
        next={handleNext}
        prev={handlePrev} />
      )}
    </div>
  );
};

export default ListingTable;
