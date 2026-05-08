import { Minus, Square, X, Maximize2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth } from '@/store/auth'

export function TitleBar() {
  const [isMaximized, setIsMaximized] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const checkMaximized = async () => {
      const max = await window.meipay?.window.isMaximized()
      setIsMaximized(!!max)
    }
    checkMaximized()
    const interval = setInterval(checkMaximized, 500)
    return () => clearInterval(interval)
  }, [])

  const handleMinimize = () => window.meipay?.window.minimize()
  const handleMaximize = async () => {
    await window.meipay?.window.maximize()
    setIsMaximized(!isMaximized)
  }
  const handleClose = () => window.meipay?.window.close()

  return (
    <div
      className="flex items-center h-10 bg-meipay-navy select-none shrink-0 z-50"
      style={{ WebkitAppRegion: 'drag' } as any}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 h-full">
        <div className="w-5 h-5 bg-meipay-accent rounded flex items-center justify-center">
          <span className="text-white font-bold text-[9px] leading-none">MP</span>
        </div>
        <span className="text-white text-sm font-semibold tracking-tight">MeiPay</span>
        {user && (
          <span className="text-white/30 text-xs ml-2">
            {user.name}
          </span>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Window controls */}
      <div
        className="flex items-center h-full"
        style={{ WebkitAppRegion: 'no-drag' } as any}
      >
        <button
          onClick={handleMinimize}
          className="flex items-center justify-center w-12 h-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Minimize"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleMaximize}
          className="flex items-center justify-center w-12 h-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          aria-label={isMaximized ? 'Restore' : 'Maximize'}
        >
          {isMaximized ? (
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
              <rect x="3" y="1" width="8" height="8" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
              <rect x="1" y="3" width="8" height="8" rx="0.5" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          ) : (
            <Square className="w-3 h-3" />
          )}
        </button>
        <button
          onClick={handleClose}
          className="flex items-center justify-center w-12 h-full text-white/50 hover:text-white hover:bg-red-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
