import { useQuery } from "@tanstack/react-query";
import HueSpinner from "../../components/loaders/hue-spinner";
import { getPlaces } from "../../services/api/place-api";
import PlacesTableListing from "./component/table-listing";

const PlacesListing = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["get-places"],
    queryFn: getPlaces,
  });
  return (
    <div>
      {isLoading && (
        <div className="place-center py-12 lg:py-24">
          <HueSpinner size={1.3} />
        </div>
      )}
      {!isLoading && !!data?.data?.length && (
        <PlacesTableListing data={data?.data} />
      )}
    </div>
  );
};

export default PlacesListing;
