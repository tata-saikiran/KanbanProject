import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  SerializeFrom,
  json,
} from '@remix-run/node'
import { NavLink, Outlet, useFetcher, useNavigate } from '@remix-run/react'
import * as React from 'react'
import { toast } from 'sonner'

import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Switch } from '~/components/ui/switch'
import { Textarea } from '~/components/ui/textarea'
import { UserNav } from '~/components/user-nav'
import { db } from '~/db.server'
import { getAllPublicProjects, getProjectsByUser } from '~/models/board.server'
import { requireUserId } from '~/session.server'
import { cn } from '~/utils'

export type DashboardLoaderData = SerializeFrom<typeof loader>
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request)

  const publicProjects = await getAllPublicProjects()
  const userProjects = await getProjectsByUser(userId)

  return json({ publicProjects, userProjects })
}

const links = [
  {
    to: '/dashboard',
    label: 'My Boards',
  },
  {
    to: '/dashboard/public-projects',
    label: 'Public Boards',
  },
]

const defaultProjectData = `{"cols":[{"id":9925,"title":"Today"},{"id":"done","title":"Pending"},{"id":6709,"title":"Done"}],"tasks":[]}`

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request)
  const formData = await request.formData()

  const name = formData.get('name')?.toString()
  const description = formData.get('description')?.toString()
  const isPublic = formData.get('public')?.toString()

  if (!name || !description) {
    return json({
      message: 'Invalid data',
      success: false,
      data: null,
    })
  }

  const board = await db.board.create({
    data: {
      data: defaultProjectData,
      is_public: isPublic === 'on',
      name,
      description,
      user_id: userId,
    },
  })

  return json({
    success: true,
    data: board.id,
    message: 'Board created',
  })
}

export default function ProjectDashboard() {
  const [open, setOpen] = React.useState(false)
  const fetcher = useFetcher<typeof action>()
  const navigate = useNavigate()

  const isSubmiting = fetcher.state !== 'idle'

  React.useEffect(() => {
    if (isSubmiting) return

    if (!fetcher.data) return

    if (fetcher.data.success) {
      toast.success(fetcher.data.message)
      navigate(`/dashboard/${fetcher.data.data}`)
      setOpen(false)
    }
  }, [isSubmiting, fetcher.data, navigate])

  return (
    <>
      <div className="flex flex-col h-full overflow-hidden">
        <div className="hidden flex-col md:flex sticky">
          <div className="border-b">
            <div className="flex h-16 items-center justify-between px-4">
              <div className="font-bold">MyTaskTracker</div>

              <div className="flex items-center gap-4">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end
                    className={({ isActive }) => cn(isActive && 'font-bold')}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost">Create Board</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create Board</DialogTitle>
                      <DialogDescription>
                        Create a new board to start tracking your tasks.
                      </DialogDescription>
                    </DialogHeader>
                    <fetcher.Form
                      id="create-board"
                      method="POST"
                      className="grid gap-4 py-4"
                    >
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input id="name" name="name" className="col-span-3" />
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          name="description"
                          className="col-span-3"
                        />
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="public" className="text-right">
                          Public
                        </Label>
                        <div className="col-span-3">
                          <Switch id="public" name="public" />
                        </div>
                      </div>
                    </fetcher.Form>
                    <DialogFooter>
                      <Button
                        type="submit"
                        disabled={isSubmiting}
                        form="create-board"
                      >
                        Create
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <UserNav />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block bg-background border-t h-full">
          <Outlet />
        </div>
      </div>
    </>
  )
}
