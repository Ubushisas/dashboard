'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IconSearch, IconUser, IconUsers, IconBulb, IconSparkles } from '@tabler/icons-react'
import { patients } from '@/lib/data/spa-data'

export default function PatientsPage() {
  const [search, setSearch] = useState('')

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase())
  )

  const $ = (n: number) => `$${n.toLocaleString()}`

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
        <p className="text-muted-foreground">Patient database and analytics</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <IconUsers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.length}</div>
            <p className="text-xs text-muted-foreground">In database</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
            <IconUser className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{patients.filter(p => p.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">Regular visitors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{$(patients.reduce((sum, p) => sum + p.totalSpent, 0))}</div>
            <p className="text-xs text-muted-foreground">All time from patients</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-transparent border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Patients</CardTitle>
          <CardDescription>Complete patient directory with contact and spending history</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Visits</TableHead>
                <TableHead className="text-right">Spent</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium text-sm">
                    <div className="flex items-center gap-2">
                      <IconUser className="h-4 w-4 text-muted-foreground" />
                      {patient.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    <div className="text-xs text-muted-foreground">
                      <div>{patient.email}</div>
                      <div>{patient.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-sm">{patient.totalVisits}</TableCell>
                  <TableCell className="text-right text-sm font-semibold">{$(patient.totalSpent)}</TableCell>
                  <TableCell>
                    <Badge variant={patient.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                      {patient.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          {filtered.length} patient{filtered.length !== 1 ? 's' : ''} found
        </CardFooter>
      </Card>

      {/* AI Insights Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconBulb className="h-5 w-5" />
            AI Patient Insights
          </CardTitle>
          <CardDescription>Strategic recommendations for patient engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Badge variant="destructive">high</Badge>
                  <span className="font-semibold">Inactive Patient Reactivation</span>
                </div>
                <span className="text-sm font-bold text-green-600">+$1,450/mo</span>
              </div>
              <p className="text-sm text-muted-foreground ml-16">
                {patients.filter(p => p.status === 'inactive').length} inactive patients haven't visited in 60+ days. Send personalized "We miss you" offers with 20% discount.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Badge>medium</Badge>
                  <span className="font-semibold">VIP Program Launch</span>
                </div>
                <span className="text-sm font-bold text-green-600">+$890/mo</span>
              </div>
              <p className="text-sm text-muted-foreground ml-16">
                Top {Math.round(patients.filter(p => p.totalSpent > 500).length)} high-value patients (${patients.filter(p => p.totalSpent > 500).reduce((sum, p) => sum + p.totalSpent, 0).toLocaleString()}+ spent). Create VIP tier with perks.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Badge>medium</Badge>
                  <span className="font-semibold">Birthday Campaign</span>
                </div>
                <span className="text-sm font-bold text-green-600">+$520/mo</span>
              </div>
              <p className="text-sm text-muted-foreground ml-16">
                Auto-send birthday discounts. Estimated {Math.round(patients.length / 12)} birthdays per month with 40% redemption rate.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            <IconSparkles className="h-4 w-4" />
            Total opportunity: $2,860/month from patient retention
          </div>
          <div className="text-muted-foreground leading-none">
            Focused on maximizing lifetime value and reducing churn
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
