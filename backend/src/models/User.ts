// User / Author Model & Interface

export interface IUser {
  userId: number
  username: string
  passwordHash: string
  isActive: boolean
  createdAt: string
  updatedAt?: string
}
