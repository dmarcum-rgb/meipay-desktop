import { Heart, Shield, Eye, TrendingUp, Umbrella, Users } from 'lucide-react'
const PLANS = [
  { id:'1', name:'Meiborg Health Gold',  type:'HEALTH',         provider:'Blue Cross',   enrolled:142, eligible:168, cost:'$420/mo',  emp:'$125/mo'  },
  { id:'2', name:'Delta Dental Plus',    type:'DENTAL',         provider:'Delta Dental', enrolled:138, eligible:168, cost:'$48/mo',   emp:'$12/mo'   },
  { id:'3', name:'VSP Vision Care',      type:'VISION',         provider:'VSP',          enrolled:129, eligible:168, cost:'$18/mo',   emp:'$4/mo'    },
  { id:'4', name:'401(k) Retirement',    type:'RETIREMENT_401K',provider:'Fidelity',     enrolled:155, eligible:168, cost:'Variable', emp:'4% match' },
  { id:'5', name:'Group Life Insurance', type:'LIFE_INSURANCE', provider:'MetLife',      enrolled:168, eligible:168, cost:'$8/mo',    emp:'$0'       },
]
const ICONS: Record<string,any> = { HEALTH:Heart, DENTAL:Shield, VISION:Eye, RETIREMENT_401K:TrendingUp, LIFE_INSURANCE:Umbrella }
const COLORS: Record<string,string> = { HEALTH:'bg-red-50 text-red-600', DENTAL:'bg-blue-50 text-blue-600', VISION:'bg-purple-50 text-purple-600', RETIREMENT_401K:'bg-emerald-50 text-emerald-600', LIFE_INSURANCE:'bg-amber-50 text-amber-600' }
export function BenefitsPage() {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div><h1 className="text-xl font-semibold text-meipay-navy">Benefits Administration</h1><p className="text-sm text-meipay-muted mt-0.5">Manage benefit plans and enrollments</p></div>
        <button className="text-sm bg-meipay-light text-meipay-navy border border-meipay-border font-medium px-4 py-2 rounded-lg hover:border-meipay-navy transition-colors">Open Enrollment</button>
      </div>
      <div className="grid grid-cols-3 gap-4">{[{label:'Active Plans',value:PLANS.length,icon:Shield},{label:'Total Enrolled',value:'168',icon:Users},{label:'Monthly Benefit Cost',value:'$84,240',icon:TrendingUp}].map(s=>(
        <div key={s.label} className="bg-white rounded-xl border border-meipay-border p-4 flex items-center gap-4"><div className="w-10 h-10 rounded-lg bg-meipay-navy/5 flex items-center justify-center"><s.icon className="w-5 h-5 text-meipay-navy" /></div><div><p className="text-xl font-bold text-meipay-navy">{s.value}</p><p className="text-xs text-meipay-muted">{s.label}</p></div></div>
      ))}</div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">{PLANS.map(p=>{
        const Icon=ICONS[p.type]; const color=COLORS[p.type]; const pct=Math.round((p.enrolled/p.eligible)*100)
        return (
          <div key={p.id} className="bg-white rounded-xl border border-meipay-border p-5">
            <div className="flex items-start gap-3 mb-3"><div className={'w-10 h-10 rounded-lg flex items-center justify-center shrink-0 '+color}><Icon className="w-5 h-5" /></div><div className="flex-1 min-w-0"><h3 className="font-semibold text-meipay-navy">{p.name}</h3><p className="text-xs text-meipay-muted">{p.provider}</p></div><span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full font-medium shrink-0">Active</span></div>
            <div className="grid grid-cols-2 gap-3 mb-4"><div><p className="text-xs text-meipay-muted">Employer</p><p className="text-sm font-semibold text-meipay-navy">{p.cost}</p></div><div><p className="text-xs text-meipay-muted">Employee</p><p className="text-sm font-semibold text-meipay-navy">{p.emp}</p></div></div>
            <div><div className="flex items-center justify-between mb-1.5"><span className="text-xs text-meipay-muted">{p.enrolled}/{p.eligible} enrolled</span><span className="text-xs font-semibold text-meipay-navy">{pct}%</span></div><div className="h-1.5 bg-meipay-light rounded-full overflow-hidden"><div className="h-full bg-meipay-accent rounded-full" style={{width:pct+'%'}} /></div></div>
          </div>
        )
      })}</div>
    </div>
  )
          }
