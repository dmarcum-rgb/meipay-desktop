import { useState } from 'react'
import { Search, Plus, Download, MoreHorizontal, Mail } from 'lucide-react'

const EMPLOYEES = [
  { id: '1', name: 'Sarah Mitchell',  title: 'Senior Software Engineer', dept: 'Engineering',  status: 'ACTIVE',    email: 's.mitchell@meiborg.com',  hireDate: '2021-03-15', pay: '$135,000', type: 'Full Time' },
  { id: '2', name: 'James Okafor',    title: 'Product Manager',          dept: 'Product',      status: 'ACTIVE',    email: 'j.okafor@meiborg.com',    hireDate: '2020-07-22', pay: '$148,000', type: 'Full Time' },
  { id: '3', name: 'Priya Sharma',    title: 'UX Designer',              dept: 'Design',       status: 'ACTIVE',    email: 'p.sharma@meiborg.com',    hireDate: '2022-01-10', pay: '$118,000', type: 'Full Time' },
  { id: '4', name: 'Marcus Chen',     title: 'Data Analyst',             dept: 'Analytics',    status: 'ACTIVE',    email: 'm.chen@meiborg.com',      hireDate: '2021-09-05', pay: '$105,000', type: 'Full Time' },
  { id: '5', name: 'Elena Rodriguez', title: 'HR Business Partner',      dept: 'HR',           status: 'ACTIVE',    email: 'e.rodriguez@meiborg.com', hireDate: '2019-11-18', pay: '$112,000', type: 'Full Time' },
  { id: '6', name: 'Tyler Brooks',    title: 'DevOps Engineer',          dept: 'Engineering',  status: 'ON_LEAVE',  email: 't.brooks@meiborg.com',    hireDate: '2022-05-03', pay: '$128,000', type: 'Full Time' },
  { id: '7', name: 'Amara Johnson',   title: 'Marketing Manager',        dept: 'Marketing',    status: 'ACTIVE',    email: 'a.johnson@meiborg.com',   hireDate: '2020-02-14', pay: '$122,000', type: 'Full Time' },
  { id: '8', name: 'Daniel Park',     title: 'Frontend Developer',       dept: 'Engineering',  status: 'ACTIVE',    email: 'd.park@meiborg.com',      hireDate: '2023-03-01', pay: '$115,000', type: 'Full Time' },
  { id: '9', name: 'Jasmine Williams',title: 'Account Executive',        dept: 'Sales',        status: 'ACTIVE',    email: 'j.williams@meiborg.com',  hireDate: '2023-02-06', pay: '$98,000',  type: 'Full Time' },
  { id:'10', name: 'Alex Thompson',   title: 'Backend Engineer',         dept: 'Engineering',  status: 'PENDING',   email: 'a.thompson@meiborg.com',  hireDate: '2026-02-10', pay: '$125,000', type: 'Full Time' },
]

const STATUS: Record<string, string> = {
  ACTIVE:   'bg-emerald-50 text-emerald-700',
  ON_LEAVE: 'bg-amber-50 text-amber-700',
  TERMINATED: 'bg-red-50 text-red-700',
  PENDING:  'bg-blue-50 text-blue-700',
}

export function EmployeesPage() {
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState('All')
  const [status, setStatus] = useState('All')

  const depts = ['All', ...Array.from(new Set(EMPLOYEES.map(e => e.dept)))]
  const filtered = EMPLOYEES.filter(e =>
    (dept === 'All' || e.dept === dept) &&
    (status === 'All' || e.status === status) &&
    (search === '' || e.name.toLowerCase().includes(search.toLowerCase()) || e.title.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-meipay-navy">Employees</h1>
          <p className="text-sm text-meipay-muted mt-0.5">{EMPLOYEES.length} total employees</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-1.5 text-sm text-meipay-muted border border-meipay-border rounded-lg px-3 py-2 hover:bg-meipay-light transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="inline-flex items-center gap-1.5 bg-meipay-navy text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-meipay-slate transition-colors">
            <Plus className="w-4 h-4" /> Add Employee
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-meipay-border p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-meipay-muted" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employees..." className="w-full pl-9 pr-4 py-2 border border-meipay-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-meipay-accent/20 focus:border-meipay-accent" />
        </div>
        <select value={dept} onChange={e => setDept(e.target.value)} className="border border-meipay-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-meipay-accent/20 bg-white">
          {depts.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)} className="border border-meipay-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-meipay-accent/20 bg-white">
          {['All','ACTIVE','ON_LEAVE','PENDING','TERMINATED'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-meipay-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-meipay-border bg-meipay-light/50">
              {['Employee','Department','Status','Type','Compensation','Hire Date',''].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-meipay-muted uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-meipay-border">
            {filtered.map(emp => (
              <tr key={emp.id} className="hover:bg-meipay-light/40 transition-colors">
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-meipay-navy/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-semibold text-meipay-navy">{emp.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium text-meipay-navy">{emp.name}</p>
                      <p className="text-xs text-meipay-muted">{emp.title}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-meipay-navy">{emp.dept}</td>
                <td className="px-4 py-3.5">
                  <span className={'text-xs font-medium px-2 py-1 rounded-full ' + STATUS[emp.status]}>{emp.status.replace('_',' ')}</span>
                </td>
                <td className="px-4 py-3.5 text-meipay-muted text-xs">{emp.type}</td>
                <td className="px-4 py-3.5 font-medium text-meipay-navy">{emp.pay}</td>
                <td className="px-4 py-3.5 text-meipay-muted">{new Date(emp.hireDate).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1 justify-end">
                    <a href={'mailto:'+emp.email} className="p-1.5 rounded hover:bg-meipay-light text-meipay-muted hover:text-meipay-navy transition-colors"><Mail className="w-3.5 h-3.5" /></a>
                    <button className="p-1.5 rounded hover:bg-meipay-light text-meipay-muted hover:text-meipay-navy transition-colors"><MoreHorizontal className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 border-t border-meipay-border flex items-center justify-between">
          <p className="text-xs text-meipay-muted">Showing <span className="font-medium text-meipay-navy">{filtered.length}</span> of <span className="font-medium text-meipay-navy">{EMPLOYEES.length}</span> employees</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-xs border border-meipay-border rounded-lg text-meipay-navy disabled:opacity-40" disabled>Previous</button>
            <button className="px-3 py-1.5 text-xs bg-meipay-navy text-white rounded-lg">1</button>
            <button className="px-3 py-1.5 text-xs border border-meipay-border rounded-lg text-meipay-navy">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
