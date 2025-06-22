import { BookingForm } from "@/components/booking-form"

export default function BookPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-blue-600 mb-4">Book Your Cleaning Service</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Schedule your professional cleaning service in just a few simple steps
            </p>
          </div>
          <BookingForm />
        </div>
      </div>
    </div>
  )
}
