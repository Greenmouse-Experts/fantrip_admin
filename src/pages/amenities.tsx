import PagesHeader from "../components/PagesHeader";
import useDialog from "../hooks/useDialog";
import AmenitiesListing from "../modules/settings/amenities";
import AddAmenity from "../modules/settings/amenities/add-amenity";

const StayAmenities = () => {
  const { Dialog, setShowModal } = useDialog();
  return (
    <div>
      <div>
        <div>
          <PagesHeader
            name="Amenities and Unique Features"
            btnName="Add New"
            btnAction={() => setShowModal(true)}
          />
        </div>
        <div className="mt-4">
            <AmenitiesListing/>
        </div>
      </div>
      <Dialog title="Add New Amenty" size="md">
        <AddAmenity close={() => setShowModal(false)}/>
      </Dialog>
    </div>
  );
};

export default StayAmenities;
