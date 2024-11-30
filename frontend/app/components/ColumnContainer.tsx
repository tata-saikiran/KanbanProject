import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Trash2Icon } from 'lucide-react'
import { useMemo, useState } from 'react'

import DeleteConfirmationPopover from '~/components/DeleteConfirmationButton'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { cn } from '~/utils'

import { Column, Id, Task } from '../types'

import TaskCard from './TaskCard'

interface Props {
  column: Column
  deleteColumn: (id: Id) => void
  updateColumn: (id: Id, title: string) => void

  createTask: (columnId: Id) => void
  updateTask: (id: Id, content: string) => void
  deleteTask: (id: Id) => void
  tasks: Task[]
}

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}: Props) {
  const [editMode, setEditMode] = useState(false)

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id)
  }, [tasks])

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
    disabled: editMode,
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-40 border-2 border-red-700 w-56 max-h-[500px] rounded-md flex flex-col bg-slate-100"
      ></div>
    )
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="text-black w-56 max-h-[500px] rounded-md flex flex-col h-max bg-blue-200/70"
      {...attributes}
      {...listeners}
    >
      <CardHeader
        className="grid grid-cols-[1fr_40px] items-center p-2 relative"
        onClick={() => setEditMode(true)}
      >
        <CardTitle className="flex items-center gap-2">
          <Input
            size={40}
            className={cn(
              'text-base font-semibold leading-none tracking-tight',
              !editMode &&
                'outline-none border-transparent focus:outline-none bg-transparent'
            )}
            value={column.title}
            onChange={(e) => updateColumn(column.id, e.target.value)}
            readOnly={!editMode}
            onBlur={() => setEditMode(false)}
            onKeyDown={(e) => {
              if (e.key !== 'Enter') return
              setEditMode(false)
            }}
          />
        </CardTitle>

        <DeleteConfirmationPopover
          onDeleteConfirm={() => deleteColumn(column.id)}
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:bg-transparent hover:text-red-700 transition"
            >
              <Trash2Icon size={18} />
            </Button>
          }
        />
      </CardHeader>

      <CardContent className="flex flex-grow flex-col gap-4 overflow-x-hidden">
        <div className="overflow-y-auto flex flex-col py-4">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))}
          </SortableContext>
        </div>

        <Button
          variant="secondary"
          className="mt-2"
          onClick={() => createTask(column.id)}
        >
          Add task
        </Button>
      </CardContent>
    </Card>
  )
}

export default ColumnContainer
