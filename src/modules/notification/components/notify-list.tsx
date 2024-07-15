import { FC } from "react"
import { LuClock } from "react-icons/lu"
import { MdOutlineLocalHotel } from "react-icons/md"

interface Props{
    data: any[]
}
const NotifyList:FC<Props> = ({}) => {

  return (
    <div className="flex gap-x-2 border-b p-3">
        <div className="w-[40px] shrink-0 h-[40px] place-center bg-orange-800">
            <MdOutlineLocalHotel className="text-2xl text-white"/>
        </div>
        <div>
            <div className="flex justify-between">
                <div className="bg-orange-50 text-orange-600 px-2">
                    <p>Fantrip Stay</p>
                </div>
                <div className="flex justify-end gap-x-2 items-center opacity-75">
                    <LuClock/>
                    <p>5 minutes ago</p>
                </div>
            </div>
            <div className="mt-1">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil esse culpa at nulla accusamus, inventore, reprehenderit, in laborum deleniti eos eum adipisci. Obcaecati reiciendis sapiente odio voluptas quisquam provident qui.</p>
            </div>
        </div>
    </div>
  )
}

export default NotifyList