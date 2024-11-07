import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f1318] text-white">
      <h2 className="text-2xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="mb-4">Could not find requested resource</p>
      <Link href="/" className="text-blue-500 hover:text-blue-700">
        Return Home
      </Link>
    </div>
  )
}
