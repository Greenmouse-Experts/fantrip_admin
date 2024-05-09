import { useQuery } from "@tanstack/react-query";
import { getAmenities } from "../../../services/api/amenities-api";
import AmenitiesTableListing from "./component/table-listing";
import HueSpinner from "../../../components/loaders/hue-spinner";

const AmenitiesListing = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["get-amenties"],
    queryFn: getAmenities,
  });
  return (
    <div>
      {isLoading && (
        <div className="place-center py-12 lg:py-24">
          <HueSpinner size={1.3} />
        </div>
      )}
      {!isLoading && !!data?.data?.length && (
        <AmenitiesTableListing data={data?.data} />
      )}
    </div>
  );
};

export default AmenitiesListing;
