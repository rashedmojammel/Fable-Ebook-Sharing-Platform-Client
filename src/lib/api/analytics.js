import { protectedFetch } from "../core/server";

export const getAdminAnalytics = async () => {
  return protectedFetch("/api/admin/analytics");
};