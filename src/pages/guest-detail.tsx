import { useQuery } from "@tanstack/react-query";
import GuestDetailIndex from "../modules/users/guest/guest-detail";
import { getUserDetails } from "../services/api/users-api";
import { useParams } from "react-router-dom";
import { USER_TYPES } from "../services/constant";
import HueSpinner from "../components/loaders/hue-spinner";
import BackButton from "../components/BackButton";

const GuestDetail = () => {
  const { id } = useParams();
  const { isLoading, data, isError } = useQuery({
    queryKey: ["get-guests-details", `${id}`],
    queryFn: () => getUserDetails(`${id}`, USER_TYPES.GUEST),
  });
  return (
    <div>
      <div>
        <BackButton />
      </div>
      {isLoading && (
        <div className="place-center py-12 lg:py-24">
          <HueSpinner size={1.3} />
        </div>
      )}
      {!isLoading && !isError && <GuestDetailIndex data={data} />}
    </div>
  );
};

export default GuestDetail;
