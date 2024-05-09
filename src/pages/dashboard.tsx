import BoxAnalysis from "../modules/dashboard/box-analysis"
import RevenueAnalysis from "../modules/dashboard/revenue-analysis"

const AdminDashboard = () => {
  return (
    <div>
        <p className="fw-600">Overview</p>
        <div className="mt-6">
            <BoxAnalysis/>
        </div>
        <div className="mt-6">
            <RevenueAnalysis/>
        </div>
    </div>
  )
}

export default AdminDashboard