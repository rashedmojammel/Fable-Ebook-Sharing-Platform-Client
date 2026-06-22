// import TransactionsTable from "@/components/Dashboard/TransactionsTable";
import TransactionsTable from "@/components/Dashboard/Transactiontable";
import { getAllTransactions } from "@/lib/api/transaction";
// import { getAllTransactions } from "@/lib/api/transactions";

const Page = async () => {
  const transactions = await getAllTransactions();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Transactions</h1>
          <p className="text-sm text-gray-500 mt-1">
            View publishing fees and purchase transactions across the platform.
          </p>
        </div>

        <TransactionsTable transactions={transactions} />
      </div>
    </div>
  );
};

export default Page;