import Header from '@/components/Header'
import Link from 'next/link'

export default function OrdersPage() {
    return (
        <>
            <Header />
            <div className="flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100" style={{ height: 'calc(100vh - 88px - 313px)' }}>
                <div className="max-w-md w-full mx-auto text-center px-6">
                    <div className="mb-8">
                        <div className="mx-auto w-24 h-24 bg-green-400 rounded-full flex items-center justify-center mb-6">
                            <svg
                                className="w-12 h-12 text-green-800"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path fillRule="evenodd" d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" clipRule="evenodd" />
                            </svg>
                        </div>

                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            My Orders
                        </h1>

                        <p className="text-lg text-gray-600 mb-6">
                            Order history and tracking features are coming soon!
                        </p>

                        <Link
                            href="/"
                            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                        >
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}