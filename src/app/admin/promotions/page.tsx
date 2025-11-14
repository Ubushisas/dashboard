'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IconSparkles, IconTrendingUp, IconPackage, IconClock, IconPlus, IconPercentage, IconCalendar } from '@tabler/icons-react'

interface Package {
  id: string
  name: string
  services: string[]
  price: number
  discount: number
  active: boolean
}

interface HappyHour {
  id: string
  name: string
  day: string
  timeStart: string
  timeEnd: string
  discount: number
  active: boolean
}

interface DynamicPrice {
  id: string
  service: string
  day: string
  timeStart: string
  timeEnd: string
  priceIncrease: number
  active: boolean
}

export default function PromotionsPage() {
  const [packages, setPackages] = useState<Package[]>([
    {
      id: '1',
      name: 'Relaxation Package',
      services: ['Swedish Massage', 'Aromatherapy'],
      price: 198,
      discount: 10,
      active: true,
    },
    {
      id: '2',
      name: 'Renewal Package',
      services: ['Signature Facial', 'Hot Stone Therapy'],
      price: 246,
      discount: 12,
      active: true,
    },
  ])

  const [happyHours, setHappyHours] = useState<HappyHour[]>([
    {
      id: '1',
      name: 'Tuesday Afternoon Special',
      day: 'Tuesday',
      timeStart: '14:00',
      timeEnd: '16:00',
      discount: 15,
      active: true,
    },
  ])

  const [dynamicPrices, setDynamicPrices] = useState<DynamicPrice[]>([
    {
      id: '1',
      service: 'Deep Tissue Massage',
      day: 'Friday',
      timeStart: '17:00',
      timeEnd: '19:00',
      priceIncrease: 15,
      active: true,
    },
    {
      id: '2',
      service: 'Signature Facial',
      day: 'Saturday',
      timeStart: '10:00',
      timeEnd: '14:00',
      priceIncrease: 12,
      active: true,
    },
  ])

  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false)
  const [isHappyHourDialogOpen, setIsHappyHourDialogOpen] = useState(false)
  const [isDynamicPriceDialogOpen, setIsDynamicPriceDialogOpen] = useState(false)

  const $ = (amount: number) => `$${amount}`

  const stats = {
    packagesRevenue: packages.filter(p => p.active).length * 1100,
    happyHoursRevenue: happyHours.filter(h => h.active).length * 1820,
    dynamicPricingRevenue: dynamicPrices.filter(d => d.active).length * 2340,
    total: packages.filter(p => p.active).length * 1100 + happyHours.filter(h => h.active).length * 1820 + dynamicPrices.filter(d => d.active).length * 2340,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Promotions & Pricing</h1>
        <p className="text-muted-foreground">Manage packages, happy hours, and dynamic pricing</p>
      </div>

      {/* Revenue Impact */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Revenue Impact</p>
              <p className="text-4xl font-bold text-primary">{$(stats.total)}/mo</p>
            </div>
            <div className="flex gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Packages</p>
                <p className="text-lg font-semibold text-green-600">+{$(stats.packagesRevenue)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Happy Hours</p>
                <p className="text-lg font-semibold text-blue-600">+{$(stats.happyHoursRevenue)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Peak Pricing</p>
                <p className="text-lg font-semibold text-purple-600">+{$(stats.dynamicPricingRevenue)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="packages" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="packages">Service Packages</TabsTrigger>
          <TabsTrigger value="happyhours">Happy Hours</TabsTrigger>
          <TabsTrigger value="dynamic">Peak Pricing</TabsTrigger>
        </TabsList>

        {/* PACKAGES TAB */}
        <TabsContent value="packages" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Service Packages</h3>
              <p className="text-sm text-muted-foreground">Bundle services to increase booking value</p>
            </div>
            <Dialog open={isPackageDialogOpen} onOpenChange={setIsPackageDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <IconPlus className="h-4 w-4" />
                  Create Package
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Service Package</DialogTitle>
                  <DialogDescription>Bundle multiple services at a discounted price</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Package Name</Label>
                    <Input placeholder="e.g., Ultimate Relaxation" />
                  </div>
                  <div className="space-y-2">
                    <Label>Select Services</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose services to include" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="swedish">Swedish Massage</SelectItem>
                        <SelectItem value="deep">Deep Tissue Massage</SelectItem>
                        <SelectItem value="facial">Signature Facial</SelectItem>
                        <SelectItem value="hot">Hot Stone Therapy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Package Price</Label>
                      <Input type="number" placeholder="198" />
                    </div>
                    <div className="space-y-2">
                      <Label>Discount %</Label>
                      <Input type="number" placeholder="10" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsPackageDialogOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsPackageDialogOpen(false)}>Create Package</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {packages.map((pkg) => (
              <Card key={pkg.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        <IconPackage className="h-4 w-4" />
                        {pkg.name}
                      </CardTitle>
                      <CardDescription className="mt-1">{pkg.services.join(' + ')}</CardDescription>
                    </div>
                    <Badge variant={pkg.active ? 'default' : 'secondary'}>
                      {pkg.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">{$(pkg.price)}</p>
                      <p className="text-xs text-muted-foreground">{pkg.discount}% discount applied</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  <IconSparkles className="h-3 w-3 mr-1" />
                  Increases average booking value by 18%
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* HAPPY HOURS TAB */}
        <TabsContent value="happyhours" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Happy Hour Promotions</h3>
              <p className="text-sm text-muted-foreground">Fill slow periods with strategic discounts</p>
            </div>
            <Dialog open={isHappyHourDialogOpen} onOpenChange={setIsHappyHourDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <IconPlus className="h-4 w-4" />
                  Create Happy Hour
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Happy Hour</DialogTitle>
                  <DialogDescription>Offer time-based discounts to fill empty slots</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Promotion Name</Label>
                    <Input placeholder="e.g., Weekend Morning Special" />
                  </div>
                  <div className="space-y-2">
                    <Label>Day of Week</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="tuesday">Tuesday</SelectItem>
                        <SelectItem value="wednesday">Wednesday</SelectItem>
                        <SelectItem value="thursday">Thursday</SelectItem>
                        <SelectItem value="friday">Friday</SelectItem>
                        <SelectItem value="saturday">Saturday</SelectItem>
                        <SelectItem value="sunday">Sunday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Time</Label>
                      <Input type="time" />
                    </div>
                    <div className="space-y-2">
                      <Label>End Time</Label>
                      <Input type="time" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Discount %</Label>
                    <Input type="number" placeholder="15" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsHappyHourDialogOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsHappyHourDialogOpen(false)}>Create Promotion</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {happyHours.map((hh) => (
              <Card key={hh.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base flex items-center gap-2">
                        <IconClock className="h-4 w-4" />
                        {hh.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {hh.day}s from {hh.timeStart} to {hh.timeEnd}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-orange-600">{hh.discount}% OFF</Badge>
                      <Badge variant={hh.active ? 'default' : 'secondary'}>
                        {hh.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <p>Current utilization: <span className="font-semibold text-foreground">32%</span></p>
                      <p>Target: <span className="font-semibold text-foreground">65%</span></p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  <IconTrendingUp className="h-3 w-3 mr-1" />
                  Projected +$1,820/mo from filling 50% of empty slots
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* DYNAMIC PRICING TAB */}
        <TabsContent value="dynamic" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Peak Pricing</h3>
              <p className="text-sm text-muted-foreground">Increase prices during high-demand periods</p>
            </div>
            <Dialog open={isDynamicPriceDialogOpen} onOpenChange={setIsDynamicPriceDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <IconPlus className="h-4 w-4" />
                  Add Peak Pricing
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Peak Pricing Rule</DialogTitle>
                  <DialogDescription>Increase prices during high-demand time slots</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Service</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="swedish">Swedish Massage</SelectItem>
                        <SelectItem value="deep">Deep Tissue Massage</SelectItem>
                        <SelectItem value="facial">Signature Facial</SelectItem>
                        <SelectItem value="hot">Hot Stone Therapy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Day of Week</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="tuesday">Tuesday</SelectItem>
                        <SelectItem value="wednesday">Wednesday</SelectItem>
                        <SelectItem value="thursday">Thursday</SelectItem>
                        <SelectItem value="friday">Friday</SelectItem>
                        <SelectItem value="saturday">Saturday</SelectItem>
                        <SelectItem value="sunday">Sunday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Time</Label>
                      <Input type="time" />
                    </div>
                    <div className="space-y-2">
                      <Label>End Time</Label>
                      <Input type="time" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Price Increase %</Label>
                    <Input type="number" placeholder="15" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDynamicPriceDialogOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsDynamicPriceDialogOpen(false)}>Create Rule</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {dynamicPrices.map((dp) => (
              <Card key={dp.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base flex items-center gap-2">
                        <IconPercentage className="h-4 w-4" />
                        {dp.service}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {dp.day}s from {dp.timeStart} to {dp.timeEnd}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-600">+{dp.priceIncrease}%</Badge>
                      <Badge variant={dp.active ? 'default' : 'secondary'}>
                        {dp.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <p>Current demand: <span className="font-semibold text-foreground">92% capacity</span></p>
                      <p>Booking drop risk: <span className="font-semibold text-green-600">Low (4%)</span></p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  <IconSparkles className="h-3 w-3 mr-1" />
                  High demand periods can support price increases without losing bookings
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <IconSparkles className="h-5 w-5 text-primary" />
            Optimization Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <IconCalendar className="h-4 w-4 text-muted-foreground mt-0.5" />
            <p><span className="font-medium">Test gradually:</span> Start with 10-15% changes and monitor booking rates for 2 weeks</p>
          </div>
          <div className="flex items-start gap-2">
            <IconTrendingUp className="h-4 w-4 text-muted-foreground mt-0.5" />
            <p><span className="font-medium">Stack strategically:</span> Don't combine happy hours with peak pricing on same time slot</p>
          </div>
          <div className="flex items-start gap-2">
            <IconPackage className="h-4 w-4 text-muted-foreground mt-0.5" />
            <p><span className="font-medium">Promote packages:</span> Feature packages prominently on booking page for 3x adoption</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
