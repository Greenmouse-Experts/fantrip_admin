import PagesHeader from "../components/PagesHeader";
import useDialog from "../hooks/useDialog";
import TaxesListing from "../modules/settings/taxes";
import AddTaxes from "../modules/settings/taxes/add-taxes";

const StayTaxes = () => {
  const { Dialog, setShowModal } = useDialog();
  return (
    <div>
      <div>
        <div>
          <PagesHeader
            name="Countries & Taxes"
            btnName="Add New"
            btnAction={() => setShowModal(true)}
          />
        </div>
        <div className="mt-4">
          <TaxesListing />
        </div>
      </div>
      <Dialog title="Add New Tax Record" size="md">
        <AddTaxes close={() => setShowModal(false)} />
      </Dialog>
    </div>
  );
};

export default StayTaxes;
