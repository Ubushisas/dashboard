'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { IconBulb, IconClock, IconTool, IconSparkles, IconChevronRight } from '@tabler/icons-react'

interface Insight {
  title: string
  impact: string
  priority: string
  difficulty: string
  time: string
  description: string
  steps: string[]
  expectedResult: string
}

export default function InsightsPage() {
  const insights: Insight[] = [
    {
      title: 'Peak Performance Optimizer',
      impact: '+$2,340/mo',
      priority: 'high',
      difficulty: 'easy',
      time: 'Now',
      description: 'Increase pricing during high-demand peak hours (Friday 5-7pm) to maximize revenue without losing bookings.',
      steps: [
        'Navigate to Settings > Services',
        'Enable "Dynamic Pricing" for high-demand services',
        'Set Friday 5-7pm as "Peak Hours" with 15% price increase',
        'Monitor booking rate for 2 weeks',
        'If bookings stay above 85%, increase another 5%'
      ],
      expectedResult: 'Based on current Friday demand (92% capacity), 15% price increase will add $2,340/mo with minimal booking drop.'
    },
    {
      title: 'Fill the Gaps Strategy',
      impact: '+$1,820/mo',
      priority: 'high',
      difficulty: 'easy',
      time: 'Now',
      description: 'Offer strategic discounts during low-traffic periods (Tuesday 2-4pm) to fill empty slots and boost revenue.',
      steps: [
        'Go to Revenue Analytics > Time Heatmap',
        'Identify lowest-traffic time slots',
        'Create "Happy Hour" promotion: 15% off Tuesday 2-4pm',
        'Promote via SMS to past clients who typically book Tuesdays',
        'Track conversion rate weekly'
      ],
      expectedResult: 'Current Tuesday afternoon utilization is 32%. Filling 50% of empty slots at discounted rate adds $1,820/mo.'
    },
    {
      title: 'No-Show Prevention',
      impact: '+$4,680/mo',
      priority: 'high',
      difficulty: 'medium',
      time: '1 week',
      description: 'Implement stricter no-show policies with credit card holds to reduce the current 3% no-show rate.',
      steps: [
        'Enable Stripe payment integration in Settings',
        'Set up automatic $25 credit card authorization for all bookings',
        'Send clear policy notification via SMS 24h before appointment',
        'Auto-charge no-shows unless 6h advance cancellation',
        'Track no-show rate weekly and adjust policy as needed'
      ],
      expectedResult: 'Current 3% no-show rate costs $4,680/mo in lost revenue. Credit card holds typically reduce no-shows by 60-80%.'
    },
    {
      title: 'Capacity Utilization',
      impact: '+$6,420/mo',
      priority: 'high',
      difficulty: 'medium',
      time: '2 weeks',
      description: 'Optimize staff scheduling by adding top performers during peak hours and reducing coverage during slow periods.',
      steps: [
        'Review Staff page performance metrics',
        'Add 4 hours for top performer (Sarah Martinez) on Friday evenings',
        'Reduce low-traffic Monday morning shifts by 3 hours',
        'Cross-train 2 staff members in high-demand Deep Tissue massage',
        'Monitor revenue impact weekly'
      ],
      expectedResult: 'Current capacity utilization is 68%. Optimizing schedule to 82% adds $6,420/mo with same labor costs.'
    },
    {
      title: 'Seasonal Trend Analyzer',
      impact: '+$3,150/mo',
      priority: 'medium',
      difficulty: 'medium',
      time: '1 month',
      description: 'Prepare inventory and promotions based on seasonal booking patterns (summer facials, winter hot stone).',
      steps: [
        'Analyze last 12 months booking data by season',
        'Pre-order seasonal products (summer: cooling gels, winter: heating oils)',
        'Create seasonal packages 30 days before high season',
        'Send targeted email campaigns to past seasonal clients',
        'Adjust staffing 2 weeks before expected demand surge'
      ],
      expectedResult: 'Historical data shows 40% increase in facials during summer. Proactive preparation captures additional revenue.'
    },
    {
      title: 'Service Bundle Creator',
      impact: '+$1,100/mo',
      priority: 'medium',
      difficulty: 'easy',
      time: '1 week',
      description: 'Create attractive service packages that increase average booking value and encourage clients to try multiple services.',
      steps: [
        'Go to Services page',
        'Create "Relaxation Package": Swedish Massage + Aromatherapy at 10% discount',
        'Create "Renewal Package": Facial + Hot Stone at 12% discount',
        'Add prominent "Packages" section on booking page',
        'Train staff to suggest packages during checkout'
      ],
      expectedResult: 'Bundles typically increase booking value by 18% and encourage repeat visits. Projected $1,100/mo uplift.'
    },
    {
      title: 'Price Elasticity Testing',
      impact: '+$1,575/mo',
      priority: 'medium',
      difficulty: 'hard',
      time: '1 month',
      description: 'Test price sensitivity for high-demand services to find optimal pricing that maximizes revenue without losing clients.',
      steps: [
        'Identify services at >85% capacity (Deep Tissue, Signature Facial)',
        'Implement A/B test: 50% of bookings see 10% price increase',
        'Track booking conversion rate over 30 days',
        'Analyze data: if conversion drops <5%, increase is viable',
        'Roll out winning price to all bookings',
        'Repeat test quarterly for other services'
      ],
      expectedResult: 'Deep Tissue demand exceeds capacity. Testing shows 10% increase maintains 96% conversion, adding $1,575/mo.'
    },
    {
      title: 'Customer Behavior Patterns',
      impact: '+$890/mo',
      priority: 'low',
      difficulty: 'easy',
      time: 'Now',
      description: 'Send targeted "We miss you" campaigns to inactive clients and birthday promotions to drive repeat bookings.',
      steps: [
        'Go to Patients page and filter by "Last visit >60 days"',
        'Create personalized SMS: "We miss you [Name]! 20% off your next visit"',
        'Set up automatic birthday SMS with 15% discount code',
        'Track campaign redemption rate',
        'Adjust discount and timing based on results'
      ],
      expectedResult: 'Currently 23 inactive clients. Reactivating 30% at reduced margin adds $890/mo revenue.'
    },
  ]

  const highPriority = insights.filter(i => i.priority === 'high')
  const mediumPriority = insights.filter(i => i.priority === 'medium')
  const lowPriority = insights.filter(i => i.priority === 'low')

  const total = insights.reduce((sum, i) => sum + parseInt(i.impact.replace(/[^0-9]/g, '')), 0)

  const renderInsightCard = (insight: Insight, i: number) => (
    <Card key={i}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base flex items-center gap-2">
              <IconBulb className="h-4 w-4 text-primary" />
              {insight.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1">
                <IconClock className="h-3 w-3" />
                {insight.time}
              </span>
              <span className="flex items-center gap-1">
                <IconTool className="h-3 w-3" />
                {insight.difficulty}
              </span>
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-600 text-xs">{insight.impact}</Badge>
            <Badge
              variant={insight.priority === 'high' ? 'destructive' : 'default'}
              className="text-xs"
            >
              {insight.priority}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="implementation" className="border-none">
            <AccordionTrigger className="text-sm text-muted-foreground hover:text-foreground py-2">
              View implementation details
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div>
                  <h4 className="font-semibold text-sm mb-2">What to do:</h4>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Step-by-step:</h4>
                  <ol className="space-y-2">
                    {insight.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-semibold flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="flex-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="bg-muted/50 rounded-lg p-3">
                  <h4 className="font-semibold text-sm mb-1 flex items-center gap-1">
                    <IconSparkles className="h-4 w-4 text-green-600" />
                    Expected Result
                  </h4>
                  <p className="text-sm text-muted-foreground">{insight.expectedResult}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
          <p className="text-muted-foreground">Strategic recommendations to grow revenue</p>
        </div>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1">
              <IconSparkles className="h-3 w-3" />
              Total Opportunity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">${total.toLocaleString()}/mo</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All ({insights.length})</TabsTrigger>
          <TabsTrigger value="high">High ({highPriority.length})</TabsTrigger>
          <TabsTrigger value="medium">Medium ({mediumPriority.length})</TabsTrigger>
          <TabsTrigger value="low">Low ({lowPriority.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3 mt-4">
          {insights.map(renderInsightCard)}
        </TabsContent>

        <TabsContent value="high" className="space-y-3 mt-4">
          {highPriority.map(renderInsightCard)}
        </TabsContent>

        <TabsContent value="medium" className="space-y-3 mt-4">
          {mediumPriority.map(renderInsightCard)}
        </TabsContent>

        <TabsContent value="low" className="space-y-3 mt-4">
          {lowPriority.map(renderInsightCard)}
        </TabsContent>
      </Tabs>
    </div>
  )
}
