import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  SerializeFrom,
  json,
  redirect,
} from '@remix-run/node'
import { ClientOnly } from 'remix-utils/client-only'

import KanbanBoard from '~/components/KanbanBoard'
import Loader from '~/components/loader'
import { db } from '~/db.server'
import { getProjectById } from '~/models/board.server'
import { getUserId } from '~/session.server'
import { BoardData } from '~/types'

export type ProjectLoaderData = SerializeFrom<typeof loader>
export async function loader({ params, request }: LoaderFunctionArgs) {
  const userId = await getUserId(request)

  if (!userId) {
    return redirect('/login')
  }

  const { projectId } = params
  if (!projectId) {
    return redirect('/dashboard')
  }

  const project = await getProjectById(projectId)
  if (!project) {
    return redirect('/dashboard')
  }

  return json({
    project,
    data: JSON.parse(project.data) as BoardData,
    canEdit: project.user_id === userId,
  })
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()

  const projectId = formData.get('projectId')?.toString()
  const data = formData.get('data')?.toString()

  if (!projectId || !data) {
    return redirect('/dashboard')
  }

  await db.board.update({
    where: {
      id: projectId,
    },
    data: {
      data,
    },
  })

  return null
}

export default function Project() {
  return (
    <div className="h-full px-4 py-12 lg:px-8 overflow-x-auto">
      <ClientOnly
        fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader />
          </div>
        }
      >
        {() => <KanbanBoard />}
      </ClientOnly>
    </div>
  )
}
