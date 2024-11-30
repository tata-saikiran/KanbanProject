import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'

import DeleteConfirmationPopover from '~/components/DeleteConfirmationButton'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { cn } from '~/utils'

import { Id, Task } from '../types'

interface Props {
  task: Task
  deleteTask: (id: Id) => void
  updateTask: (id: Id, content: string) => void
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    disabled: editMode,
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
    setMouseIsOver(false)
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-50 p-2 h-[50px] min-h-[50px] items-center flex text-left rounded-xl border-2 border-red-500 bg-slate-100 cursor-grab relative text-black"
      />
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={editMode ? undefined : toggleEditMode}
      className={cn(
        'px-2 items-center flex text-left relative gap-2',
        editMode ? 'cursor-text' : 'cursor-grab'
      )}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      {...attributes}
      {...listeners}
    >
      <Button
        size="icon"
        variant="ghost"
        className="cursor-grab"
        {...attributes}
        {...listeners}
      >
        <GripIcon size={18} />
      </Button>

      <Input
        value={task.content}
        readOnly={!editMode}
        placeholder="Task content here"
        className="outline-none border-transparent focus:outline-none w-full bg-transparent focus:bg-white"
        onBlur={toggleEditMode}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.shiftKey) {
            toggleEditMode()
          }
        }}
        onClick={(e) => {
          e.stopPropagation()
          setEditMode(true)
        }}
        onChange={(e) => updateTask(task.id, e.target.value)}
      />

      {mouseIsOver && !editMode ? (
        <DeleteConfirmationPopover
          onDeleteConfirm={(e) => {
            e.stopPropagation()
            deleteTask(task.id)
          }}
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:bg-transparent hover:text-red-700 transition absolute right-4 top-1/2 -translate-y-1/2"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <Trash2Icon size={18} />
            </Button>
          }
        />
      ) : null}
    </div>
  )
}

export default TaskCard
