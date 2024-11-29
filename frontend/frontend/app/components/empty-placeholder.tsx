import { XIcon } from 'lucide-react'

interface EmptyPlaceholderProps {
  title: string
  description: string
  action?: React.ReactNode
}
export function EmptyPlaceholder({
  title,
  description,
  action,
}: EmptyPlaceholderProps) {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <XIcon className="h-10 w-10 text-muted-foreground" />

        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">{description}</p>

        {action}
      </div>
    </div>
  )
}

export const EmptyFeedPlaceholder = () => {
  return (
    <EmptyPlaceholder
      title="No public projects"
      description="Community has not shared any projects yet."
    />
  )
}

export const EmptyPrivateProjectsPlaceholder = () => {
  return (
    <EmptyPlaceholder
      title="No boards"
      description="You have not created any private projects yet."
    />
  )
}
