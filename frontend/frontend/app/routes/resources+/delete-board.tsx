import { ActionFunctionArgs, json, redirect } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { Trash2Icon } from 'lucide-react'
import * as React from 'react'
import { toast } from 'sonner'

import DeleteConfirmationPopover from '~/components/DeleteConfirmationButton'
import { Button } from '~/components/ui/button'
import { db } from '~/db.server'

export const ROUTE = '/resources/delete-board'
export const loader = async () => {
  return redirect('/dashboard')
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()

  const boardId = formData.get('boardId')?.toString()

  if (!boardId) {
    return json({
      success: false,
      message: 'Please try again later',
    })
  }

  await db.board.delete({
    where: {
      id: boardId,
    },
  })

  return json({
    success: true,
    message: 'Board deleted successfully',
  })
}

export function DeleteBoardButton({ boardId }: { boardId: string }) {
  const fetcher = useFetcher<typeof action>()

  const isSubmitting = fetcher.state !== 'idle'

  React.useEffect(() => {
    if (isSubmitting) return

    if (!fetcher.data) return

    if (!fetcher.data.success) {
      toast.error(fetcher.data.message)
    }
  }, [isSubmitting, fetcher.data])

  return (
    <DeleteConfirmationPopover
      onDeleteConfirm={() => {
        fetcher.submit(
          {
            boardId,
          },
          {
            method: 'POST',
            action: ROUTE,
            navigate: false,
          }
        )
      }}
      trigger={
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:bg-transparent hover:text-red-700 transition absolute top-0 right-0"
        >
          <Trash2Icon size={18} />
        </Button>
      }
    />
  )
}
