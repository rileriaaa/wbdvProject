// ── USER ──────────────────────────────────────────────────────────────────
export type UserRole = 'buyer' | 'seller' | 'both'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string | null
  role: UserRole
  rating: number
  memberSince: string
  school: string
}

// ── PRODUCT ───────────────────────────────────────────────────────────────
export type Condition = 'Like New' | 'Good' | 'Fair'
export type CategoryId =
  | 'all'
  | 'textbooks'
  | 'supplies'
  | 'art'
  | 'lab'
  | 'electronics'
  | 'misc'

export interface Seller {
  id: string
  name: string
  rating: number
  responseTime: string
}

export interface Product {
  id: string
  title: string
  category: CategoryId
  price: number
  originalPrice: number | null
  condition: Condition
  stock: number
  rating: number
  reviewCount: number
  seller: Seller
  subject: string
  edition: string | null
  description: string
  tags: string[]
  images: string[]
  createdAt: string
}

export interface Category {
  id: CategoryId
  label: string
  icon: string
}

// ── CART ──────────────────────────────────────────────────────────────────
export interface CartItem extends Product {
  qty: number
}

// ── ORDER ─────────────────────────────────────────────────────────────────
export type OrderStatus =
  | 'Processing'
  | 'Confirmed'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'

export interface Order {
  id: string
  items: Product[]
  total: number
  status: OrderStatus
  date: string
  shipping: {
    method: string
    address: string
  }
  payment: string
}

// ── NOTIFICATION ──────────────────────────────────────────────────────────
export type NotifType =
  | 'Order Update'
  | 'Message'
  | 'Promotion'
  | 'Review'
  | 'System'

export interface Notification {
  id: string
  type: NotifType
  title: string
  body: string
  time: string
  read: boolean
}

// ── SELLER PROFILE ────────────────────────────────────────────────────────
export interface SellerProfile {
  id: string
  name: string
  school: string
  avatar: string | null
  rating: number
  totalSales: number
  totalListings: number
  responseTime: string
  responseRate: string
  memberSince: string
  badges: string[]
  bio: string
}

// ── REVIEW ────────────────────────────────────────────────────────────────
export interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  categoryRatings: {
    itemAsDescribed: number
    communication: number
    shippingSpeed: number
  }
  title: string
  body: string
  photos: string[]
  anonymous: boolean
  createdAt: string
}

// ── THEME ─────────────────────────────────────────────────────────────────
export type Theme = 'light' | 'dark'