import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../services/api/users-api";
import { USER_TYPES } from "../../../services/constant";
import HueSpinner from "../../../components/loaders/hue-spinner";
import GuestTableListing from "./components/guest-table-lisiting";
import { ChangeEvent, useEffect, useState } from "react";
import { UserItem } from "../../../contracts/users";

const GuestListing = () => {
  const [page, setPage] = useState(1);
  const [filteredItems, setFilteredItems] = useState<UserItem[]>([]);
  const { isLoading, data } = useQuery({
    queryKey: ["get-guests", page],
    queryFn: () => getUser(USER_TYPES.GUEST, page),
  });

  const handleNext = () => {
    if (data.count > page * 10) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm === "") {
      setFilteredItems(data?.data);
    } else {
      const filtered = data?.data?.filter((item:UserItem) =>
        item.firstName.toLowerCase().includes(searchTerm) ||
        item.lastName.toLowerCase().includes(searchTerm)
      );
      setFilteredItems(filtered);
    }
  };

 
  useEffect(() => {
    if (data?.data) {
      setFilteredItems(data.data);
    }
  }, [data]);

  return (
    <div>
      <div className="py-2">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search by name"
          className=" p-3 lg:p-3 w-72 border border-[#D2D2D2] bg-[#F9FAFC] rounded-[10px] outline-none"
          onChange={handleSearch}
        />
      </div>
      {isLoading && (
        <div className="place-center py-12 lg:py-24">
          <HueSpinner size={1.3} />
        </div>
      )}
      {!isLoading && !!data?.data?.length && (
        <GuestTableListing
          data={filteredItems}
          count={data?.count}
          next={handleNext}
          prev={handlePrev}
        />
      )}
    </div>
  );
};

export default GuestListing;
