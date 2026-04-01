import type { User, CartItem, Product, Theme } from '@/types'

export function getUser(): User | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem('sd_user')
    return raw ? (JSON.parse(raw) as User) : null
  } catch { return null }
}

export function setUser(user: User): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('sd_user', JSON.stringify(user))
}

export function removeUser(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('sd_user')
}

export function isLoggedIn(): boolean {
  return !!getUser()
}

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem('sd_cart')
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch { return [] }
}

export function addToCart(product: Product, qty = 1): CartItem[] {
  const cart = getCart()
  const existing = cart.find(item => item.id === product.id)
  if (existing) {
    existing.qty = Math.min(existing.qty + qty, product.stock)
  } else {
    cart.push({ ...product, qty })
  }
  localStorage.setItem('sd_cart', JSON.stringify(cart))
  return cart
}

export function removeFromCart(productId: string): CartItem[] {
  const cart = getCart().filter(item => item.id !== productId)
  localStorage.setItem('sd_cart', JSON.stringify(cart))
  return cart
}

export function updateCartQty(productId: string, qty: number): CartItem[] {
  const cart = getCart().map(item =>
    item.id === productId ? { ...item, qty: Math.max(1, qty) } : item
  )
  localStorage.setItem('sd_cart', JSON.stringify(cart))
  return cart
}

export function clearCart(): void {
  localStorage.removeItem('sd_cart')
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.qty, 0)
}

export function getCartTotal(): number {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0)
}

export function getWishlist(): Product[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem('sd_wishlist')
    return raw ? (JSON.parse(raw) as Product[]) : []
  } catch { return [] }
}

export function toggleWishlist(product: Product): Product[] {
  const list = getWishlist()
  const exists = list.find(item => item.id === product.id)
  const updated = exists
    ? list.filter(item => item.id !== product.id)
    : [...list, product]
  localStorage.setItem('sd_wishlist', JSON.stringify(updated))
  return updated
}

export function isWishlisted(productId: string): boolean {
  return !!getWishlist().find(item => item.id === productId)
}

export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  return (localStorage.getItem('sd_theme') as Theme) || 'light'
}

export function setTheme(theme: Theme): void {
  localStorage.setItem('sd_theme', theme)
  document.documentElement.setAttribute('data-theme', theme)
}

export function toggleTheme(): Theme {
  const current = getTheme()
  const next: Theme = current === 'light' ? 'dark' : 'light'
  setTheme(next)
  return next
}


export function setAuthCookie(): void {
  if (typeof document === 'undefined') return
  // Set cookie that expires in 7 days
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `sd_auth=1; path=/; expires=${expires}; SameSite=Lax`
}

export function removeAuthCookie(): void {
  if (typeof document === 'undefined') return
  document.cookie = 'sd_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax'
}