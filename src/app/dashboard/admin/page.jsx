// import AdminDashboardHome from "@/components/Dashboard/AdminDashboardHome";
import AdminDashboardHome from "@/components/Dashboard/AdminDashboardHome";
import { getAdminAnalytics } from "@/lib/api/analytics";

const Page = async () => {
  const analytics = await getAdminAnalytics();

  return <AdminDashboardHome analytics={analytics} />;
};

export default Page;