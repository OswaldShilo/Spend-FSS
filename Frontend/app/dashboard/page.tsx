"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { LogOut, Mail } from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

type Account = {
  id: string;
  name: string;
  bank: string;
  balance: number;
  accountNumber: string;
  type: string;
};

type Transaction = {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
};

type MonthlySpending = {
  month: string;
  amount: number;
};

type CategoryDatum = {
  name: string;
  value: number;
  color: string;
};

type DashboardData = {
  totalBalance: number;
  accounts: Account[];
  categoryData: CategoryDatum[];
  monthlySpending: MonthlySpending[];
  recentTransactions: Transaction[];
  transactions: Transaction[];
};

export default function DashboardPage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataLoading(true);
        setDataError(null);
        const res = await fetch(`${API_BASE}/api/dashboard`);
        if (!res.ok) throw new Error(`Request failed with ${res.status}`);
        const json = (await res.json()) as DashboardData;
        setData(json);
      } catch (err: any) {
        setDataError(err.message || "Failed to load data");
      } finally {
        setDataLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalBalance = data?.totalBalance ?? 0;
  const accounts = data?.accounts ?? [];
  const monthlySpending = data?.monthlySpending ?? [];
  const categoryData = data?.categoryData ?? [];
  const recentTransactions = data?.recentTransactions ?? [];

  const handleSignOut = async () => {
    const { auth } = await import("@/lib/firebase");
    await auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push("/auth/signin");
    return null;
  }

  if (dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (dataError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <p className="text-lg font-semibold text-red-600 mb-2">Failed to load dashboard data</p>
          <p className="text-gray-600 mb-4">{dataError || "Unknown error"}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-dvh bg-white overflow-x-hidden">
      {/* User Profile Header */}
      <div className="bg-gradient-to-r from-primary to-[#8EA08A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                {userProfile?.displayName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{userProfile?.displayName || "User"}</h2>
                <div className="flex items-center gap-2 text-white/80 text-sm mt-1">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-spend-text-gray-900 mb-2">Financial Dashboard</h1>
          <p className="text-spend-text-gray-600">Track your spending and manage your finances</p>
        </div>

        {/* Total Balance Card */}
        <div className="mb-8 bg-gradient-to-br from-primary to-[#8EA08A] rounded-3xl p-6 md:p-8 text-white shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/80 text-sm mb-2">Total Balance</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-1">
                ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </h2>
              <p className="text-white/70 text-sm">Across all accounts</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-8 bg-gradient-to-br from-[#5B7553] to-[#8EA08A] rounded-2xl p-6 text-white shadow-lg border-2 border-white/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">Chat with Your Personal Assistant</h3>
              <p className="text-white/80 text-sm">Get insights and advice powered by Finance MCP</p>
            </div>
          </div>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 bg-white text-primary px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white/90 transition-colors shadow-md"
          >
            Start Chat
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Bank Accounts Grid */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-spend-text-gray-900 mb-4">Bank Accounts</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="bg-white border border-primary/20 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-spend-text-gray-600 mb-1">{account.bank}</p>
                    <h4 className="font-semibold text-spend-text-gray-900">{account.name}</h4>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      account.type === "Checking"
                        ? "bg-blue-100 text-blue-700"
                        : account.type === "Savings"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {account.type}
                  </span>
                </div>
                <p className="text-2xl font-bold text-spend-text-gray-900 mb-2">
                  ${Math.abs(account.balance).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-spend-text-gray-600">{account.accountNumber}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {/* Monthly Spending Bar Chart */}
          <div className="bg-white border border-primary/20 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-spend-text-gray-900 mb-4">Monthly Spending</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySpending}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="amount" fill="#5B7553" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Breakdown Pie Chart */}
          <div className="bg-white border border-primary/20 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-spend-text-gray-900 mb-4">Spending by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Spending Trend Line Chart */}
        <div className="bg-white border border-primary/20 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-spend-text-gray-900 mb-4">Spending Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySpending}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#5B7553" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white border border-primary/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-spend-text-gray-900">Recent Transactions</h3>
            <Link href="#" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.amount > 0 ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {transaction.amount > 0 ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      )}
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-spend-text-gray-900">{transaction.name}</p>
                    <p className="text-xs text-spend-text-gray-600">{transaction.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      transaction.amount > 0 ? "text-green-600" : "text-spend-text-gray-900"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}$
                    {Math.abs(transaction.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-spend-text-gray-600">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
