import { useQuery } from "@tanstack/react-query"
import BoxAnalysis from "../modules/dashboard/box-analysis"
import RevenueAnalysis from "../modules/dashboard/revenue-analysis"
import { getAnalytics } from "../services/api/routine"


const AdminDashboard = () => {
  const {data} = useQuery({
    queryKey: ['dashboard-stat'],
    queryFn: getAnalytics
  })

  return (
    <div>
        <p className="fw-600">Overview</p>
        <div className="mt-6">
            <BoxAnalysis data={data?.cards}/>
        </div>
        <div className="mt-6">
            <RevenueAnalysis chart={data?.revenuesChart}/>
        </div>
    </div>
  )
}

export default AdminDashboard