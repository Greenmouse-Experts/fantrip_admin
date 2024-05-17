import { useState } from 'react'
import SettingSideMenu from './component/side-menu'
import AdminAccount from './component/admin-account'
import AdminSecurity from './component/security'

const SettingsIndex = () => {
    const [active, setActive] = useState(1)
    return (
      <div className="lg:flex justify-between pt-16">
          <div className="lg:w-[23%] p-5 border-gradient sidebar-shadow">
              <SettingSideMenu active={active} setActive={setActive}/>
          </div>
          <div className="lg:w-[75%]">
              {active === 1 && <AdminAccount/>}
              {active === 2 && <AdminSecurity/>}
          </div>
      </div>
    )
}

export default SettingsIndex