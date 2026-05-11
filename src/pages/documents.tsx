import { useState } from 'react'
import { FileText, Download, Upload, Search, FolderOpen, File, FileCheck } from 'lucide-react'

const DOCS = [
  { id: '1', name: 'Employee Handbook 2026',        type: 'Policy',    size: '2.4 MB', updated: 'Jan 15, 2026', status: 'PUBLISHED' },
  { id: '2', name: 'I-9 Employment Eligibility',    type: 'Form',      size: '340 KB', updated: 'Feb 1, 2026',  status: 'PUBLISHED' },
  { id: '3', name: 'Direct Deposit Authorization',  type: 'Form',      size: '180 KB', updated: 'Jan 10, 2026', status: 'PUBLISHED' },
  { id: '4', name: 'W-4 Federal Withholding',       type: 'Tax Form',  size: '220 KB', updated: 'Jan 1, 2026',  status: 'PUBLISHED' },
  { id: '5', name: 'Non-Disclosure Agreement',      type: 'Legal',     size: '128 KB', updated: 'Dec 20, 2025', status: 'PUBLISHED' },
  { id: '6', name: 'Benefits Summary 2026',         type: 'Benefits',  size: '1.1 MB', updated: 'Jan 20, 2026', status: 'PUBLISHED' },
  { id: '7', name: 'Performance Review Template',   type: 'Template',  size: '95 KB',  updated: 'Oct 5, 2025',  status: 'DRAFT'     },
  { id: '8', name: 'Remote Work Policy',            type: 'Policy',    size: '210 KB', updated: 'Feb 3, 2026',  status: 'PUBLISHED' },
]

const TYPE_COLORS: Record<string, string> = {
  Policy:   'bg-blue-50 text-blue-700',
  Form:     'bg-emerald-50 text-emerald-700',
  'Tax Form': 'bg-amber-50 text-amber-700',
  Legal:    'bg-purple-50 text-purple-700',
  Benefits: 'bg-pink-50 text-pink-700',
  Template: 'bg-gray-100 text-gray-600',
}

export function DocumentsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const types = ['All', ...Array.from(new Set(DOCS.map(d => d.type)))]
  const filtered = DOCS.filter(d =>
    (filter === 'All' || d.type === filter) &&
    (search === '' || d.name.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-meipay-navy">Documents</h1>
          <p className="text-sm text-meipay-muted mt-0.5">Company forms, policies, and templates</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-1.5 text-sm text-meipay-muted border border-meipay-border rounded-lg px-3 py-2 hover:bg-meipay-light transition-colors">
            <Upload className="w-4 h-4" /> Upload
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Documents', value: DOCS.length, icon: FileText },
          { label: 'Published',       value: DOCS.filter(d => d.status === 'PUBLISHED').length, icon: FileCheck },
          { label: 'Drafts',          value: DOCS.filter(d => d.status === 'DRAFT').length, icon: FolderOpen },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-meipay-border p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-meipay-navy/5 flex items-center justify-center">
              <s.icon className="w-5 h-5 text-meipay-navy" />
            </div>
            <div>
              <p className="text-xl font-bold text-meipay-navy">{s.value}</p>
              <p className="text-xs text-meipay-muted">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-meipay-border p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-meipay-muted" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-9 pr-4 py-2 border border-meipay-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-meipay-accent/20 focus:border-meipay-accent"
          />
        </div>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border border-meipay-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-meipay-accent/20 bg-white"
        >
          {types.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-meipay-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-meipay-border bg-meipay-light/50">
              {['Document', 'Type', 'Size', 'Last Updated', 'Status', ''].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-meipay-muted uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-meipay-border">
            {filtered.map(doc => (
              <tr key={doc.id} className="hover:bg-meipay-light/40 transition-colors">
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <File className="w-4 h-4 text-meipay-muted shrink-0" />
                    <span className="font-medium text-meipay-navy">{doc.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className={'text-xs font-medium px-2 py-1 rounded-full ' + (TYPE_COLORS[doc.type] ?? 'bg-gray-100 text-gray-600')}>
                    {doc.type}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-meipay-muted">{doc.size}</td>
                <td className="px-4 py-3.5 text-meipay-muted">{doc.updated}</td>
                <td className="px-4 py-3.5">
                  <span className={'text-xs font-medium px-2 py-1 rounded-full ' + (doc.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600')}>
                    {doc.status}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <button className="inline-flex items-center gap-1 text-xs text-meipay-muted border border-meipay-border px-3 py-1.5 rounded-lg hover:bg-meipay-light transition-colors">
                    <Download className="w-3 h-3" /> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 border-t border-meipay-border">
          <p className="text-xs text-meipay-muted">
            Showing <span className="font-medium text-meipay-navy">{filtered.length}</span> of <span className="font-medium text-meipay-navy">{DOCS.length}</span> documents
          </p>
        </div>
      </div>
    </div>
  )
}
