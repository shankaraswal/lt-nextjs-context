import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100" style={{ height: 'calc(100vh - 313px)' }}>
            <div className="max-w-md w-full mx-auto text-center px-6">
                <div className="mb-8">
                    {/* Construction Icon */}
                    <div className="mx-auto w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mb-6">
                        <svg
                            className="w-12 h-12 text-yellow-800"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path fillRule="evenodd" d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0V10.58l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.267l1.16.665a1 1 0 11-.992 1.736l-1.732-.99A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1.002 1.002 0 01-.52.878l-1.734.99a1 1 0 11-.992-1.736L16 13.267V12a1 1 0 011-1zM9.504 16.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 18.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Under Construction
                    </h1>

                    <p className="text-lg text-gray-600 mb-6">
                        We're working hard to bring you something amazing. This page is currently under construction.
                    </p>

                    <div className="flex items-center justify-center mb-8">
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <Link
                        href="/"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                        Return Home
                    </Link>

                    <p className="text-sm text-gray-500">
                        Check back soon for updates!
                    </p>
                </div>
            </div>
        </div>
    )
}