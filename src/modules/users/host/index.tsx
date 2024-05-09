import { useQuery } from "@tanstack/react-query"
import { getUser } from "../../../services/api/users-api"
import { USER_TYPES } from "../../../services/constant"
import HueSpinner from "../../../components/loaders/hue-spinner"
import HostTableListing from "./components/host-table-listing"

const HostListing = () => {
    const {isLoading, data} = useQuery({
        queryKey: ['get-hosts'],
        queryFn: () => getUser(USER_TYPES.HOST)
    })
  return (
    <div>
         {isLoading && (
        <div className="place-center py-12 lg:py-24">
          <HueSpinner size={1.3} />
        </div>
      )}
      {!isLoading && !!data?.data?.length && (
        <HostTableListing data={data?.data} count={data?.count}/>
      )}
    </div>
  )
}

export default HostListing