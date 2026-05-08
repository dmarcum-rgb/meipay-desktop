import { useState } from 'react'
import { Play, DollarSign, Users, Calendar, Download, ChevronRight, CheckCircle } from 'lucide-react'

const PAY_PERIODS = [
  { id:'1', period:'Feb 1 – Feb 15, 2026',  payDate:'Feb 20, 2026', status:'DRAFT',   employees:171, gross:'$701,000', net:'$507,225', taxes:'$151,200' },
  { id:'2', period:'Jan 16 – Jan 31, 2026', payDate:'Feb 5, 2026',  status:'PAID',    employees:168, gross:'$689,240', net:'$498,120', taxes:'$148,460' },
  { id:'3', period:'Jan 1 – Jan 15, 2026',  payDate:'Jan 20, 2026', status:'PAID',    employees:165, gross:'$672,800', net:'$486,550', taxes:'$144,890' },
  { id:'4', period:'Dec 16 – Dec 31, 2025', payDate:'Jan 5, 2026',  status:'PAID',    employees:162, gross:'$661,400', net:'$478,200', taxes:'$142,100' },
]

const STATUS: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-600',
  PROCESSING: 'bg-blue-50 text-blue-700',
  APPROVED: 'bg-amber-50 text-amber-700',
  PAID: 'bg-emerald-50 text-emerald-700',
}

export function PayrollPage() {
  const [tab, setTab] = useState<'periods'|'stubs'>('periods')

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-meipay-navy">Payroll</h1>
          <p className="text-sm text-meipay-muted mt-0.5">Manage pay periods, run payroll, and view pay stubs</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-meipay-navy text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-meipay-slate transition-colors">
          <Play className="w-4 h-4" /> Run Payroll
        </button>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label:'Current Period Gross', value:'$701,000', icon:DollarSign, color:'bg-emerald-50 text-emerald-600' },
          { label:'Employees on Payroll', value:'171',      icon:Users,      color:'bg-blue-50 text-blue-600'     },
          { label:'Next Pay Date',        value:'Feb 20',   icon:Calendar,   color:'bg-purple-50 text-purple-600' },
          { label:'YTD Payroll',          value:'$1.39M',   icon:DollarSign, color:'bg-meipay-light text-meipay-navy' },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-xl border border-meipay-border p-4">
            <div className={'w-8 h-8 rounded-lg flex items-center justify-center mb-3 ' + c.color}>
              <c.icon className="w-4 h-4" />
            </div>
            <p className="text-xl font-bold text-meipay-navy">{c.value}</p>
            <p className="text-xs text-meipay-muted mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="border-b border-meipay-border">
        <nav className="flex">
          {([['periods','Pay Periods'],['stubs','Pay Stubs']] as const).map(([id,label]) => (
            <button key={id} onClick={() => setTab(id as any)} className={'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ' + (tab === id ? 'border-meipay-accent text-meipay-accent' : 'border-transparent text-meipay-muted hover:text-meipay-navy')}>
              {label}
            </button>
          ))}
        </nav>
      </div>

      {tab === 'periods' && (
        <div className="bg-white rounded-xl border border-meipay-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-meipay-border bg-meipay-light/50">
                {['Pay Period','Pay Date','Employees','Gross','Net','Taxes','Status',''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-meipay-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-meipay-border">
              {PAY_PERIODS.map(pp => (
                <tr key={pp.id} className="hover:bg-meipay-light/40 transition-colors">
                  <td className="px-4 py-3.5 font-medium text-meipay-navy">{pp.period}</td>
                  <td className="px-4 py-3.5 text-meipay-muted">{pp.payDate}</td>
                  <td className="px-4 py-3.5 text-meipay-navy">{pp.employees}</td>
                  <td className="px-4 py-3.5 font-semibold text-meipay-navy">{pp.gross}</td>
                  <td className="px-4 py-3.5 text-meipay-navy">{pp.net}</td>
                  <td className="px-4 py-3.5 text-meipay-muted">{pp.taxes}</td>
                  <td className="px-4 py-3.5">
                    <span className={'text-xs font-medium px-2 py-1 rounded-full ' + STATUS[pp.status]}>{pp.status}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1 justify-end">
                      {pp.status === 'DRAFT' && <button className="inline-flex items-center gap-1 text-xs font-medium bg-meipay-navy text-white px-3 py-1.5 rounded-lg hover:bg-meipay-slate transition-colors"><Play className="w-3 h-3" />Process</button>}
                      {pp.status === 'PAID' && <button className="inline-flex items-center gap-1 text-xs text-meipay-muted border border-meipay-border px-3 py-1.5 rounded-lg hover:bg-meipay-light transition-colors"><Download className="w-3 h-3" />Export</button>}
                      <button className="p-1.5 rounded hover:bg-meipay-light transition-colors"><ChevronRight className="w-4 h-4 text-meipay-muted" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'stubs' && (
        <div className="bg-white rounded-xl border border-meipay-border p-10 text-center">
          <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
          <h3 className="font-semibold text-meipay-navy mb-1">Pay Stubs</h3>
          <p className="text-sm text-meipay-muted">Select a pay period to view individual pay stubs.</p>
        </div>
      )}
    </div>
  )
}
