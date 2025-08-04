import { CreditCard, TrendingUp, ArrowUpRight, ArrowDownLeft, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const mockAccounts = [
  { id: 1, type: "CHECKING", number: "****1234", balance: 15420.50, available: 15420.50 },
  { id: 2, type: "SAVINGS", number: "****5678", balance: 45678.90, available: 45678.90 },
];

const mockTransactions = [
  { id: 1, type: "TRANSFER_IN", amount: 2500.00, description: "Salary Deposit", date: "2024-01-15", status: "COMPLETED" },
  { id: 2, type: "WITHDRAWAL", amount: -150.00, description: "ATM Withdrawal", date: "2024-01-14", status: "COMPLETED" },
  { id: 3, type: "TRANSFER_OUT", amount: -89.99, description: "Online Purchase", date: "2024-01-13", status: "COMPLETED" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const totalBalance = mockAccounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.firstName}!</p>
        </div>
        <Button className="banking-button-primary">
          <CreditCard className="w-4 h-4 mr-2" />
          New Transaction
        </Button>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="banking-card col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Total Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-success">
              ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Across {mockAccounts.length} accounts
            </p>
          </CardContent>
        </Card>

        <Card className="banking-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">+$2,340</div>
            <p className="text-sm text-muted-foreground">Net income</p>
          </CardContent>
        </Card>
      </div>

      {/* Accounts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Accounts</h2>
          {mockAccounts.map((account) => (
            <Card key={account.id} className="banking-card">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{account.type} Account</h3>
                    <p className="text-sm text-muted-foreground">{account.number}</p>
                  </div>
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold">
                    ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <p className="text-sm text-muted-foreground">Available balance</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <Card className="banking-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                {mockTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        transaction.amount > 0 ? 'bg-success/20' : 'bg-warning/20'
                      }`}>
                        {transaction.amount > 0 ? (
                          <ArrowUpRight className="w-4 h-4 text-success" />
                        ) : (
                          <ArrowDownLeft className="w-4 h-4 text-warning" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      transaction.amount > 0 ? 'text-success' : 'text-foreground'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}
                      ${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}