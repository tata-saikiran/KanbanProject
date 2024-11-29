import { DndContext, DragOverlay } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useSubmit } from '@remix-run/react'
import { PlusIcon } from 'lucide-react'
import * as React from 'react'
import { createPortal } from 'react-dom'

import { Button } from '~/components/ui/button'
import { useBoard } from '~/hooks/useTasks'
import { useProject } from '~/utils'

import ColumnContainer from './ColumnContainer'
import TaskCard from './TaskCard'

function KanbanBoard() {
  const { data, project } = useProject()
  const {
    columns,
    tasks,
    activeColumn,
    sensors,
    activeTask,
    createTask,
    deleteTask,
    updateTask,
    createNewColumn,
    deleteColumn,
    updateColumn,
    onDragStart,
    onDragEnd,
    onDragOver,
    columnsId,
  } = useBoard(data)

  const submit = useSubmit()

  React.useEffect(() => {
    console.log(
      JSON.stringify({
        cols: columns,
        tasks,
      })
    )

    submit(
      {
        projectId: project.id,
        data: JSON.stringify({
          cols: columns,
          tasks,
        }),
      },
      {
        method: 'POST',
      }
    )
  }, [columns, submit, project.id, tasks])

  return (
    <div className="text-black flex w-full items-center overflow-y-hidden overflow-x-scroll px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>

          <Button
            variant="secondary"
            onClick={() => createNewColumn()}
            className="w-max flex items-center gap-2"
          >
            <PlusIcon size={18} />
            <span>Add Column</span>
          </Button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn ? (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            ) : null}
            {activeTask ? (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ) : null}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )
}

export default KanbanBoard
