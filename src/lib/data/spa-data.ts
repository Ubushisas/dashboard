// Centralized Spa Data for Wellness Dashboard
// All prices in USD, all data for American market

export interface Patient {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  lastVisit: string
  nextAppointment: string | null
  totalVisits: number
  totalSpent: number
  status: 'active' | 'inactive'
  medicalHistory: {
    allergies: string[]
    conditions: string[]
    medications: string[]
    preferences: string[]
    notes: string
  }
  memberSince: string
}

export interface Service {
  id: string
  name: string
  description: string
  duration: number // minutes
  price: number // USD
  category: 'massage' | 'facial' | 'body' | 'couples' | 'special'
  popularity: number // bookings per month
  productCost: number // cost of products used
  revenuePerHour: number
}

export interface Appointment {
  id: string
  patientId: string
  serviceId: string
  date: string
  time: string
  status: 'confirmed' | 'completed' | 'no-show' | 'cancelled'
  price: number
  therapistId: string
  roomId: string
  notes?: string
}

export interface Therapist {
  id: string
  name: string
  specialty: string[]
  hourlyRate: number
  performance: number // 0-100 rating
  bookingsThisMonth: number
  revenueThisMonth: number
  availability: string[]
}

// ============ SERVICES ============
export const services: Service[] = [
  {
    id: 's1',
    name: 'Deep Tissue Massage',
    description: '90-minute therapeutic massage focusing on chronic tension',
    duration: 90,
    price: 180,
    category: 'massage',
    popularity: 45,
    productCost: 15,
    revenuePerHour: 120,
  },
  {
    id: 's2',
    name: 'Swedish Massage',
    description: '60-minute relaxation massage with essential oils',
    duration: 60,
    price: 110,
    category: 'massage',
    popularity: 62,
    productCost: 12,
    revenuePerHour: 98,
  },
  {
    id: 's3',
    name: 'Hot Stone Therapy',
    description: '75-minute massage using heated stones',
    duration: 75,
    price: 145,
    category: 'massage',
    popularity: 28,
    productCost: 18,
    revenuePerHour: 101,
  },
  {
    id: 's4',
    name: 'Signature Facial',
    description: '60-minute customized facial treatment',
    duration: 60,
    price: 135,
    category: 'facial',
    popularity: 52,
    productCost: 25,
    revenuePerHour: 110,
  },
  {
    id: 's5',
    name: 'Anti-Aging Facial',
    description: '90-minute advanced anti-aging treatment',
    duration: 90,
    price: 210,
    category: 'facial',
    popularity: 31,
    productCost: 45,
    revenuePerHour: 110,
  },
  {
    id: 's6',
    name: 'Body Scrub & Wrap',
    description: '90-minute exfoliation and detox treatment',
    duration: 90,
    price: 165,
    category: 'body',
    popularity: 22,
    productCost: 30,
    revenuePerHour: 90,
  },
  {
    id: 's7',
    name: 'Couples Massage',
    description: '60-minute synchronized massage for two',
    duration: 60,
    price: 250,
    category: 'couples',
    popularity: 18,
    productCost: 24,
    revenuePerHour: 226,
  },
  {
    id: 's8',
    name: 'Prenatal Massage',
    description: '60-minute gentle massage for expecting mothers',
    duration: 60,
    price: 125,
    category: 'massage',
    popularity: 15,
    productCost: 10,
    revenuePerHour: 115,
  },
  {
    id: 's9',
    name: 'Express Facial',
    description: '30-minute quick refresh facial',
    duration: 30,
    price: 75,
    category: 'facial',
    popularity: 38,
    productCost: 15,
    revenuePerHour: 120,
  },
  {
    id: 's10',
    name: 'Luxury Spa Package',
    description: '3-hour complete spa experience',
    duration: 180,
    price: 425,
    category: 'special',
    popularity: 12,
    productCost: 65,
    revenuePerHour: 120,
  },
]

// ============ PATIENTS ============
export const patients: Patient[] = [
  {
    id: 'p1',
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@email.com',
    phone: '+1 (555) 234-5678',
    dateOfBirth: '1985-03-15',
    lastVisit: '2 days ago',
    nextAppointment: 'Tomorrow 10:00 AM',
    totalVisits: 24,
    totalSpent: 3240,
    status: 'active',
    memberSince: '2023-01-10',
    medicalHistory: {
      allergies: ['Lavender oil', 'Shellfish'],
      conditions: ['Lower back pain', 'Occasional migraines'],
      medications: ['Ibuprofen as needed'],
      preferences: ['Firm pressure', 'Quiet environment', 'No strong scents'],
      notes: 'Prefers therapist Jessica. Books monthly deep tissue for chronic back tension from desk work.',
    },
  },
  {
    id: 'p2',
    name: 'Michael Chen',
    email: 'michael.chen@techcorp.com',
    phone: '+1 (555) 345-6789',
    dateOfBirth: '1978-11-22',
    lastVisit: '1 week ago',
    nextAppointment: 'Friday 3:00 PM',
    totalVisits: 18,
    totalSpent: 2475,
    status: 'active',
    memberSince: '2023-05-20',
    medicalHistory: {
      allergies: [],
      conditions: ['Stress-related tension', 'IT band tightness'],
      medications: [],
      preferences: ['Deep tissue', 'Focus on shoulders and neck', 'Cool room temperature'],
      notes: 'Marathon runner. Needs sports massage before races. Very responsive to treatment.',
    },
  },
  {
    id: 'p3',
    name: 'Jennifer Rodriguez',
    email: 'j.rodriguez@gmail.com',
    phone: '+1 (555) 456-7890',
    dateOfBirth: '1992-07-08',
    lastVisit: '3 days ago',
    nextAppointment: null,
    totalVisits: 31,
    totalSpent: 4650,
    status: 'active',
    memberSince: '2022-08-15',
    medicalHistory: {
      allergies: [],
      conditions: [],
      medications: [],
      preferences: ['Facials only', 'Anti-aging treatments', 'Product recommendations welcome'],
      notes: 'Loyal facial client. Books bi-weekly signature facials. Interested in anti-aging series.',
    },
  },
  {
    id: 'p4',
    name: 'David Thompson',
    email: 'dthompson@finance.com',
    phone: '+1 (555) 567-8901',
    dateOfBirth: '1970-04-30',
    lastVisit: 'Today',
    nextAppointment: 'Today 4:30 PM',
    totalVisits: 6,
    totalSpent: 780,
    status: 'active',
    memberSince: '2024-09-05',
    medicalHistory: {
      allergies: [],
      conditions: ['High blood pressure (controlled)'],
      medications: ['Lisinopril 10mg'],
      preferences: ['Gentle pressure', 'Relaxation focus'],
      notes: 'New client. Doctor recommended massage for stress management. Enjoys Swedish massage.',
    },
  },
  {
    id: 'p5',
    name: 'Emily Watson',
    email: 'emily.w@creative.studio',
    phone: '+1 (555) 678-9012',
    dateOfBirth: '1988-12-10',
    lastVisit: '1 month ago',
    nextAppointment: null,
    totalVisits: 42,
    totalSpent: 5985,
    status: 'active',
    memberSince: '2022-02-20',
    medicalHistory: {
      allergies: [],
      conditions: [],
      medications: [],
      preferences: ['Hot stone therapy', 'Aromatherapy', 'Meditation music'],
      notes: 'VIP client. Books monthly luxury packages. Loves hot stone. Excellent tipper.',
    },
  },
  {
    id: 'p6',
    name: 'Robert Johnson',
    email: 'rob.johnson@law.com',
    phone: '+1 (555) 789-0123',
    dateOfBirth: '1965-09-25',
    lastVisit: '2 weeks ago',
    nextAppointment: 'Monday 2:00 PM',
    totalVisits: 12,
    totalSpent: 1560,
    status: 'active',
    memberSince: '2023-11-10',
    medicalHistory: {
      allergies: [],
      conditions: ['Arthritis in hands', 'Sciatica'],
      medications: ['Meloxicam'],
      preferences: ['Therapeutic focus', 'Extra time on lower back'],
      notes: 'Retired lawyer. Books every 2 weeks for pain management. Prefers morning appointments.',
    },
  },
  {
    id: 'p7',
    name: 'Amanda Foster',
    email: 'amanda.foster@startup.io',
    phone: '+1 (555) 890-1234',
    dateOfBirth: '1995-06-18',
    lastVisit: '5 days ago',
    nextAppointment: null,
    totalVisits: 28,
    totalSpent: 3220,
    status: 'active',
    memberSince: '2023-03-15',
    medicalHistory: {
      allergies: [],
      conditions: [],
      medications: [],
      preferences: ['Mix of facials and massage', 'Lunch-hour appointments'],
      notes: 'Tech entrepreneur. Books express facials during lunch. Occasionally splurges on full packages.',
    },
  },
  {
    id: 'p8',
    name: 'Lisa Anderson',
    email: 'lisa.a@health.org',
    phone: '+1 (555) 901-2345',
    dateOfBirth: '1990-02-14',
    lastVisit: '3 months ago',
    nextAppointment: null,
    totalVisits: 8,
    totalSpent: 960,
    status: 'inactive',
    medicalHistory: {
      allergies: [],
      conditions: [],
      medications: [],
      preferences: ['Swedish massage'],
      notes: 'Has not booked in 3 months. May need re-engagement offer.',
    },
  },
  {
    id: 'p9',
    name: 'Patricia Lee',
    email: 'patricia.lee@consultant.com',
    phone: '+1 (555) 012-3456',
    dateOfBirth: '1983-08-05',
    lastVisit: '1 week ago',
    nextAppointment: 'Next Thursday 11:00 AM',
    totalVisits: 19,
    totalSpent: 3610,
    status: 'active',
    memberSince: '2023-06-01',
    medicalHistory: {
      allergies: [],
      conditions: ['Pregnant - 2nd trimester'],
      medications: ['Prenatal vitamins'],
      preferences: ['Prenatal massage only', 'Extra pillows', 'Gentle pressure'],
      notes: 'Expecting first baby. Switched to prenatal massages. Due in 3 months.',
    },
  },
  {
    id: 'p10',
    name: 'James Wilson',
    email: 'james.wilson@corp.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1972-01-20',
    lastVisit: '4 days ago',
    nextAppointment: 'Saturday 9:00 AM',
    totalVisits: 15,
    totalSpent: 2025,
    status: 'active',
    memberSince: '2023-09-10',
    medicalHistory: {
      allergies: [],
      conditions: ['Golf-related muscle strain'],
      medications: [],
      preferences: ['Sports massage', 'Weekend appointments', 'Male therapist preferred'],
      notes: 'Golfer. Books pre-tournament sports massages. Very punctual. Good referral source.',
    },
  },
]

// ============ THERAPISTS/STAFF ============
export const therapists: Therapist[] = [
  {
    id: 't1',
    name: 'Jessica Martinez',
    specialty: ['Deep Tissue', 'Sports Massage', 'Trigger Point'],
    hourlyRate: 45,
    performance: 95,
    bookingsThisMonth: 68,
    revenueThisMonth: 7820,
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  },
  {
    id: 't2',
    name: 'David Park',
    specialty: ['Swedish', 'Hot Stone', 'Aromatherapy'],
    hourlyRate: 42,
    performance: 88,
    bookingsThisMonth: 52,
    revenueThisMonth: 5940,
    availability: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  {
    id: 't3',
    name: 'Rachel Green',
    specialty: ['Facials', 'Anti-Aging', 'Skincare'],
    hourlyRate: 48,
    performance: 92,
    bookingsThisMonth: 61,
    revenueThisMonth: 8235,
    availability: ['Mon', 'Tue', 'Thu', 'Fri', 'Sat'],
  },
  {
    id: 't4',
    name: 'Michelle Adams',
    specialty: ['Prenatal', 'Swedish', 'Relaxation'],
    hourlyRate: 43,
    performance: 90,
    bookingsThisMonth: 45,
    revenueThisMonth: 5175,
    availability: ['Mon', 'Wed', 'Thu', 'Fri'],
  },
  {
    id: 't5',
    name: 'Brandon Cole',
    specialty: ['Sports Massage', 'Deep Tissue', 'Couples'],
    hourlyRate: 44,
    performance: 85,
    bookingsThisMonth: 38,
    revenueThisMonth: 4560,
    availability: ['Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
]

// Helper functions
export const getPatientById = (id: string) => patients.find(p => p.id === id)
export const getServiceById = (id: string) => services.find(s => s.id === id)
export const getTherapistById = (id: string) => therapists.find(t => t.id === id)

// Analytics calculations
export const getTotalRevenue = () => patients.reduce((sum, p) => sum + p.totalSpent, 0)
export const getActivePatients = () => patients.filter(p => p.status === 'active').length
export const getAverageSpend = () => getTotalRevenue() / patients.length
