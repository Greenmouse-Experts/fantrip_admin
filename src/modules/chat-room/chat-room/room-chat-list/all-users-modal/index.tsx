import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { USER_TYPES } from "../../../../../services/constant";
import { getUser } from "../../../../../services/api/users-api";
import SearchResults from "./components/search-result";
import HueSpinner from "../../../../../components/loaders/hue-spinner";
import { useChat } from "../../../../../hooks/useChat";
import { useUtils } from "../../../../../hooks/useUtils";
import { UserItem } from "../../../../../contracts/users";
import ReusableSearchBox from "../../../../../components/reusable-search";

interface Props{
    close:() => void
}
const AllUsersList:FC<Props> = ({close}) => {
  const [searchParams, setSearchParams] = useState<string>('')
  const [params, setParams] = useState({
    page: 1,
    q: "",
  });
  const { isLoading, data } = useQuery({
    queryKey: ["get-hosts", params.page, searchParams],
    queryFn: () => getUser(USER_TYPES.HOST, params.page, searchParams),
  });

  const { saveGuestInfo} = useChat();
  const { toggleStayChatmodal: setShowModal } = useUtils();
  const openChatWitUser = (data:UserItem) => {
    const payload = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      nickname: data.nickname,
      verifiedAsHost: data.verifiedAsHost,
      role: data.role,
      picture: data.picture,
    };
    saveGuestInfo(payload, "");
    setShowModal(true);
    setParams({...params}) // remove later
    close()
  };

  return (
    <div className="mt-3">
      <div>
       <ReusableSearchBox params={searchParams} setParams={setSearchParams} />
      </div>
      <div className="mt-5">
        {isLoading && (
          <div className="place-center py-12 lg:py-24">
            <HueSpinner size={1.3} />
          </div>
        )}
        {!isLoading && data && <SearchResults data={data?.data} openChat={openChatWitUser}/>}
      </div>
    </div>
  );
};

export default AllUsersList;
