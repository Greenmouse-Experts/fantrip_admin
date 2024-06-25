import { useQuery } from "@tanstack/react-query";
import HostDetailIndex from "../modules/users/host/host-detail"
import { getUserDetails } from "../services/api/users-api";
import { USER_TYPES } from "../services/constant";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import HueSpinner from "../components/loaders/hue-spinner";

const HostDetail = () => {
  const { id } = useParams();
  const { isLoading, data, isError } = useQuery({
    queryKey: ["get-guests-details", `${id}`],
    queryFn: () => getUserDetails(`${id}`, USER_TYPES.HOST),
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
      {!isLoading && !isError && <HostDetailIndex data={data} />}
    </div>
  );
}

export default HostDetail