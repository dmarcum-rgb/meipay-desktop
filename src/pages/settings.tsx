import { useState } from 'react'
import { useAuth } from '@/store/auth'
const SECTIONS = ['Profile','Company','Notifications','Security','Appearance']
export function SettingsPage() {
  const [active, setActive] = useState('Profile')
  const { user } = useAuth()
  return (
    <div className="space-y-5 animate-fade-in">
      <div><h1 className="text-xl font-semibold text-meipay-navy">Settings</h1><p className="text-sm text-meipay-muted mt-0.5">Manage your account and application preferences</p></div>
      <div className="flex gap-5">
        <aside className="w-44 shrink-0"><nav className="space-y-0.5">{SECTIONS.map(s=>(<button key={s} onClick={()=>setActive(s)} className={'w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors '+(active===s?'bg-meipay-navy text-white':'text-meipay-muted hover:bg-meipay-light hover:text-meipay-navy')}>{s}</button>))}</nav></aside>
        <div className="flex-1 bg-white rounded-xl border border-meipay-border p-6">
          {active==='Profile' && (
            <div className="space-y-5">
              <h2 className="font-semibold text-meipay-navy">Profile Settings</h2>
              <div className="flex items-center gap-4 pb-5 border-b border-meipay-border">
                <div className="w-16 h-16 rounded-full bg-meipay-navy flex items-center justify-center shrink-0"><span className="text-2xl font-bold text-white">{user?.name?.[0]}</span></div>
                <div><p className="font-semibold text-meipay-navy">{user?.name}</p><p className="text-sm text-meipay-muted">{user?.title}</p><button className="text-xs text-meipay-accent hover:underline mt-1">Change avatar</button></div>
              </div>
              <div className="grid grid-cols-2 gap-4">{[{label:'First Name',value:user?.name?.split(' ')[0]??''},{label:'Last Name',value:user?.name?.split(' ')[1]??''},{label:'Email',value:user?.email??''},{label:'Job Title',value:user?.title??''}].map(f=>(<div key={f.label}><label className="block text-sm font-medium text-meipay-navy mb-1.5">{f.label}</label><input defaultValue={f.value} className="w-full px-3.5 py-2.5 border border-meipay-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-meipay-accent/20 focus:border-meipay-accent" /></div>))}</div>
              <div className="flex justify-end"><button className="bg-meipay-navy text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-meipay-slate transition-colors">Save Changes</button></div>
            </div>
          )}
          {active!=='Profile' && <div className="flex flex-col items-center justify-center h-48 text-center"><p className="font-semibold text-meipay-navy">{active} Settings</p><p className="text-sm text-meipay-muted mt-1">This section is coming soon.</p></div>}
        </div>
      </div>
    </div>
  )
}
