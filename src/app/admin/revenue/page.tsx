'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { IconAlertTriangle, IconClock, IconBulb, IconSparkles } from '@tabler/icons-react'

export default function RevenuePage() {
  const opportunities = [
    { title: 'Peak Hour Pricing', time: 'Fri 5-7pm', impact: '+$580/mo', action: 'Increase prices 15%' },
    { title: 'Fill Tuesday Gaps', time: 'Tue 2-4pm', impact: '+$450/mo', action: 'Offer 15% discount' },
    { title: 'Weekend Mornings', time: 'Sat-Sun 9-11am', impact: '+$320/mo', action: 'Promote early slots' },
    { title: 'Thursday Evenings', time: 'Thu 6-8pm', impact: '+$280/mo', action: 'Add therapist hours' },
  ]

  const hours = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm']

  const heatmap = [
    ['Mon', 45, 60, 75, 80, 85, 90, 75, 60, 40, 30],
    ['Tue', 50, 55, 40, 35, 70, 80, 85, 70, 50, 35],
    ['Wed', 55, 65, 70, 75, 85, 95, 90, 80, 60, 45],
    ['Thu', 60, 70, 80, 85, 90, 95, 85, 75, 55, 40],
    ['Fri', 70, 80, 90, 95, 100, 100, 95, 90, 70, 50],
    ['Sat', 75, 85, 90, 90, 85, 80, 70, 60, 45, 30],
    ['Sun', 60, 70, 75, 70, 65, 60, 50, 40, 30, 20],
  ]

  const total = opportunities.reduce((sum, o) => sum + parseInt(o.impact.replace(/[^0-9]/g, '')), 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Revenue Analytics</h1>
        <p className="text-muted-foreground">Identify and capture revenue opportunities</p>
      </div>

      <Alert variant="destructive" className="border-red-500/50">
        <IconAlertTriangle className="h-5 w-5" />
        <AlertTitle className="text-lg font-semibold">Money Left on Table</AlertTitle>
        <AlertDescription className="text-base">
          <span className="font-bold text-2xl">${total}</span> per month in potential revenue
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2">
        {opportunities.map((opp, i) => (
          <Card key={i}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-base">{opp.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <IconClock className="h-3 w-3" />
                    {opp.time}
                  </CardDescription>
                </div>
                <Badge className="bg-green-600">{opp.impact}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{opp.action}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking Heatmap</CardTitle>
          <CardDescription>Weekly demand patterns by time slot</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Hour labels */}
            <div className="flex items-center gap-2">
              <span className="text-xs w-8"></span>
              <div className="flex gap-1 flex-1">
                {hours.map((hour, i) => (
                  <div key={i} className="flex-1 text-center">
                    <span className="text-[10px] text-muted-foreground">{hour}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Heatmap rows */}
            {heatmap.map(([day, ...hoursData], i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs w-8 text-muted-foreground">{day}</span>
                <div className="flex gap-1 flex-1">
                  {(hoursData as number[]).map((fill, j) => (
                    <div
                      key={j}
                      className="flex-1 h-6 rounded-sm"
                      style={{
                        backgroundColor: fill > 85 ? '#f87171' : fill > 70 ? '#4ade80' : fill > 50 ? '#fbbf24' : '#e5e7eb'
                      }}
                      title={`${hours[j]}: ${fill}% full`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm bg-gray-200" />
              <span>Empty</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm bg-amber-400" />
              <span>Moderate</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm bg-green-400" />
              <span>Good</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm bg-red-400" />
              <span>Full</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Red indicates high-demand periods perfect for premium pricing
        </CardFooter>
      </Card>

      {/* AI Insights Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconBulb className="h-5 w-5" />
            AI Revenue Optimization
          </CardTitle>
          <CardDescription>Data-driven strategies to maximize income</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {opportunities.map((opp, i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Badge variant="destructive">urgent</Badge>
                    <span className="font-semibold">{opp.title}</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">{opp.impact}</span>
                </div>
                <div className="ml-16 space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <IconClock className="h-3 w-3" />
                    {opp.time}
                  </p>
                  <p className="text-sm font-medium">{opp.action}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            <IconSparkles className="h-4 w-4" />
            Implementing these 4 actions could add ${total}/month
          </div>
          <div className="text-muted-foreground leading-none">
            Based on historical booking patterns and market analysis
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
