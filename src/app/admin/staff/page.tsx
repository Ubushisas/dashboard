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
import { IconTrophy, IconUsers, IconBulb, IconSparkles } from '@tabler/icons-react'
import { therapists } from '@/lib/data/spa-data'

export default function StaffPage() {
  const sorted = [...therapists].sort((a, b) => b.performance - a.performance)
  const $ = (n: number) => `$${n.toLocaleString()}`

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Staff</h1>
        <p className="text-muted-foreground">Team performance and productivity metrics</p>
      </div>

      {/* Top Performers */}
      <div className="grid gap-4 md:grid-cols-3">
        {sorted.slice(0, 3).map((therapist, i) => (
          <Card key={therapist.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconTrophy className={`h-5 w-5 ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : 'text-amber-600'}`} />
                  <CardTitle className="text-sm">#{i + 1} Performer</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-1">{therapist.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{therapist.specialty.join(', ')}</p>
              <div className="flex items-center gap-2">
                <Progress value={therapist.performance} className="flex-1 h-2" />
                <span className="text-xs font-semibold">{therapist.performance}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconUsers className="h-5 w-5" />
            All Team Members
          </CardTitle>
          <CardDescription>Complete staff performance breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Specialties</TableHead>
                <TableHead className="text-right">Bookings</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((therapist) => (
                <TableRow key={therapist.id}>
                  <TableCell className="font-medium text-sm">{therapist.name}</TableCell>
                  <TableCell className="text-sm">
                    <div className="flex gap-1">
                      {therapist.specialty.slice(0, 2).map((s, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{s}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-sm">{therapist.bookingsThisMonth}</TableCell>
                  <TableCell className="text-right text-sm font-semibold">{$(therapist.revenueThisMonth)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Progress value={therapist.performance} className="w-16 h-1.5" />
                      <span className="text-xs font-semibold w-8">{therapist.performance}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Performance score based on bookings, revenue, and client satisfaction
        </CardFooter>
      </Card>

      {/* AI Insights Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconBulb className="h-5 w-5" />
            AI Staff Insights
          </CardTitle>
          <CardDescription>Optimization recommendations for team performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Badge variant="destructive">high</Badge>
                  <span className="font-semibold">Cross-Training Opportunity</span>
                </div>
                <span className="text-sm font-bold text-green-600">+$980/mo</span>
              </div>
              <p className="text-sm text-muted-foreground ml-16">
                Train {sorted.slice(-2).map(t => t.name).join(' and ')} in Deep Tissue to handle overflow demand during peak hours.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Badge>medium</Badge>
                  <span className="font-semibold">Schedule Optimization</span>
                </div>
                <span className="text-sm font-bold text-green-600">+$740/mo</span>
              </div>
              <p className="text-sm text-muted-foreground ml-16">
                {sorted[0].name} (top performer) is underutilized. Add 4 more hours during Friday evening peak.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Badge>medium</Badge>
                  <span className="font-semibold">Performance Incentives</span>
                </div>
                <span className="text-sm font-bold text-green-600">+$620/mo</span>
              </div>
              <p className="text-sm text-muted-foreground ml-16">
                Implement commission tiers for bookings over 50/month to motivate lower performers.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            <IconSparkles className="h-4 w-4" />
            Total opportunity: $2,340/month from staff optimization
          </div>
          <div className="text-muted-foreground leading-none">
            Based on capacity analysis and performance metrics
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
