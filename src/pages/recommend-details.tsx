import { useParams } from "react-router-dom";
import { getSinglePlace } from "../services/api/place-api";
import { useQuery } from "@tanstack/react-query";
import HueSpinner from "../components/loaders/hue-spinner";
import RecommendationDetailsIndex from "../modules/reccomendations/details";

const RecommendationDetailPage = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["get-reservation", id],
    queryFn: () => getSinglePlace(`${id}`),
  });
  return (
    <div>
      {isLoading && (
        <div className="place-center py-12 lg:py-24">
          <HueSpinner size={1.3} />
        </div>
      )}
      {!isLoading && data && <RecommendationDetailsIndex data={data} />}
    </div>
  );
};

export default RecommendationDetailPage;
