import { getUserPurchases } from "@/lib/api/purchases";
import { getUserSession } from "@/lib/core/session";
import PurchaseHistoryTable from "./PurchaseHistoryTable";

const PurchaseHistory = async () => {
  const user = await getUserSession();
  const purchases = await getUserPurchases(user?.email);

  return (
    <div className="p-6">
      <PurchaseHistoryTable purchases={purchases || []} />
    </div>
  );
};

export default PurchaseHistory;