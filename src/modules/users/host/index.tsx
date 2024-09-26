import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../services/api/users-api";
import { USER_TYPES } from "../../../services/constant";
import HueSpinner from "../../../components/loaders/hue-spinner";
import HostTableListing from "./components/host-table-listing";
import { useState } from "react";
import ReusableSearchBox from "../../../components/reusable-search";

const HostListing = () => {
  const [searchParams, setSearchParams] = useState<string>('')
  const [page, setPage] = useState<number>(1);
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["get-hosts", page, searchParams],
    queryFn: () => getUser(USER_TYPES.HOST, page, searchParams),
  });

  const handleNext = () => {
    if (data.count > page * 12) {
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
        <div className="w-[300px] lg:w-[400px] mb-3 mt-2">
        <ReusableSearchBox setParams={setSearchParams} params={searchParams} />
      </div>
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
