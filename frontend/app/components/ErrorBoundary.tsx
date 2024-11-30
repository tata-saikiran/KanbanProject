import { InfoIcon } from 'lucide-react'

export default function ErrorScreen({ error }: { error: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md p-8 bg-white shadow-lg rounded-md dark:bg-gray-800">
        <div className="text-center space-y-4">
          <InfoIcon className="h-16 w-16 mx-auto text-red-500 dark:text-red-400" />
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            Oops! Something went wrong.
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    </div>
  )
}
