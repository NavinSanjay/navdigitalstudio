import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'nav-digital-studio-secret-key'
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'Navin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'poopoo'

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  if (username !== ADMIN_USERNAME) return false
  // For simplicity, using direct comparison. In production, use hashed passwords.
  return password === ADMIN_PASSWORD
}

export function createToken(username: string): string {
  return jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '24h' })
}

export function verifyToken(token: string): { username: string; role: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { username: string; role: string }
  } catch {
    return null
  }
}

export async function getSession(): Promise<{ username: string; role: string } | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token) return null
  return verifyToken(token)
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return session !== null
}
