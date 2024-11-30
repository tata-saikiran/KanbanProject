import type { User } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { db } from '~/db.server'

export type { User } from '@prisma/client'

export async function getUserById(id: User['id']) {
  return db.user.findUnique({ where: { id } })
}

export async function getUserByEmail(email: User['email']) {
  return db.user.findUnique({ where: { email } })
}

export async function createUser() {
  return null
}

export async function deleteUserByEmail(email: User['email']) {
  return db.user.delete({ where: { email } })
}

export async function verifyLogin(
  email: User['email'],
  password: User['password']
) {
  const user = await db.user.findUnique({
    where: { email },
  })

  if (!user) {
    return null
  }

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) {
    return null
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = user

  return userWithoutPassword
}
