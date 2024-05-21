import ListingAnalytics from "./listing-analytics";
import ListingTable from "./listing-table";

const ListingIndex = () => {
  return (
    <div>
      <div>
        <ListingAnalytics />
      </div>
      <div className="mt-6">
        <ListingTable />
      </div>
    </div>
  );
};

export default ListingIndex;
