import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../services/api/users-api";
import { USER_TYPES } from "../../../services/constant";
import HueSpinner from "../../../components/loaders/hue-spinner";
import GuestTableListing from "./components/guest-table-lisiting";
import { useState } from "react";
import ReusableSearchBox from "../../../components/reusable-search";

const GuestListing = () => {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState("");

  const { isLoading, data } = useQuery({
    queryKey: ["get-guests", page, searchParams],
    queryFn: () => getUser(USER_TYPES.GUEST, page, searchParams),
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
      <div className="w-[300px] lg:w-[400px] mb-3 mt-2">
        <ReusableSearchBox setParams={setSearchParams} params={searchParams} />
      </div>
      {isLoading && (
        <div className="place-center py-12 lg:py-24">
          <HueSpinner size={1.3} />
        </div>
      )}

      {!isLoading && !!data?.data?.length && (
        <GuestTableListing
          data={data?.data}
          count={data?.count}
          next={handleNext}
          prev={handlePrev}
        />
      )}
    </div>
  );
};

export default GuestListing;
