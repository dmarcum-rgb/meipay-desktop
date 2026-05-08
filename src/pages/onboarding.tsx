// Onboarding Page
import { CheckCircle2, Circle, FileText, Briefcase, User } from 'lucide-react'

const NEW_HIRES = [
  { id:'1', name:'Alex Thompson',   title:'Backend Engineer',  dept:'Engineering', start:'Feb 10, 2026', progress:65,
    tasks:[{id:'t1',title:'Complete I-9 Verification',cat:'Documents',done:true},{id:'t2',title:'Sign offer letter and NDA',cat:'Documents',done:true},{id:'t3',title:'Set up email and SSO',cat:'IT Setup',done:true},{id:'t4',title:'Complete benefits enrollment',cat:'Benefits',done:false},{id:'t5',title:'Review employee handbook',cat:'Policies',done:false},{id:'t6',title:'Schedule 30-60-90 check-in',cat:'Manager',done:false}] },
  { id:'2', name:'Jasmine Williams', title:'Account Executive', dept:'Sales',       start:'Feb 3, 2026',  progress:92,
    tasks:[{id:'t1',title:'Complete I-9 Verification',cat:'Documents',done:true},{id:'t2',title:'Sign offer letter and NDA',cat:'Documents',done:true},{id:'t3',title:'Set up email and SSO',cat:'IT Setup',done:true},{id:'t4',title:'Complete benefits enrollment',cat:'Benefits',done:true},{id:'t5',title:'Review employee handbook',cat:'Policies',done:true},{id:'t6',title:'Schedule 30-60-90 check-in',cat:'Manager',done:false}] },
]

export function OnboardingPage() {
  return (
    <div className="space-y-5 animate-fade-in">
      <div><h1 className="text-xl font-semibold text-meipay-navy">Onboarding</h1><p className="text-sm text-meipay-muted mt-0.5">{NEW_HIRES.length} employees currently onboarding</p></div>
      <div className="grid grid-cols-3 gap-4">
        {[{label:'In Progress',value:'2',color:'border-blue-100 text-blue-700 bg-blue-50'},{label:'Starting This Week',value:'1',color:'border-amber-100 text-amber-700 bg-amber-50'},{label:'Completed This Month',value:'4',color:'border-emerald-100 text-emerald-700 bg-emerald-50'}].map(s=>(
          <div key={s.label} className={'bg-white rounded-xl border p-4 '+s.color}><p className="text-2xl font-bold">{s.value}</p><p className="text-sm font-medium mt-0.5">{s.label}</p></div>
        ))}
      </div>
      <div className="space-y-4">{NEW_HIRES.map(h=>{
        const done = h.tasks.filter(t=>t.done).length
        return (
          <div key={h.id} className="bg-white rounded-xl border border-meipay-border overflow-hidden">
            <div className="p-5 border-b border-meipay-border">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-meipay-navy/10 flex items-center justify-center shrink-0"><span className="font-semibold text-meipay-navy text-sm">{h.name[0]}</span></div>
                  <div><h3 className="font-semibold text-meipay-navy">{h.name}</h3><p className="text-sm text-meipay-muted">{h.title} · {h.dept}</p></div>
                </div>
                <div className="text-right shrink-0"><p className="text-xs text-meipay-muted">Start Date</p><p className="text-sm font-medium text-meipay-navy">{h.start}</p></div>
              </div>
              <div className="flex items-center justify-between mb-1.5"><span className="text-xs text-meipay-muted">{done} of {h.tasks.length} tasks</span><span className="text-xs font-semibold text-meipay-navy">{h.progress}%</span></div>
              <div className="h-1.5 bg-meipay-light rounded-full overflow-hidden"><div className="h-full bg-meipay-accent rounded-full" style={{width:h.progress+'%'}} /></div>
            </div>
            <div className="divide-y divide-meipay-border">{h.tasks.map(t=>(
              <div key={t.id} className="flex items-center gap-3 px-5 py-3 hover:bg-meipay-light/40 transition-colors">
                {t.done ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> : <Circle className="w-4 h-4 text-meipay-border shrink-0" />}
                <span className={'flex-1 text-sm '+(t.done?'line-through text-meipay-muted':'text-meipay-navy')}>{t.title}</span>
                <span className="text-xs text-meipay-muted bg-meipay-light px-2 py-0.5 rounded-full">{t.cat}</span>
              </div>
            ))}</div>
          </div>
        )
      })}</div>
    </div>
  )
}
