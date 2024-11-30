import { EmptyPrivateProjectsPlaceholder } from '~/components/empty-placeholder'
import { ProjectCard } from '~/components/ProjectCard'
import { useProjects, useUser } from '~/utils'

export default function Dashboard() {
  const { publicProjects } = useProjects()
  const user = useUser()

  return (
    <>
      <div className="h-full px-4 py-6 lg:px-8">
        <div className="flex items-center justify-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            Public Boards
          </h2>
        </div>

        <div className="relative mt-10">
          {publicProjects.length > 0 ? (
            <div className="grid grid-cols-6 gap-4">
              {publicProjects.map((project) => {
                const canEdit = project.user.id === user.id
                return (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    canEdit={canEdit}
                  />
                )
              })}
            </div>
          ) : (
            <EmptyPrivateProjectsPlaceholder />
          )}
        </div>
      </div>
    </>
  )
}
