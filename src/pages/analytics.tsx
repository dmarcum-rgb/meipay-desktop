import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
const deptData = [{dept:'Engineering',count:52},{dept:'Product',count:18},{dept:'Design',count:14},{dept:'Sales',count:31},{dept:'Marketing',count:22},{dept:'HR',count:12},{dept:'Analytics',count:10},{dept:'Other',count:12}]
const turnoverData = [{month:'Aug',rate:2.1},{month:'Sep',rate:1.8},{month:'Oct',rate:2.4},{month:'Nov',rate:1.9},{month:'Dec',rate:1.6},{month:'Jan',rate:2.0},{month:'Feb',rate:1.7}]
const COLORS = ['#0F1E3C','#2563EB','#3B82F6','#60A5FA','#93C5FD','#BFDBFE','#DBEAFE','#EFF6FF']
export function AnalyticsPage() {
  return (
    <div className="space-y-5 animate-fade-in">
      <div><h1 className="text-xl font-semibold text-meipay-navy">Analytics</h1><p className="text-sm text-meipay-muted mt-0.5">Workforce insights and HR metrics</p></div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-meipay-border p-5">
          <h2 className="text-sm font-semibold text-meipay-navy mb-5">Headcount by Department</h2>
          <ResponsiveContainer width="100%" height={220}><BarChart data={deptData} layout="vertical" margin={{top:0,right:0,left:-10,bottom:0}}><CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} /><XAxis type="number" tick={{fontSize:11,fill:'#64748B'}} axisLine={false} tickLine={false} /><YAxis type="category" dataKey="dept" tick={{fontSize:11,fill:'#64748B'}} axisLine={false} tickLine={false} width={80} /><Tooltip contentStyle={{border:'1px solid #E2E8F0',borderRadius:8,fontSize:12}} /><Bar dataKey="count" fill="#0F1E3C" radius={[0,4,4,0]} name="Employees" /></BarChart></ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-meipay-border p-5">
          <h2 className="text-sm font-semibold text-meipay-navy mb-5">Monthly Turnover Rate (%)</h2>
          <ResponsiveContainer width="100%" height={220}><LineChart data={turnoverData} margin={{top:0,right:10,left:-20,bottom:0}}><CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" /><XAxis dataKey="month" tick={{fontSize:11,fill:'#64748B'}} axisLine={false} tickLine={false} /><YAxis tick={{fontSize:11,fill:'#64748B'}} axisLine={false} tickLine={false} domain={[0,4]} /><Tooltip contentStyle={{border:'1px solid #E2E8F0',borderRadius:8,fontSize:12}} formatter={(v:number)=>[v+'%','Turnover']} /><Line type="monotone" dataKey="rate" stroke="#2563EB" strokeWidth={2} dot={{fill:'#2563EB',r:4}} activeDot={{r:6}} /></LineChart></ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-meipay-border p-5">
          <h2 className="text-sm font-semibold text-meipay-navy mb-4">Department Distribution</h2>
          <div className="flex items-center gap-6"><PieChart width={180} height={180}><Pie data={deptData} cx={90} cy={90} outerRadius={80} dataKey="count" nameKey="dept">{deptData.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]} />)}</Pie></PieChart><div className="space-y-1.5">{deptData.map((d,i)=>(<div key={d.dept} className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{background:COLORS[i%COLORS.length]}} /><span className="text-xs text-meipay-navy">{d.dept}</span><span className="text-xs text-meipay-muted ml-auto">{d.count}</span></div>))}</div></div>
        </div>
        <div className="bg-white rounded-xl border border-meipay-border p-5">
          <h2 className="text-sm font-semibold text-meipay-navy mb-4">Key HR Metrics</h2>
          <div className="space-y-4">{[{label:'Avg Time to Hire',value:'18 days',trend:'+2 vs last quarter'},{label:'Offer Acceptance Rate',value:'87%',trend:'+3% vs last quarter'},{label:'Employee Satisfaction',value:'4.2 / 5',trend:'+0.1 vs last survey'},{label:'Benefits Enrollment Rate',value:'94%',trend:'On target'},{label:'Training Completion',value:'76%',trend:'-4% vs target'}].map(m=>(<div key={m.label} className="flex items-center justify-between py-2 border-b border-meipay-border last:border-0"><span className="text-sm text-meipay-navy">{m.label}</span><div className="text-right"><p className="text-sm font-semibold text-meipay-navy">{m.value}</p><p className="text-xs text-meipay-muted">{m.trend}</p></div></div>))}</div>
        </div>
      </div>
    </div>
  )
}
