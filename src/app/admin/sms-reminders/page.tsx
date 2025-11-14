'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { IconMessageCircle, IconCheck, IconClock, IconMail, IconChecks, IconBulb, IconSparkles } from '@tabler/icons-react'

export default function SMSRemindersPage() {
  const stats = {
    sent: 847,
    delivered: 839,
    failed: 8,
    cost: 5.21,
    noShowReduction: 9,
    savings: 2450,
  }

  const recent = [
    { patient: 'Sarah Mitchell', time: '2 hours ago', status: 'delivered', msg: '24h reminder for Deep Tissue' },
    { patient: 'Michael Chen', time: '3 hours ago', status: 'delivered', msg: '2h reminder for Swedish Massage' },
    { patient: 'Emma Johnson', time: '4 hours ago', status: 'delivered', msg: '24h reminder for Facial' },
    { patient: 'David Rodriguez', time: '5 hours ago', status: 'failed', msg: '24h reminder for Hot Stone' },
    { patient: 'Lisa Anderson', time: '6 hours ago', status: 'delivered', msg: '2h reminder for Couples Massage' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">SMS Reminders</h1>
        <p className="text-muted-foreground">Automated patient notifications and ROI tracking</p>
      </div>

      {/* ROI Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <IconMail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sent}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <IconChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{Math.round((stats.delivered / stats.sent) * 100)}%</div>
            <p className="text-xs text-muted-foreground">Successfully delivered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.cost}</div>
            <p className="text-xs text-muted-foreground">SMS fees</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${stats.savings}/mo</div>
            <p className="text-xs text-muted-foreground">From reduced no-shows</p>
          </CardContent>
        </Card>
      </div>

      {/* ROI Highlight */}
      <Card className="bg-green-50 dark:bg-green-950 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-base text-green-900 dark:text-green-100">No-Show Reduction: {stats.noShowReduction}%</h3>
              <p className="text-sm text-green-700 dark:text-green-300">From 12% → 3% with SMS reminders</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">{Math.round((stats.savings / stats.cost) * 100).toLocaleString()}%</p>
              <p className="text-sm text-green-700 dark:text-green-300">ROI</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconMessageCircle className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest SMS notifications sent to patients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recent.map((msg, i) => (
              <div key={i} className="flex items-start justify-between p-3 bg-muted/30 rounded-md">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{msg.patient}</span>
                    {msg.status === 'delivered' ? (
                      <IconCheck className="h-3 w-3 text-green-600" />
                    ) : (
                      <Badge variant="destructive" className="text-xs">Failed</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{msg.msg}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <IconClock className="h-3 w-3" />
                  {msg.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Last {recent.length} messages sent
        </CardFooter>
      </Card>

      {/* AI Insights Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconBulb className="h-5 w-5" />
            AI SMS Optimization
          </CardTitle>
          <CardDescription>Recommendations to maximize reminder effectiveness</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Badge variant="destructive">high</Badge>
                  <span className="font-semibold">Timing Optimization</span>
                </div>
                <span className="text-sm font-bold text-green-600">+$340/mo</span>
              </div>
              <p className="text-sm text-muted-foreground ml-16">
                Send 24h reminder at 6 PM instead of noon. Data shows 28% better engagement in evenings.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Badge>medium</Badge>
                  <span className="font-semibold">Personalization</span>
                </div>
                <span className="text-sm font-bold text-green-600">+$280/mo</span>
              </div>
              <p className="text-sm text-muted-foreground ml-16">
                Include therapist name and service details in reminder. Increases confirm rate by 15%.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">low</Badge>
                  <span className="font-semibold">Follow-up Campaign</span>
                </div>
                <span className="text-sm font-bold text-green-600">+$180/mo</span>
              </div>
              <p className="text-sm text-muted-foreground ml-16">
                Send "Thank you" SMS after appointment with 10% discount for next booking within 30 days.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            <IconSparkles className="h-4 w-4" />
            Total opportunity: $800/month from SMS optimization
          </div>
          <div className="text-muted-foreground leading-none">
            Current ROI: {Math.round((stats.savings / stats.cost) * 100)}% - one of your best investments
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
