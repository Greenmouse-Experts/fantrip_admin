import PagesHeader from "../components/PagesHeader";
import useDialog from "../hooks/useDialog";
import PlacesListing from "../modules/place-locations";
import AddPlaceLocation from "../modules/place-locations/add-place-location";


const PlacesLocationPage = () => {
  const { Dialog, setShowModal } = useDialog();
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
        <AddPlaceLocation close={() => setShowModal(false)} />
      </Dialog>
    </div>
  );
};

export default PlacesLocationPage;
