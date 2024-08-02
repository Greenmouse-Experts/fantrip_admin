import ActionMoreIndex from "./action-more"
import HomeButton from "./home-btn"
import SportCommunityIndex from "./sport-community"

const RoomSidebarIndex = () => {
  return (
    <div className="p-4">
        <div className="border-b border-[#D2D2D2] pb-5">
            <HomeButton/>
        </div>
        <div className="border-b border-[#D2D2D2] pb-5 pt-3">
            <SportCommunityIndex/>
        </div>
        <div className="border-b border-[#D2D2D2] pb-5 pt-3">
            <ActionMoreIndex/>
        </div>
    </div>
  )
}

export default RoomSidebarIndex