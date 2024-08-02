import RenderPostsIndex from "./render-posts"

const RoomBodyIndex = () => {
  return (
    <div className="h-full overflow-y-auto scroll-pro">
        <RenderPostsIndex/>
    </div>
  )
}

export default RoomBodyIndex