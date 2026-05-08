import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Users, DollarSign, Clock,
  UserPlus, Target, Heart, Shield, Settings,
  BarChart3, FileText, ChevronLeft, ChevronRight,
  LogOut,
} from 'lucide-react'
import { useAuth } from '@/store/auth'
import { cn } from '@/lib/utils'

const nav = [
  {
    group: 'Overview',
    items: [
      { label: 'Dashboard',   to: '/dashboard',     icon: LayoutDashboard },
      { label: 'Analytics',   to: '/analytics',     icon: BarChart3 },
    ],
  },
  {
    group: 'Workforce',
    items: [
      { label: 'Employees',       to: '/employees',     icon: Users },
      { label: 'Payroll',         to: '/payroll',       icon: DollarSign },
      { label: 'Time & Attendance', to: '/time-tracking', icon: Clock },
    ],
  },
  {
    group: 'People',
    items: [
      { label: 'Onboarding', to: '/onboarding', icon: UserPlus },
      { label: 'Talent',     to: '/talent',     icon: Target },
      { label: 'Benefits',   to: '/benefits',   icon: Heart },
    ],
  },
  {
    group: 'Compliance',
    items: [
      { label: 'Compliance', to: '/compliance', icon: Shield },
      { label: 'Documents',  to: '/documents',  icon: FileText },
    ],
  },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { user, logout } = useAuth()

  return (
    <aside
      className={cn(
        'relative flex flex-col bg-meipay-navy text-white transition-all duration-200 ease-in-out shrink-0 border-r border-meipay-slate',
        collapsed ? 'w-[56px]' : 'w-[220px]'
      )}
    >
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-5">
        {nav.map((group) => (
          <div key={group.group}>
            {!collapsed && (
              <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                {group.group}
              </p>
            )}
            <ul className="space-y-0.5 px-2">
              {group.items.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    title={collapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm transition-colors',
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-white/55 hover:bg-white/5 hover:text-white',
                        collapsed && 'justify-center px-0'
                      )
                    }
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-meipay-slate p-2 space-y-0.5">
        <NavLink
          to="/settings"
          title={collapsed ? 'Settings' : undefined}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm transition-colors',
              isActive ? 'bg-white/10 text-white' : 'text-white/55 hover:bg-white/5 hover:text-white',
              collapsed && 'justify-center px-0'
            )
          }
        >
          <Settings className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Settings</span>}
        </NavLink>

        {!collapsed && user && (
          <div className="px-2 pt-2 pb-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-meipay-accent/25 flex items-center justify-center shrink-0">
                <span className="text-xs font-semibold text-white">
                  {user.name?.[0]?.toUpperCase()}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-white truncate leading-tight">{user.name}</p>
                <p className="text-[10px] text-white/35 truncate">{user.role.replace('_', ' ')}</p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={logout}
          title={collapsed ? 'Sign Out' : undefined}
          className={cn(
            'w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-white/55 hover:bg-white/5 hover:text-white transition-colors',
            collapsed && 'justify-center px-0'
          )}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-meipay-navy border border-meipay-slate rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors shadow-md"
        aria-label={collapsed ? 'Expand' : 'Collapse'}
      >
        {collapsed
          ? <ChevronRight className="w-3 h-3" />
          : <ChevronLeft className="w-3 h-3" />
        }
      </button>
    </aside>
  )
}
