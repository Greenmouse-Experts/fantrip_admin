import { FC, useState } from "react";
import {
  addSpecialStay,
  getStayListing,
} from "../../../../services/api/stay-api";
import { useQuery } from "@tanstack/react-query";
import StayListing from "./stay-listing";
import HueSpinner from "../../../../components/loaders/hue-spinner";
import CustomPagination from "../../../../components/custom-pagination";
import { toast } from "react-toastify";
import Button from "../../../../components/Button";
import { useRefetch } from "../../../../hooks/useRefetch";
import { BeatLoader } from "react-spinners";

interface Props {
  close: () => void;
}
const AddToSpecialStay: FC<Props> = ({close}) => {
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const { revalidateRoute } = useRefetch();
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

  const [selectedStay, setSelectedStay] = useState<string[]>([]);
  const approveAction = async () => {
    setIsBusy(true);
    const payload = {
      stay: selectedStay,
    };
    await addSpecialStay(payload)
      .then((res) => {
        toast.success(res.message);
        setIsBusy(false);
        revalidateRoute("get-billboard");
        close();
      })
      .catch((err: any) => {
        setIsBusy(false);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div>
      <div>
        {isLoading && (
          <div className="place-center py-12 lg:py-24">
            <HueSpinner size={1.2} />
          </div>
        )}
        {!isLoading && !!data?.data?.length && (
          <StayListing data={data?.data} selected={selectedStay} setSelected={setSelectedStay}/>
        )}
        {!isLoading && !!data?.data?.length && (
          <div className="flex items-center justify-between mt-5">
            <div>
              <CustomPagination
                count={count}
                page={params.page}
                next={handleNext}
                prev={handlePrev}
                limit={14}
                name={"stays"}
              />
            </div>
            <div>
              <Button
                title={isBusy? <BeatLoader/> : "Add to Billboard"}
                altClassName="btn-int px-6 py-2"
                disabled={!selectedStay.length}
                onClick={() => approveAction()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToSpecialStay;
