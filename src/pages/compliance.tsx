import { Shield, CheckCircle, AlertTriangle, Calendar } from 'lucide-react'
const ITEMS = [
  { id:'1', title:'EEO-1 Report Filing',    due:'Mar 31, 2026', status:'UPCOMING',    cat:'Federal',   priority:'HIGH'   },
  { id:'2', title:'W-2 Distribution',       due:'Jan 31, 2026', status:'COMPLETED',   cat:'Tax',       priority:'HIGH'   },
  { id:'3', title:'ACA 1095-C Filing',      due:'Feb 28, 2026', status:'IN_PROGRESS', cat:'ACA',       priority:'HIGH'   },
  { id:'4', title:'OSHA 300A Posting',      due:'Feb 1, 2026',  status:'COMPLETED',   cat:'Safety',    priority:'MEDIUM' },
  { id:'5', title:'State Unemployment Tax', due:'Apr 30, 2026', status:'UPCOMING',    cat:'State Tax', priority:'MEDIUM' },
  { id:'6', title:'FMLA Policy Review',     due:'Jun 30, 2026', status:'UPCOMING',    cat:'Policy',    priority:'LOW'    },
]
const SC: Record<string,string> = { COMPLETED:'bg-emerald-50 text-emerald-700', IN_PROGRESS:'bg-blue-50 text-blue-700', UPCOMING:'bg-amber-50 text-amber-700' }
const PR: Record<string,string> = { HIGH:'text-red-600', MEDIUM:'text-amber-600', LOW:'text-gray-500' }
export function CompliancePage() {
  const done = ITEMS.filter(i=>i.status==='COMPLETED').length
  return (
    <div className="space-y-5 animate-fade-in">
      <div><h1 className="text-xl font-semibold text-meipay-navy">Compliance</h1><p className="text-sm text-meipay-muted mt-0.5">Track regulatory requirements and filing deadlines</p></div>
      <div className="grid grid-cols-4 gap-4">{[{l:'Completed',v:done,c:'text-emerald-600'},{l:'In Progress',v:1,c:'text-blue-600'},{l:'Upcoming',v:3,c:'text-amber-600'},{l:'Overdue',v:0,c:'text-red-600'}].map(s=>(
        <div key={s.l} className="bg-white rounded-xl border border-meipay-border p-4"><p className={'text-2xl font-bold '+s.c}>{s.v}</p><p className="text-xs text-meipay-muted mt-0.5">{s.l}</p></div>
      ))}</div>
      <div className="bg-white rounded-xl border border-meipay-border p-5"><div className="flex items-center justify-between mb-3"><h2 className="text-sm font-semibold text-meipay-navy">Overall Compliance Score</h2><span className="text-sm font-bold text-meipay-navy">{Math.round(done/ITEMS.length*100)}%</span></div><div className="h-2 bg-meipay-light rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full" style={{width:Math.round(done/ITEMS.length*100)+'%'}} /></div><p className="text-xs text-meipay-muted mt-2">{done} of {ITEMS.length} requirements completed</p></div>
      <div className="bg-white rounded-xl border border-meipay-border overflow-hidden">
        <div className="px-4 py-3 border-b border-meipay-border"><h2 className="text-sm font-semibold text-meipay-navy">Filing Requirements</h2></div>
        <div className="divide-y divide-meipay-border">{ITEMS.map(item=>(
          <div key={item.id} className="px-5 py-4 hover:bg-meipay-light/40 transition-colors flex items-start gap-4">
            {item.status==='COMPLETED'?<CheckCircle className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />:item.status==='IN_PROGRESS'?<Shield className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />:<AlertTriangle className="w-4 h-4 mt-0.5 text-amber-500 shrink-0" />}
            <div className="flex-1 min-w-0"><div className="flex items-center gap-2 flex-wrap"><h3 className="text-sm font-medium text-meipay-navy">{item.title}</h3><span className={'text-xs font-medium px-2 py-0.5 rounded-full '+SC[item.status]}>{item.status.replace('_',' ')}</span><span className={'text-xs font-medium '+PR[item.priority]}>{item.priority}</span></div></div>
            <div className="text-right shrink-0"><div className="flex items-center gap-1 text-xs text-meipay-muted"><Calendar className="w-3 h-3" />{item.due}</div><span className="text-xs text-meipay-muted">{item.cat}</span></div>
          </div>
        ))}</div>
      </div>
    </div>
  )
}
