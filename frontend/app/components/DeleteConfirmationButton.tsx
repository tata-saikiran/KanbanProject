import { TrashIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '~/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'

export interface DeleteConfirmationPopoverProps {
  onDeleteConfirm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  trigger?: React.ReactNode
}

const DeleteConfirmationPopover: React.FC<DeleteConfirmationPopoverProps> = ({
  onDeleteConfirm,
  trigger,
}: DeleteConfirmationPopoverProps) => {
  const component = trigger || <TrashIcon className="w-5 h-5" />

  return (
    <Popover>
      <PopoverTrigger asChild>{component}</PopoverTrigger>
      <PopoverContent side="right" align="start" className="p-0">
        <div className="flex flex-col items-center bg-white shadow-lg rounded p-4">
          <p className="text-sm text-gray-700 mb-4">
            Are you sure you want to delete?
          </p>
          <div className="flex gap-4">
            <Button
              variant="destructive"
              size="sm"
              onClick={(e) => {
                onDeleteConfirm(e)
                document.dispatchEvent(
                  new KeyboardEvent('keydown', { key: 'Escape' })
                )
              }}
            >
              Confirm
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                document.dispatchEvent(
                  new KeyboardEvent('keydown', { key: 'Escape' })
                )
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DeleteConfirmationPopover
