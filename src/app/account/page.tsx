import Header from '@/components/Header'
import Link from 'next/link'

export default function AccountPage() {
    return (
        <>
            <Header />
            <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100" style={{ height: 'calc(100vh - 88px - 313px)' }}>
                <div className="max-w-md w-full mx-auto text-center px-6">
                    <div className="mb-8">
                        <div className="mx-auto w-24 h-24 bg-blue-400 rounded-full flex items-center justify-center mb-6">
                            <svg
                                className="w-12 h-12 text-blue-800"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>

                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            My Account
                        </h1>

                        <p className="text-lg text-gray-600 mb-6">
                            Account management features are coming soon!
                        </p>

                        <Link
                            href="/"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                        >
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}