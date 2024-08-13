import { useQuery } from "@tanstack/react-query";
import { getSpecialStays } from "../../../services/api/stay-api";
import HueSpinner from "../../../components/loaders/hue-spinner";
import SpecialStayTable from "./special-stay-table";
import { useState } from "react";
import { toast } from "react-toastify";

const SpecialStayIndex = () => {
  const [params, setParams] = useState({
    page: 1,
  });
  const { isLoading, data } = useQuery({
    queryFn: () => getSpecialStays(params),
    queryKey: ["get-billboard"],
  });
  const count = data?.count || 0;
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
        <SpecialStayTable
          data={data?.data}
          page={params.page}
          count={count}
          next={handleNext}
          prev={handlePrev}
        />
      )}
    </div>
  );
};

export default SpecialStayIndex;
