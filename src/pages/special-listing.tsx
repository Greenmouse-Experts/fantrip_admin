import PagesHeader from '../components/PagesHeader';
import useDialog from '../hooks/useDialog';
import SpecialStayIndex from '../modules/listing/special-stay';
import AddToSpecialStay from '../modules/listing/special-stay/add-special';

const SpecialListing = () => {
    const { Dialog, setShowModal } = useDialog();
    return (
      <div>
        <div>
          <div>
            <PagesHeader
              name="Billboard Listing"
              btnName="Add New"
              btnAction={() => setShowModal(true)}
            />
          </div>
          <div className="mt-4">
              <SpecialStayIndex/>
          </div>
        </div>
        <Dialog title="Add to Billboard" size="lg">
          <AddToSpecialStay close={() => setShowModal(false)}/>
        </Dialog>
      </div>
    );
}

export default SpecialListing