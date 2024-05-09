import { useQuery } from "@tanstack/react-query";
import { getProperties } from "../../../services/api/properties-api";
import PropertyTableListing from "./component/table-listing";
import HueSpinner from "../../../components/loaders/hue-spinner";

const PropertiesListing = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["get-properties"],
    queryFn: getProperties,
  });
  return (
    <div>
      {isLoading && (
        <div className="place-center py-12 lg:py-24">
          <HueSpinner size={1.3} />
        </div>
      )}
      {!isLoading && !!data?.data?.length && (
        <PropertyTableListing data={data?.data} />
      )}
    </div>
  );
};

export default PropertiesListing;
