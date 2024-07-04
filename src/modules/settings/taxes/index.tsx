import { useQuery } from "@tanstack/react-query";
import HueSpinner from "../../../components/loaders/hue-spinner";
import { getTaxes } from "../../../services/api/taxes-api";
import TaxTableListing from "./component/table-listing";

const TaxesListing = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["get-taxes"],
    queryFn: getTaxes,
  });
  return (
    <div>
      {isLoading && (
        <div className="place-center py-12 lg:py-24">
          <HueSpinner size={1.3} />
        </div>
      )}
      {!isLoading && !!data?.data?.length && (
        <TaxTableListing data={data?.data} />
      )}
    </div>
  );
};

export default TaxesListing;
