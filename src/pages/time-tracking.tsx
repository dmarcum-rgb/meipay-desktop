import { useState } from 'react'
import { Clock, Calendar, CheckCircle, XCircle, AlertCircle, Plus } from 'lucide-react'

const TIME_ENTRIES = [
  { id:'1', employee:'Sarah Mitchell',   date:'Feb 5, 2026', clockIn:'8:52 AM', clockOut:'5:34 PM', hours:'8.7',  type:'REGULAR',  status:'APPROVED' },
  { id:'2', employee:'James Okafor',     date:'Feb 5, 2026', clockIn:'9:01 AM', clockOut:'6:12 PM', hours:'9.2',  type:'REGULAR',  status:'APPROVED' },
  { id:'3', employee:'Priya Sharma',     date:'Feb 5, 2026', clockIn:'8:30 AM', clockOut:null,       hours:'—',    type:'REGULAR',  status:'PENDING'  },
  { id:'4', employee:'Marcus Chen',      date:'Feb 5, 2026', clockIn:'9:15 AM', clockOut:'7:00 PM', hours:'9.75', type:'OVERTIME', status:'PENDING'  },
  { id:'5', employee:'Tyler Brooks',     date:'Feb 5, 2026', clockIn:'—',       clockOut:'—',        hours:'8.0',  type:'PTO',      status:'APPROVED' },
]
const LEAVE = [
  { id:'1', employee:'Daniel Park',     type:'PTO',  dates:'Feb 10 – Feb 14, 2026', days:5, status:'PENDING',  reason:'Family vacation'      },
  { id:'2', employee:'Amara Johnson',   type:'SICK', dates:'Feb 6, 2026',            days:1, status:'APPROVED', reason:'Medical appointment'  },
  { id:'3', employee:'Elena Rodriguez', type:'PTO',  dates:'Feb 17 – Feb 21, 2026', days:5, status:'PENDING',  reason:'Personal time'        },
]
const SC: Record<string,string> = { APPROVED:'bg-emerald-50 text-emerald-700', PENDING:'bg-amber-50 text-amber-700', REJECTED:'bg-red-50 text-red-700' }
const TC: Record<string,string> = { REGULAR:'text-meipay-navy', OVERTIME:'text-amber-600', PTO:'text-blue-600', SICK:'text-purple-600' }

export function TimeTrackingPage() {
  const [tab, setTab] = useState<'attendance'|'leave'>('attendance')
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div><h1 className="text-xl font-semibold text-meipay-navy">Time & Attendance</h1><p className="text-sm text-meipay-muted mt-0.5">Track time, manage schedules, approve leave</p></div>
        <button className="inline-flex items-center gap-2 bg-meipay-navy text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-meipay-slate transition-colors"><Plus className="w-4 h-4" />Log Time</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[{label:'Clocked In Today',value:'142',icon:Clock,color:'bg-blue-50 text-blue-600'},{label:'On Leave Today',value:'8',icon:Calendar,color:'bg-purple-50 text-purple-600'},{label:'Pending Approvals',value:'5',icon:AlertCircle,color:'bg-amber-50 text-amber-600'},{label:'Avg Hours / Week',value:'41.2',icon:CheckCircle,color:'bg-emerald-50 text-emerald-600'}].map(c=>(
          <div key={c.label} className="bg-white rounded-xl border border-meipay-border p-4">
            <div className={'w-8 h-8 rounded-lg flex items-center justify-center mb-3 '+c.color}><c.icon className="w-4 h-4" /></div>
            <p className="text-xl font-bold text-meipay-navy">{c.value}</p><p className="text-xs text-meipay-muted mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>
      <div className="border-b border-meipay-border"><nav className="flex">{[['attendance','Attendance Log'],['leave','Leave Requests']].map(([id,label])=>(
        <button key={id} onClick={()=>setTab(id as any)} className={'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors '+(tab===id?'border-meipay-accent text-meipay-accent':'border-transparent text-meipay-muted hover:text-meipay-navy')}>{label}</button>
      ))}</nav></div>
      {tab==='attendance' && (
        <div className="bg-white rounded-xl border border-meipay-border overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-meipay-border bg-meipay-light/50">{['Employee','Date','Clock In','Clock Out','Hours','Type','Status',''].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-medium text-meipay-muted uppercase tracking-wide">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-meipay-border">{TIME_ENTRIES.map(e=>(
              <tr key={e.id} className="hover:bg-meipay-light/40 transition-colors">
                <td className="px-4 py-3.5 font-medium text-meipay-navy">{e.employee}</td>
                <td className="px-4 py-3.5 text-meipay-muted">{e.date}</td>
                <td className="px-4 py-3.5 text-meipay-navy">{e.clockIn}</td>
                <td className="px-4 py-3.5 text-meipay-navy">{e.clockOut??<span className="text-meipay-muted italic">Active</span>}</td>
                <td className="px-4 py-3.5 font-medium text-meipay-navy">{e.hours}</td>
                <td className={'px-4 py-3.5 text-xs font-medium '+TC[e.type]}>{e.type}</td>
                <td className="px-4 py-3.5"><span className={'text-xs font-medium px-2 py-1 rounded-full '+SC[e.status]}>{e.status}</span></td>
                <td className="px-4 py-3.5">{e.status==='PENDING'&&<div className="flex items-center gap-1 justify-end"><button className="p-1.5 rounded hover:bg-emerald-50 text-emerald-600 transition-colors"><CheckCircle className="w-4 h-4" /></button><button className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors"><XCircle className="w-4 h-4" /></button></div>}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
      {tab==='leave' && (
        <div className="bg-white rounded-xl border border-meipay-border overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-meipay-border bg-meipay-light/50">{['Employee','Type','Dates','Days','Reason','Status',''].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-medium text-meipay-muted uppercase tracking-wide">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-meipay-border">{LEAVE.map(r=>(
              <tr key={r.id} className="hover:bg-meipay-light/40 transition-colors">
                <td className="px-4 py-3.5 font-medium text-meipay-navy">{r.employee}</td>
                <td className="px-4 py-3.5 text-meipay-muted">{r.type}</td>
                <td className="px-4 py-3.5 text-meipay-navy">{r.dates}</td>
                <td className="px-4 py-3.5 font-medium text-meipay-navy">{r.days}</td>
                <td className="px-4 py-3.5 text-meipay-muted">{r.reason}</td>
                <td className="px-4 py-3.5"><span className={'text-xs font-medium px-2 py-1 rounded-full '+SC[r.status]}>{r.status}</span></td>
                <td className="px-4 py-3.5">{r.status==='PENDING'&&<div className="flex items-center gap-1 justify-end"><button className="p-1.5 rounded hover:bg-emerald-50 text-emerald-600 transition-colors"><CheckCircle className="w-4 h-4" /></button><button className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors"><XCircle className="w-4 h-4" /></button></div>}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </div>
  )
}
