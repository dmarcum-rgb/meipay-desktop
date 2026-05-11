import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/store/auth'
import { TitleBar } from '@/components/layout/title-bar'
import { Sidebar } from '@/components/layout/sidebar'
import { LoginPage } from '@/pages/login'
import { DashboardPage } from '@/pages/dashboard'
import { EmployeesPage } from '@/pages/employees'
import { PayrollPage } from '@/pages/payroll'
import { TimeTrackingPage } from '@/pages/time-tracking'
import { OnboardingPage } from '@/pages/onboarding'
import { TalentPage } from '@/pages/talent'
import { BenefitsPage } from '@/pages/benefits'
import { CompliancePage } from '@/pages/compliance'
import { AnalyticsPage } from '@/pages/analytics'
import { SettingsPage } from '@/pages/settings'
import { DocumentsPage } from '@/pages/documents'

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-meipay-light overflow-hidden">
      <TitleBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-screen-2xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return <ProtectedLayout>{children}</ProtectedLayout>
}

export default function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />

      <Route path="/dashboard"   element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/employees/*" element={<ProtectedRoute><EmployeesPage /></ProtectedRoute>} />
      <Route path="/payroll/*"   element={<ProtectedRoute><PayrollPage /></ProtectedRoute>} />
      <Route path="/time-tracking" element={<ProtectedRoute><TimeTrackingPage /></ProtectedRoute>} />
      <Route path="/onboarding"  element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
      <Route path="/talent"      element={<ProtectedRoute><TalentPage /></ProtectedRoute>} />
      <Route path="/benefits"    element={<ProtectedRoute><BenefitsPage /></ProtectedRoute>} />
      <Route path="/compliance"  element={<ProtectedRoute><CompliancePage /></ProtectedRoute>} />
      <Route path="/analytics"   element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
      <Route path="/settings"    element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/documents"   element={<ProtectedRoute><DocumentsPage /></ProtectedRoute>} />
      <Route path="*"            element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
