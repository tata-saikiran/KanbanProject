import { Link } from '@remix-run/react'

import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { DeleteBoardButton } from '~/routes/resources+/delete-board'
import { useProjects } from '~/utils'

interface ProjectCardProps {
  project: ReturnType<typeof useProjects>['publicProjects'][0]
  canEdit: boolean
}
export function ProjectCard({ project, canEdit }: ProjectCardProps) {
  return (
    <Card className="bg-white p-4 rounded-md shadow-md group">
      <CardHeader className="relative ">
        <CardTitle className="text-xl font-bold text-gray-700 dark:text-gray-200">
          {project.name}
        </CardTitle>
        <CardDescription className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <svg
            className=" h-5 w-5"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="5" r="1" />
            <path d="m9 20 3-6 3 6" />
            <path d="m6 8 6 2 6-2" />
            <path d="M12 10v4" />
          </svg>
          <span>{project.user.name}</span>
        </CardDescription>
        {canEdit ? <DeleteBoardButton boardId={project.id} /> : null}
      </CardHeader>
      <CardContent className="text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-2">
          <svg
            className=" h-5 w-5"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect height="18" rx="2" ry="2" width="18" x="3" y="4" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
            <path d="M8 14h.01" />
            <path d="M12 14h.01" />
            <path d="M16 14h.01" />
            <path d="M8 18h.01" />
            <path d="M12 18h.01" />
            <path d="M16 18h.01" />
          </svg>
          <span>{new Date(project.created_at).toLocaleDateString()}</span>
        </div>
      </CardContent>
      <CardFooter className="w-full mt-6">
        <Button variant="default" className="px-3 shadow-none w-full" asChild>
          <Link to={project.id} className="flex items-center">
            View
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
