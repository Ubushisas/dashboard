'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IconTrendingUp, IconTrendingDown, IconBulb, IconSparkles } from '@tabler/icons-react'
import { services } from '@/lib/data/spa-data'

export default function ServicesPage() {
  const analyzed = services.map((s) => ({
    ...s,
    monthlyRevenue: s.price * s.popularity,
    netProfit: (s.price - s.productCost) * s.popularity,
    margin: ((s.price - s.productCost) / s.price) * 100,
    score: (s.revenuePerHour / 150) * 50 + (s.popularity / 70) * 50,
  })).sort((a, b) => b.score - a.score)

  const $ = (n: number) => `$${Math.round(n).toLocaleString()}`

  const insights = [
    { title: 'Bundle Opportunity', impact: '+$1,200/mo', priority: 'high', action: 'Create "Relaxation Package" bundling Swedish Massage + Aromatherapy at 10% discount' },
    { title: 'Underutilized Service', impact: '+$890/mo', priority: 'medium', action: 'Hot Stone Massage has low bookings but high margin. Promote more heavily.' },
    { title: 'Price Optimization', impact: '+$650/mo', priority: 'medium', action: 'Deep Tissue demand exceeds capacity. Consider 10% price increase.' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Services</h1>
        <p className="text-muted-foreground">Analyze service profitability and performance</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{$(analyzed.reduce((sum, s) => sum + s.monthlyRevenue, 0))}</div>
            <p className="text-xs text-muted-foreground">From all services</p>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Across {services.length} active services
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{$(analyzed.reduce((sum, s) => sum + s.netProfit, 0))}</div>
            <p className="text-xs text-muted-foreground">After product costs</p>
          </CardContent>
          <CardFooter>
            <div className="flex gap-2 font-medium text-xs leading-none">
              Strong profit margins <IconTrendingUp className="h-3 w-3" />
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Margin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(analyzed.reduce((sum, s) => sum + s.margin, 0) / analyzed.length)}%</div>
            <p className="text-xs text-muted-foreground">Profit margin</p>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Industry avg: 55-65%
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Services Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Services</CardTitle>
          <CardDescription>Complete service performance breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Bookings/mo</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Margin</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analyzed.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="text-right">{$(s.price)}</TableCell>
                  <TableCell className="text-right">{s.popularity}</TableCell>
                  <TableCell className="text-right font-semibold">{$(s.monthlyRevenue)}</TableCell>
                  <TableCell className="text-right">
                    <span className={s.margin > 70 ? 'text-green-600 font-semibold' : s.margin < 50 ? 'text-red-600' : ''}>
                      {Math.round(s.margin)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Progress value={s.score} className="w-16 h-2" />
                      <span className="text-xs text-muted-foreground w-8">{Math.round(s.score)}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Score based on revenue per hour and booking frequency
        </CardFooter>
      </Card>

      {/* Top/Bottom Performers */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconTrendingUp className="h-5 w-5 text-green-600" />
              Top Performers
            </CardTitle>
            <CardDescription>Highest scoring services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyzed.slice(0, 3).map((s) => (
                <div key={s.id} className="flex items-center justify-between">
                  <span className="font-medium">{s.name}</span>
                  <Badge className="bg-green-600">{Math.round(s.score)}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Focus on promoting these services
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconTrendingDown className="h-5 w-5 text-red-600" />
              Needs Attention
            </CardTitle>
            <CardDescription>Underperforming services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyzed.slice(-3).reverse().map((s) => (
                <div key={s.id} className="flex items-center justify-between">
                  <span className="font-medium">{s.name}</span>
                  <Badge variant="destructive">{Math.round(s.score)}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Consider price adjustments or better marketing
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* AI Insights Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconBulb className="h-5 w-5" />
            AI Insights for Services
          </CardTitle>
          <CardDescription>Optimization recommendations for your service menu</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.map((insight, i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Badge variant={insight.priority === 'high' ? 'destructive' : 'default'}>
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
            Total opportunity: $2,740/month from service optimization
          </div>
          <div className="text-muted-foreground leading-none">
            AI-powered recommendations based on booking patterns and profitability
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
