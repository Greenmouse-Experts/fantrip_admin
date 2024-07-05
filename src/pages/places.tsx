import PagesHeader from "../components/PagesHeader";
import useDialog from "../hooks/useDialog";
import PlacesListing from "../modules/places";
import AddPlace from "../modules/places/add-place";

const PlacesPage = () => {
  const { Dialog, setShowModal } = useDialog();
  return (
    <div>
      <div>
        <div>
          <PagesHeader
            name="Area Guide Spot Categories"
            btnName="Add New"
            btnAction={() => setShowModal(true)}
          />
        </div>
        <div className="mt-4">
          <PlacesListing />
        </div>
      </div>
      <Dialog title="Add New Place" size="md">
        <AddPlace close={() => setShowModal(false)} />
      </Dialog>
    </div>
  );
};

export default PlacesPage;
