import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSingleStayListing } from "../services/api/stay-api";
import StayDetailsIndex from "../modules/listing/listing-detail";
import HueSpinner from "../components/loaders/hue-spinner";
import BackButton from "../components/BackButton";

const ListingDetailPage = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["get-single-stay", id],
    queryFn: () => getSingleStayListing(`${id}`),
  });
  return (
    <div>
      <div className="">
        <div>
            <BackButton/>
        </div>
        <div className="pt-5">
          {isLoading && (
            <div className="place-center py-12 lg:py-24">
              <HueSpinner size={1.3} />
            </div>
          )}
          {!isLoading && data && <StayDetailsIndex data={data} />}
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;
