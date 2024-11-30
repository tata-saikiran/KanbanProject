import {
  redirect,
  type DataFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'

import { getUser } from '~/session.server'

export const meta: MetaFunction = () => [{ title: 'MyTaskTracker' }]

export async function loader({ request }: DataFunctionArgs) {
  const user = await getUser(request)

  if (!user) {
    return redirect('/login')
  }

  return redirect('/dashboard')
}
