import { useQuery } from "@tanstack/react-query";
import HueSpinner from "../../components/loaders/hue-spinner";
import { getPlaces } from "../../services/api/place-api";
import ReccomendationsTableListing from "./component/table-listing";
import { useState } from "react";
import { toast } from "react-toastify";

const ReccomendationsListing = () => {
  const [params, setParams] = useState({
    page: 1,
    status: "pending",
  });
  const { isLoading, data } = useQuery({
    queryKey: ["get-places"],
    queryFn: getPlaces,
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
        <ReccomendationsTableListing
          data={data?.data}
          count={count}
          page={params.page}
          next={handleNext}
          prev={handlePrev}
        />
      )}
    </div>
  );
};

export default ReccomendationsListing;
