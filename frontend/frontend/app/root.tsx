import type { LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react'
import { Toaster } from 'sonner'

import ErrorScreen from '~/components/ErrorBoundary'
import { getUser } from '~/session.server'
import '~/tailwind.css'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const response = await fetch('http://localhost:8080/api/v1/board/public')
    const _data = await response.json()
  } catch (error) {
    // throw new Error('Please start the backend server')
  }

  return json({ user: await getUser(request) })
}

export default function App() {
  return (
    <Document>
      <Outlet />
      <Toaster richColors />
    </Document>
  )
}

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {children}

        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <ErrorScreen error={error.statusText} />
      </Document>
    )
  } else if (error instanceof Error) {
    return (
      <Document>
        <ErrorScreen error={error.message} />
      </Document>
    )
  } else {
    return <h1>Unknown Error</h1>
  }
}
