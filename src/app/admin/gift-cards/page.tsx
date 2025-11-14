'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
import { IconGift, IconPlus, IconCreditCard, IconMail, IconCopy, IconCheck, IconSparkles } from '@tabler/icons-react'

interface GiftCard {
  id: string
  code: string
  amount: number
  balance: number
  recipientName: string
  recipientEmail: string
  purchasedBy: string
  purchaseDate: string
  expiryDate: string
  status: 'active' | 'redeemed' | 'expired'
}

export default function GiftCardsPage() {
  const [giftCards, setGiftCards] = useState<GiftCard[]>([
    {
      id: '1',
      code: 'GIFT-2024-ABCD',
      amount: 150,
      balance: 150,
      recipientName: 'Sarah Mitchell',
      recipientEmail: 'sarah.m@email.com',
      purchasedBy: 'John Mitchell',
      purchaseDate: '2024-01-15',
      expiryDate: '2025-01-15',
      status: 'active',
    },
    {
      id: '2',
      code: 'GIFT-2024-EFGH',
      amount: 100,
      balance: 25,
      recipientName: 'Emma Johnson',
      recipientEmail: 'emma.j@email.com',
      purchasedBy: 'Michael Chen',
      purchaseDate: '2024-02-01',
      expiryDate: '2025-02-01',
      status: 'active',
    },
    {
      id: '3',
      code: 'GIFT-2024-IJKL',
      amount: 200,
      balance: 0,
      recipientName: 'Lisa Anderson',
      recipientEmail: 'lisa.a@email.com',
      purchasedBy: 'David Rodriguez',
      purchaseDate: '2023-12-20',
      expiryDate: '2024-12-20',
      status: 'redeemed',
    },
    {
      id: '4',
      code: 'GIFT-2023-MNOP',
      amount: 50,
      balance: 50,
      recipientName: 'Maria Garcia',
      recipientEmail: 'maria.g@email.com',
      purchasedBy: 'Carlos Martinez',
      purchaseDate: '2023-11-10',
      expiryDate: '2024-11-10',
      status: 'expired',
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [newCard, setNewCard] = useState({
    amount: '',
    recipientName: '',
    recipientEmail: '',
    purchasedBy: '',
  })

  const stats = {
    totalSold: giftCards.reduce((sum, card) => sum + card.amount, 0),
    activeBalance: giftCards.filter(c => c.status === 'active').reduce((sum, card) => sum + card.balance, 0),
    redeemed: giftCards.filter(c => c.status === 'redeemed').length,
    active: giftCards.filter(c => c.status === 'active').length,
  }

  const $ = (amount: number) => `$${amount.toLocaleString()}`

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleCreateCard = () => {
    const code = `GIFT-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    const amount = parseInt(newCard.amount)

    const card: GiftCard = {
      id: String(giftCards.length + 1),
      code,
      amount,
      balance: amount,
      recipientName: newCard.recipientName,
      recipientEmail: newCard.recipientEmail,
      purchasedBy: newCard.purchasedBy,
      purchaseDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active',
    }

    setGiftCards([card, ...giftCards])
    setIsDialogOpen(false)
    setNewCard({ amount: '', recipientName: '', recipientEmail: '', purchasedBy: '' })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-600">Active</Badge>
      case 'redeemed':
        return <Badge variant="secondary">Redeemed</Badge>
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gift Cards</h1>
          <p className="text-muted-foreground">Create and manage digital gift cards with Stripe</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <IconPlus className="h-4 w-4" />
              Create Gift Card
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Gift Card</DialogTitle>
              <DialogDescription>
                Generate a digital gift card. Payment will be processed via Stripe.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Gift Card Amount</Label>
                <Select value={newCard.amount} onValueChange={(value) => setNewCard({ ...newCard, amount: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select amount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50">$50</SelectItem>
                    <SelectItem value="100">$100</SelectItem>
                    <SelectItem value="150">$150</SelectItem>
                    <SelectItem value="200">$200</SelectItem>
                    <SelectItem value="300">$300</SelectItem>
                    <SelectItem value="500">$500</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchasedBy">Purchased By</Label>
                <Input
                  id="purchasedBy"
                  placeholder="Enter buyer name"
                  value={newCard.purchasedBy}
                  onChange={(e) => setNewCard({ ...newCard, purchasedBy: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient Name</Label>
                <Input
                  id="recipientName"
                  placeholder="Enter recipient name"
                  value={newCard.recipientName}
                  onChange={(e) => setNewCard({ ...newCard, recipientName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipientEmail">Recipient Email</Label>
                <Input
                  id="recipientEmail"
                  type="email"
                  placeholder="Enter recipient email"
                  value={newCard.recipientEmail}
                  onChange={(e) => setNewCard({ ...newCard, recipientEmail: e.target.value })}
                />
              </div>
              <div className="bg-muted/50 rounded-lg p-3 text-sm">
                <div className="flex items-start gap-2">
                  <IconCreditCard className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Stripe Payment</p>
                    <p className="text-muted-foreground text-xs mt-1">
                      Card will be sent to recipient via email after successful payment
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleCreateCard}
                disabled={!newCard.amount || !newCard.recipientName || !newCard.recipientEmail || !newCard.purchasedBy}
              >
                Create & Process Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sold</CardTitle>
            <IconGift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{$(stats.totalSold)}</div>
            <p className="text-xs text-muted-foreground">{giftCards.length} cards issued</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Balance</CardTitle>
            <IconCreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{$(stats.activeBalance)}</div>
            <p className="text-xs text-muted-foreground">Unredeemed value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Currently valid</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Redeemed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.redeemed}</div>
            <p className="text-xs text-muted-foreground">Fully used</p>
          </CardContent>
        </Card>
      </div>

      {/* Gift Cards Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconGift className="h-5 w-5" />
            All Gift Cards
          </CardTitle>
          <CardDescription>Manage issued gift cards and track redemption</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Purchased By</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {giftCards.map((card) => (
                <TableRow key={card.id}>
                  <TableCell className="font-mono text-xs">{card.code}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{card.recipientName}</p>
                      <p className="text-xs text-muted-foreground">{card.recipientEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{card.purchasedBy}</TableCell>
                  <TableCell className="text-right text-sm font-semibold">{$(card.amount)}</TableCell>
                  <TableCell className="text-right text-sm font-semibold text-green-600">{$(card.balance)}</TableCell>
                  <TableCell className="text-sm">{card.expiryDate}</TableCell>
                  <TableCell>{getStatusBadge(card.status)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(card.code)}
                      className="h-8 w-8 p-0"
                    >
                      {copiedCode === card.code ? (
                        <IconCheck className="h-4 w-4 text-green-600" />
                      ) : (
                        <IconCopy className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          {giftCards.length} total gift cards • ${stats.totalSold.toLocaleString()} in total sales
        </CardFooter>
      </Card>

      {/* Business Insight */}
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <IconSparkles className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-base text-blue-900 dark:text-blue-100 mb-1">
                Gift Card Revenue Strategy
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Gift cards drive {$(stats.totalSold)} in upfront revenue with {Math.round((stats.activeBalance / stats.totalSold) * 100)}% still unredeemed.
                Promote during holidays for 3x sales boost. Average redemption increases booking value by 25% due to overspending.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
