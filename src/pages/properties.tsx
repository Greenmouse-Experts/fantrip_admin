import PagesHeader from "../components/PagesHeader";
import useDialog from "../hooks/useDialog";
import PropertiesListing from "../modules/settings/properties";
import AddProperty from "../modules/settings/properties/add-property";

const StayProperties = () => {
    const { Dialog, setShowModal } = useDialog();
    return (
      <div>
        <div>
          <div>
            <PagesHeader
              name="Stay Property Types"
              btnName="Add New"
              btnAction={() => setShowModal(true)}
            />
          </div>
          <div className="mt-4">
              <PropertiesListing/>
          </div>
        </div>
        <Dialog title="Add New Property" size="md">
          <AddProperty close={() => setShowModal(false)}/>
        </Dialog>
      </div>
    );
}

export default StayProperties