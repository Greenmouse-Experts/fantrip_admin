import { useQuery } from "@tanstack/react-query"
import { getUser } from "../../../services/api/users-api"
import { USER_TYPES } from "../../../services/constant"
import HueSpinner from "../../../components/loaders/hue-spinner"
import GuestTableListing from "./components/guest-table-lisiting"

const GuestListing = () => {
    const {isLoading, data} = useQuery({
        queryKey: ['get-guests'],
        queryFn: () => getUser(USER_TYPES.GUEST)
    })
    
  return (
    <div>
         {isLoading && (
        <div className="place-center py-12 lg:py-24">
          <HueSpinner size={1.3} />
        </div>
      )}
      {!isLoading && !!data?.data?.length && (
        <GuestTableListing data={data?.data} count={data?.count}/>
      )}
    </div>
  )
}

export default GuestListing