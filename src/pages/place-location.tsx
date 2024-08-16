import { useQuery } from "@tanstack/react-query";
import PagesHeader from "../components/PagesHeader";
import useDialog from "../hooks/useDialog";
import PlacesListing from "../modules/place-locations";

import AddPlaceLocation from "../modules/place-locations/add-place-location";
import {  getSpots } from "../services/api/place-api";


const PlacesLocationPage = () => {
  const { Dialog, setShowModal } = useDialog();
  const { isLoading, data } = useQuery({
    queryKey: ["get-spots"],
    queryFn: getSpots,
  });

  return (
    <div>
      <div>
        <div>
          <PagesHeader
            name="Area Guide Places"
            btnName="Add New"
            btnAction={() => setShowModal(true)}
          />
        </div>
        <div className="mt-4">
          <PlacesListing />
        </div>
      </div>
      <Dialog title="Add New Place" size="md">
        <AddPlaceLocation isgettingSpot={isLoading} spots={data?.data} close={() => setShowModal(false)} />
      </Dialog>
    </div>
  );
};

export default PlacesLocationPage;
