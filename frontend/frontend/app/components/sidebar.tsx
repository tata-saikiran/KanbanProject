import { NavLink } from '@remix-run/react'
import { CircleIcon, LayoutDashboardIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '~/components/ui/button'
import { cn, useProjects } from '~/utils'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  projects: ReturnType<typeof useProjects>['userProjects']
}

export function Sidebar({ className, projects = [] }: SidebarProps) {
  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <NavLink
              to="/dashboard"
              end
              className="flex items-center justify-start"
            >
              {({ isActive }) => (
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                >
                  <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                  Overview
                </Button>
              )}
            </NavLink>
          </div>
        </div>

        {projects.length > 0 ? (
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              My Projects
            </h2>
            <div className="space-y-1">
              {projects.map((project) => (
                <NavLink
                  to={project.id}
                  end
                  key={project.id}
                  className="flex items-center justify-start"
                >
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? 'secondary' : 'ghost'}
                      className="w-full flex items-center justify-start"
                    >
                      <CircleIcon
                        className={cn(
                          'mr-2 h-2 w-2',
                          project.is_public
                            ? 'fill-sky-400 text-sky-400'
                            : 'fill-secondary text-secondary-foreground'
                        )}
                      />
                      {project.name}
                    </Button>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
