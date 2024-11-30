import { useMatches, useRouteLoaderData } from '@remix-run/react'
import { type ClassValue, clsx } from 'clsx'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

import type { User } from '~/models/user.server'
import { ProjectLoaderData } from '~/routes/dashboard+/$projectId'
import { DashboardLoaderData } from '~/routes/dashboard+/_layout'

const DEFAULT_REDIRECT = '/'

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== 'string') {
    return defaultRedirect
  }

  if (!to.startsWith('/') || to.startsWith('//')) {
    return defaultRedirect
  }

  return to
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches()
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  )
  return route?.data as Record<string, unknown>
}

function isUser(user: unknown): user is User {
  return (
    user != null &&
    typeof user === 'object' &&
    'email' in user &&
    typeof user.email === 'string'
  )
}

export function useOptionalUser(): User | undefined {
  const data = useMatchesData('root')
  if (!data || !isUser(data.user)) {
    return undefined
  }
  return data.user
}

export function useUser(): User {
  const maybeUser = useOptionalUser()
  if (!maybeUser) {
    throw new Error(
      'No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.'
    )
  }
  return maybeUser
}

export function validateEmail(email: unknown): email is string {
  return typeof email === 'string' && email.length > 3 && email.includes('@')
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const useProjects = () => {
  const data = useRouteLoaderData<DashboardLoaderData>(
    'routes/dashboard+/_layout'
  )

  if (!data) throw new Error('No data found')

  return data
}

export const useProject = () => {
  const data = useRouteLoaderData<ProjectLoaderData>(
    'routes/dashboard+/$projectId'
  )

  if (!data) throw new Error('No data found')

  return data
}

export function getInitials(name: string): string {
  const splitName = name
    .trim()
    .split(' ')
    .filter((n) => n !== '')
  const initials = splitName.map((nameComponent: string) =>
    nameComponent.charAt(0).toUpperCase()
  )
  return initials.join('')
}
