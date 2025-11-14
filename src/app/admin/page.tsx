'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import {
  IconCurrencyDollar,
  IconTrendingUp,
  IconAlertTriangle,
  IconUsers,
  IconBulb,
  IconSparkles,
} from '@tabler/icons-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const metrics = {
    revenue: { total: 42350, monthly: 12450, growth: 18.5, lost: 3200 },
    topServices: [
      { name: 'Swedish Massage', bookings: 62, revenue: 6820 },
      { name: 'Signature Facial', bookings: 52, revenue: 7020 },
      { name: 'Deep Tissue Massage', bookings: 45, revenue: 8100 },
    ],
    patients: { total: 10, active: 9, new: 2 },
    insights: [
      { title: 'Peak Hours Underpriced', impact: '+$580/mo', priority: 'high', action: 'Increase prices 15% on Friday 5-7pm' },
      { title: 'Tuesday Afternoons Empty', impact: '+$450/mo', priority: 'medium', action: 'Offer 15% discount for Tuesday 2-4pm slots' },
      { title: 'No-Show Rate Improving', impact: '$385 saved', priority: 'low', action: 'SMS reminders reduced no-shows from 12% to 3%' },
    ],
  }

  const $ = (n: number) => `$${n.toLocaleString()}`

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Money Left Alert */}
      <Link href="/admin/revenue" className="block mb-2">
        <Alert variant="destructive" className="cursor-pointer hover:shadow-lg transition-all border-destructive/50">
          <IconAlertTriangle className="h-5 w-5" />
          <AlertTitle className="text-lg font-semibold">Money Left on Table</AlertTitle>
          <AlertDescription className="text-base">
            <span className="font-bold text-2xl">{$(metrics.revenue.lost)}</span> per month in missed revenue opportunities.
            <span className="underline ml-2">View details →</span>
          </AlertDescription>
        </Alert>
      </Link>

      {/* Revenue Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <IconCurrencyDollar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{$(metrics.revenue.total)}</div>
            <p className="text-xs text-muted-foreground">All time earnings</p>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              From {metrics.patients.total} total patients
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <IconTrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{$(metrics.revenue.monthly)}</div>
            <p className="text-xs text-muted-foreground">Monthly revenue</p>
          </CardContent>
          <CardFooter>
            <div className="flex gap-2 font-medium text-xs leading-none">
              Trending up by {metrics.revenue.growth}% <IconTrendingUp className="h-3 w-3" />
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <IconSparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+{metrics.revenue.growth}%</div>
            <p className="text-xs text-muted-foreground">Month over month</p>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Strong growth trajectory
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Patient Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconUsers className="h-5 w-5" />
              Patient Overview
            </CardTitle>
            <CardDescription>Active patient base metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{metrics.patients.total}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-green-600">{metrics.patients.active}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">New</p>
                  <p className="text-2xl font-bold text-blue-600">{metrics.patients.new}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/admin/patients" className="text-sm text-primary hover:underline">
              View all patients →
            </Link>
          </CardFooter>
        </Card>

        {/* Top Service */}
        <Card>
          <CardHeader>
            <CardTitle>Top Service This Month</CardTitle>
            <CardDescription>Highest revenue generator</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-2xl font-bold">{metrics.topServices[0].name}</p>
                <p className="text-sm text-muted-foreground">{metrics.topServices[0].bookings} bookings</p>
              </div>
              <div className="text-3xl font-bold text-green-600">{$(metrics.topServices[0].revenue)}</div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/admin/services" className="text-sm text-primary hover:underline">
              View all services →
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* AI Insights Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconBulb className="h-5 w-5" />
            AI Insights & Recommendations
          </CardTitle>
          <CardDescription>Strategic actions to increase revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {metrics.insights.map((insight, i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Badge variant={insight.priority === 'high' ? 'destructive' : insight.priority === 'medium' ? 'default' : 'secondary'}>
                      {insight.priority}
                    </Badge>
                    <span className="font-semibold">{insight.title}</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">{insight.impact}</span>
                </div>
                <p className="text-sm text-muted-foreground ml-16">{insight.action}</p>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            <IconSparkles className="h-4 w-4" />
            Total opportunity: {$(metrics.revenue.lost)}/month
          </div>
          <Link href="/admin/insights" className="text-muted-foreground hover:text-primary">
            View all insights and detailed analysis →
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
