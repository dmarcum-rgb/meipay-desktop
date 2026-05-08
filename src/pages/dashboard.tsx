import { useAuth } from '@/store/auth'
import {
  Users, DollarSign, Clock, AlertCircle,
  TrendingUp, ArrowUpRight, Calendar, MoreHorizontal,
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'

const headcountData = [
  { month: 'Aug', count: 148 },
  { month: 'Sep', count: 151 },
  { month: 'Oct', count: 155 },
  { month: 'Nov', count: 158 },
  { month: 'Dec', count: 162 },
  { month: 'Jan', count: 168 },
  { month: 'Feb', count: 171 },
]

const payrollData = [
  { month: 'Aug', amount: 635000 },
  { month: 'Sep', count: 628000 },
  { month: 'Oct', amount: 641000 },
  { month: 'Nov', amount: 655000 },
  { month: 'Dec', amount: 672000 },
  { month: 'Jan', amount: 689000 },
  { month: 'Feb', amount: 701000 },
]

const pendingActions = [
  { label: 'Leave requests awaiting approval', count: 3, href: '/time-tracking' },
  { label: 'New hire documents incomplete',    count: 2, href: '/onboarding' },
  { label: 'Expense reports to review',        count: 5, href: '/employees' },
  { label: 'Performance reviews due',          count: 8, href: '/talent' },
]

const recentActivity = [
  { name: 'Sarah Mitchell',  role: 'Sr. Engineer',      amount: '$5,840', status: 'paid',    date: 'Jan 31' },
  { name: 'James Okafor',    role: 'Product Manager',   amount: '$6,200', status: 'paid',    date: 'Jan 31' },
  { name: 'Priya Sharma',    role: 'UX Designer',       amount: '$4,960', status: 'pending', date: 'Feb 5'  },
  { name: 'Marcus Chen',     role: 'Data Analyst',      amount: '$4,480', status: 'pending', date: 'Feb 5'  },
]

function StatCard({ title, value, sub, icon: Icon, color }: {
  title: string; value: string | number; sub?: string; icon: any; color: string
}) {
  return (
    <div className="bg-white rounded-xl border border-meipay-border p-5">
      <div className={'w-9 h-9 rounded-lg flex items-center justify-center mb-4 ' + color}>
        <Icon className="w-4.5 h-4.5" />
      </div>
      <p className="text-2xl font-bold text-meipay-navy tracking-tight">{value}</p>
      <p className="text-sm text-meipay-muted mt-0.5">{title}</p>
      {sub && <p className="text-xs text-emerald-600 font-medium mt-1">{sub}</p>}
    </div>
  )
}

export function DashboardPage() {
  const { user } = useAuth()
  const firstName = user?.name?.split(' ')[0] ?? 'there'

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-meipay-navy">
            Good morning, {firstName}
          </h1>
          <p className="text-sm text-meipay-muted mt-0.5">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-meipay-navy text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-meipay-slate transition-colors">
          <Calendar className="w-4 h-4" />
          Run Payroll
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Employees"   value="171"      sub="+3 this month"   icon={Users}        color="bg-blue-50 text-blue-600" />
        <StatCard title="Monthly Payroll"   value="$701,000" sub="+1.7% vs last"   icon={DollarSign}   color="bg-emerald-50 text-emerald-600" />
        <StatCard title="Pending Requests"  value="18"                             icon={AlertCircle}  color="bg-amber-50 text-amber-600" />
        <StatCard title="Avg Hours / Week"  value="41.2"                           icon={Clock}        color="bg-purple-50 text-purple-600" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-white rounded-xl border border-meipay-border p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold text-meipay-navy">Headcount Trend</h2>
              <p className="text-xs text-meipay-muted mt-0.5">Last 7 months</p>
            </div>
            <button className="p-1 rounded hover:bg-meipay-light transition-colors">
              <MoreHorizontal className="w-4 h-4 text-meipay-muted" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={headcountData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
              <Tooltip contentStyle={{ border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="count" stroke="#2563EB" strokeWidth={2} fill="#EFF6FF" name="Employees" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-meipay-border p-5">
          <div className="mb-5">
            <h2 className="text-sm font-semibold text-meipay-navy">Payroll Spend</h2>
            <p className="text-xs text-meipay-muted mt-0.5">Monthly ($)</p>
          </div>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={payrollData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} tickFormatter={v => v >= 1000 ? (v/1000).toFixed(0)+'k' : v} />
              <Tooltip contentStyle={{ border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [`$${v.toLocaleString()}`, 'Payroll']} />
              <Bar dataKey="amount" fill="#0F1E3C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Recent Pay */}
        <div className="bg-white rounded-xl border border-meipay-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-meipay-navy">Recent Pay Activity</h2>
            <a href="/payroll" className="text-xs text-meipay-accent hover:underline inline-flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
          <div className="space-y-3">
            {recentActivity.map(item => (
              <div key={item.name} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-meipay-light flex items-center justify-center shrink-0">
                  <span className="text-xs font-semibold text-meipay-navy">{item.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-meipay-navy truncate">{item.name}</p>
                  <p className="text-xs text-meipay-muted">{item.role}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-meipay-navy">{item.amount}</p>
                  <span className={'text-[10px] font-medium px-1.5 py-0.5 rounded-full ' + (item.status === 'paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700')}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-xl border border-meipay-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-meipay-navy">Pending Actions</h2>
            <span className="text-xs bg-meipay-accent/10 text-meipay-accent font-medium px-2 py-0.5 rounded-full">18 items</span>
          </div>
          <div className="space-y-1.5">
            {pendingActions.map(item => (
              <a key={item.label} href={item.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-meipay-light transition-colors group">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="flex-1 text-sm text-meipay-navy">{item.label}</span>
                <span className="text-xs font-semibold bg-meipay-border text-meipay-navy px-2 py-0.5 rounded-full group-hover:bg-meipay-accent group-hover:text-white transition-colors">
                  {item.count}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
