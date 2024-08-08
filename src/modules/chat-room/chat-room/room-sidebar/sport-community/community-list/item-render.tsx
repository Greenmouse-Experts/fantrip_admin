import { FC } from 'react'
import { CommunityItemTyping } from '.'

interface Props{
    item: CommunityItemTyping
}
const ItemRender:FC<Props> = () => {
  return (
    <div>ItemRender</div>
  )
}

export default ItemRender