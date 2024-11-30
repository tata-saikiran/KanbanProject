import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'
import { useEffect, useRef } from 'react'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { verifyLogin } from '~/models/user.server'
import { createUserSession, getUserId } from '~/session.server'
import { safeRedirect, validateEmail } from '~/utils'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request)
  if (userId) return redirect('/')
  return json({})
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  const redirectTo = safeRedirect(formData.get('redirectTo'), '/')
  const remember = formData.get('remember')

  if (!validateEmail(email)) {
    return json(
      { errors: { email: 'Email is invalid', password: null } },
      { status: 400 }
    )
  }

  if (typeof password !== 'string' || password.length === 0) {
    return json(
      { errors: { email: null, password: 'Password is required' } },
      { status: 400 }
    )
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: 'Password is too short' } },
      { status: 400 }
    )
  }

  const user = await verifyLogin(email, password)

  if (!user) {
    return json(
      { errors: { email: 'Invalid email or password', password: null } },
      { status: 400 }
    )
  }

  return createUserSession({
    redirectTo,
    remember: remember === 'on' ? true : false,
    request,
    userId: user.id,
  })
}

export const meta: MetaFunction = () => [{ title: 'Login' }]

export default function LoginPage() {
  const actionData = useActionData<typeof action>()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus()
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus()
    }
  }, [actionData])

  return (
    <>
      <div className="flex w-full h-screen">
        <div className="w-1/2">
          <img
            alt="Cover Image"
            className="h-full w-full object-cover"
            height="1080"
            src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            style={{
              aspectRatio: '1/1',
              objectFit: 'cover',
            }}
            width="1920"
          />
        </div>
        <Form
          method="post"
          className="w-1/2 flex items-center justify-center p-10"
        >
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  className="w-full"
                  id="email"
                  name="email"
                  placeholder="work@email.com"
                  required
                  type="email"
                />
                {actionData?.errors?.email ? (
                  <div className="pt-1 text-red-700" id="email-error">
                    {actionData.errors.email}
                  </div>
                ) : null}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  className="w-full"
                  id="password"
                  name="password"
                  required
                  type="password"
                />
                {actionData?.errors?.password ? (
                  <div className="pt-1 text-red-700" id="password-error">
                    {actionData.errors.password}
                  </div>
                ) : null}
              </div>

              <div className="my-4 flex items-center justify-end">
                <Button asChild variant="link">
                  <Link to="/register">Register</Link>
                </Button>
              </div>

              <Button
                className="w-full hover:bg-blue-700 transition-colors"
                type="submit"
              >
                Login
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}
