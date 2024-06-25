import { FC } from "react"
import { HostDetailItem } from "../../../../../contracts/users"
import BookingHistory from "./booking-history"
import HostKycInformation from "./kyc-information"
import HostStayListing from "./stay-lisiting"

interface Props{
  user: HostDetailItem
}
const HostContent:FC<Props> = ({user}) => {
  return (
    <div className="grid gap-4 grid-cols-2">
        <div className="bg-[#FFEDF2] col-span-2 dark:bg-[#131313] p-5 rounded shadow-sm">
            <HostKycInformation user={user}/>
        </div>
        <div className="bg-[#FFEDF2] dark:bg-[#131313] p-5 rounded shadow-sm">
            <HostStayListing stay={user.stays}/>
        </div>
        <div className="bg-[#FFEDF2] dark:bg-[#131313] p-5 rounded shadow-sm">
            <BookingHistory/>
        </div>
    </div>
  )
}

export default HostContent