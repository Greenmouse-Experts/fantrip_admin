import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../services/api/users-api";
import { USER_TYPES } from "../../../services/constant";
import HueSpinner from "../../../components/loaders/hue-spinner";
import HostTableListing from "./components/host-table-listing";
import { useState } from "react";

const HostListing = () => {
  const [page, setPage] = useState(1);
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["get-hosts", page],
    queryFn: () => getUser(USER_TYPES.HOST, page),
  });

  const handleNext = () => {
    if (data.count > page * 10) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
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
        <HostTableListing
          data={data?.data}
          count={data?.count}
          next={handleNext}
          prev={handlePrev}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default HostListing;
