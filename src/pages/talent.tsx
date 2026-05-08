import { Star, Target, Plus } from 'lucide-react'

const REVIEWS = [
  { id:'1', employee:'Sarah Mitchell',  role:'Sr. Software Engineer', period:'Q4 2025', score:4.5, status:'COMPLETED' },
  { id:'2', employee:'James Okafor',    role:'Product Manager',       period:'Q4 2025', score:4.2, status:'COMPLETED' },
  { id:'3', employee:'Priya Sharma',    role:'UX Designer',           period:'Q4 2025', score:null, status:'IN_PROGRESS' },
  { id:'4', employee:'Marcus Chen',     role:'Data Analyst',          period:'Q4 2025', score:null, status:'DRAFT' },
  { id:'5', employee:'Amara Johnson',   role:'Marketing Manager',     period:'Q4 2025', score:4.8, status:'COMPLETED' },
]
const GOALS = [
  { id:'1', employee:'Sarah Mitchell',  title:'Reduce API response time by 30%',        due:'Mar 31, 2026', progress:60,  status:'IN_PROGRESS' },
  { id:'2', employee:'James Okafor',    title:'Launch mobile product v2.0',             due:'Apr 15, 2026', progress:35,  status:'IN_PROGRESS' },
  { id:'3', employee:'Priya Sharma',    title:'Complete design system documentation',   due:'Feb 28, 2026', progress:80,  status:'IN_PROGRESS' },
  { id:'4', employee:'Marcus Chen',     title:'Build automated reporting dashboard',    due:'Mar 15, 2026', progress:100, status:'COMPLETED'   },
]
const SC: Record<string,string> = { COMPLETED:'bg-emerald-50 text-emerald-700', IN_PROGRESS:'bg-blue-50 text-blue-700', DRAFT:'bg-gray-100 text-gray-600' }

function StarRating({ score }: { score: number | null }) {
  if (!score) return <span className="text-meipay-muted text-xs">Not rated</span>
  return <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /><span className="text-sm font-semibold text-meipay-navy">{score.toFixed(1)}</span><span className="text-xs text-meipay-muted">/ 5.0</span></div>
}

export function TalentPage() {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div><h1 className="text-xl font-semibold text-meipay-navy">Talent Management</h1><p className="text-sm text-meipay-muted mt-0.5">Performance reviews, goals, and development</p></div>
        <button className="inline-flex items-center gap-2 bg-meipay-navy text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-meipay-slate transition-colors"><Plus className="w-4 h-4" />Start Review Cycle</button>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-meipay-border overflow-hidden">
          <div className="p-4 border-b border-meipay-border flex items-center justify-between">
            <div className="flex items-center gap-2"><Star className="w-4 h-4 text-amber-400" /><h2 className="font-semibold text-meipay-navy text-sm">Performance Reviews</h2></div>
            <span className="text-xs text-meipay-muted">Q4 2025 Cycle</span>
          </div>
          <div className="divide-y divide-meipay-border">{REVIEWS.map(r=>(
            <div key={r.id} className="px-4 py-3.5 flex items-center gap-3 hover:bg-meipay-light/40 transition-colors">
              <div className="w-8 h-8 rounded-full bg-meipay-navy/10 flex items-center justify-center shrink-0"><span className="text-xs font-semibold text-meipay-navy">{r.employee[0]}</span></div>
              <div className="flex-1 min-w-0"><p className="text-sm font-medium text-meipay-navy truncate">{r.employee}</p><p className="text-xs text-meipay-muted">{r.role}</p></div>
              <div className="flex items-center gap-3 shrink-0">
                <StarRating score={r.score} />
                <span className={'text-xs font-medium px-2 py-1 rounded-full '+SC[r.status]}>{r.status.replace('_',' ')}</span>
              </div>
            </div>
          ))}</div>
        </div>
        <div className="bg-white rounded-xl border border-meipay-border overflow-hidden">
          <div className="p-4 border-b border-meipay-border flex items-center justify-between">
            <div className="flex items-center gap-2"><Target className="w-4 h-4 text-meipay-accent" /><h2 className="font-semibold text-meipay-navy text-sm">Active Goals</h2></div>
            <button className="text-xs text-meipay-accent hover:underline">View all</button>
          </div>
          <div className="divide-y divide-meipay-border">{GOALS.map(g=>(
            <div key={g.id} className="px-4 py-3.5 hover:bg-meipay-light/40 transition-colors">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0"><p className="text-sm font-medium text-meipay-navy truncate">{g.title}</p><p className="text-xs text-meipay-muted">{g.employee} · Due {g.due}</p></div>
                <span className={'text-xs font-medium px-2 py-1 rounded-full shrink-0 '+SC[g.status]}>{g.progress}%</span>
              </div>
              <div className="h-1.5 bg-meipay-light rounded-full overflow-hidden"><div className={'h-full rounded-full transition-all '+(g.progress===100?'bg-emerald-500':'bg-meipay-accent')} style={{width:g.progress+'%'}} /></div>
            </div>
          ))}</div>
        </div>
      </div>
    </div>
  )
}
