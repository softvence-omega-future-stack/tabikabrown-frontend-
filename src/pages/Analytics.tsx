import AnalyticsCard from "../Component/analytics/AnalyticsCard"
import FeatureUsageChart from "../Component/analytics/FeachartUsageChart"
import RevenueChart from "../Component/analytics/RevenueChart"
import SubscriptionAndTagsPage from "../Component/analytics/Supcriptions"
import TopSearches from "../Component/analytics/TopSearchs"

import UserGrowthChart from "../Component/analytics/UserGrothCart"


const Analytics = () => {
  return (
    <div>
      <AnalyticsCard/>
      <UserGrowthChart/>
      <RevenueChart/>
     <div className="flex flex-col lg:flex-row items-center gap-4 mt-6">
       <FeatureUsageChart/>
      <SubscriptionAndTagsPage/>
     </div>
     <TopSearches/>
    </div>
  )
}

export default Analytics