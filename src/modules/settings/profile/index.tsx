import { useState } from 'react'
import SettingSideMenu from './component/side-menu'
import AdminAccount from './component/admin-account'
import AdminSecurity from './component/security'

const SettingsIndex = () => {
    const [active, setActive] = useState(1)
    return (
      <div className="">
          <div className="pb-8">
              <SettingSideMenu active={active} setActive={setActive}/>
          </div>
          <div className="">
              {active === 1 && <AdminAccount/>}
              {active === 2 && <AdminSecurity/>}
          </div>
      </div>
    )
}

export default SettingsIndex