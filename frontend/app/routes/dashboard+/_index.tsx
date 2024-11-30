import { EmptyPrivateProjectsPlaceholder as NoProjects } from '~/components/empty-placeholder'
import { ProjectCard } from '~/components/ProjectCard'
import { useProjects, useUser } from '~/utils'

export default function Dashboard() {
  const { userProjects } = useProjects()
  const user = useUser()

  return (
    <>
      <div className="h-full px-4 py-6 lg:px-8">
        <div className="flex items-center justify-center">
          <h2 className="text-2xl font-semibold tracking-tight">Your Boards</h2>
        </div>

        <div className="relative mt-10">
          {userProjects.length > 0 ? (
            <div className="grid grid-cols-6 gap-4">
              {userProjects.map((project) => {
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
            <NoProjects />
          )}
        </div>
      </div>
    </>
  )
}
