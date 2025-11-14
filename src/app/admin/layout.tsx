'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
// Authentication removed for standalone dashboard
import {
  IconLayoutDashboard,
  IconUsers,
  IconCalendar,
  IconBriefcase,
  IconRobot,
  IconSettings,
  IconSparkles,
  IconCalendarEvent,
  IconMessageCircle,
  IconLogout,
  IconCurrencyDollar,
  IconGift,
  IconPercentage,
} from '@tabler/icons-react'

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navItems = [
    { href: '/admin', icon: IconLayoutDashboard, label: 'Overview' },
    { href: '/admin/revenue', icon: IconCurrencyDollar, label: 'Revenue Analytics' },
    { href: '/admin/services', icon: IconBriefcase, label: 'Services' },
    { href: '/admin/patients', icon: IconUsers, label: 'Patients' },
    { href: '/admin/staff', icon: IconUsers, label: 'Staff' },
    { href: '/admin/promotions', icon: IconPercentage, label: 'Promotions' },
    { href: '/admin/gift-cards', icon: IconGift, label: 'Gift Cards' },
    { href: '/admin/insights', icon: IconRobot, label: 'AI Insights' },
    { href: '/admin/sms-reminders', icon: IconMessageCircle, label: 'SMS Reminders' },
    { href: '/admin/settings', icon: IconSettings, label: 'Settings' },
  ]

  const getColorClasses = (isActive: boolean) => {
    if (!isActive) {
      return 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
    }
    return 'bg-primary text-primary-foreground border-l-4 border-foreground'
  }

  return (
    <div className="min-h-screen bg-background">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-64 bg-card border-r border-border flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-border">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <IconSparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Wellness
                </h1>
                <p className="text-xs text-muted-foreground">Spa Analytics</p>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <AnimatePresence>
              {navItems.map((item, index) => {
                const Icon = item.icon
                const isActive = item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href)

                return (
                  <motion.div
                    key={item.href}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${getColorClasses(isActive)}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </nav>

          {/* Footer - User Profile */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                DEV
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm truncate">
                  Development Mode
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  dev@wellness-dashboard.local
                </p>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-muted/30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="min-h-full p-6 md:p-8"
          >
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </motion.div>
        </main>
        </div>
      </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayoutContent>{children}</AdminLayoutContent>
}
