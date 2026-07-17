import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="font-[family-name:var(--font-plus-jakarta)] text-8xl font-bold text-accent/30 leading-none">
        404
      </h1>
      <h2 className="mt-6 font-[family-name:var(--font-plus-jakarta)] text-3xl font-bold text-ink">
        Page not found
      </h2>
      <p className="mt-4 text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <Link href="/">
          <Button variant="default" className="w-full sm:w-auto h-10 px-6 text-sm rounded-lg font-[family-name:var(--font-dm-sans)] font-semibold">
            Go Home
          </Button>
        </Link>
        <Link href="/book">
          <Button variant="outline" className="w-full sm:w-auto h-10 px-6 text-sm rounded-lg font-[family-name:var(--font-dm-sans)] font-semibold">
            Book Appointment
          </Button>
        </Link>
      </div>
    </div>
  )
}
