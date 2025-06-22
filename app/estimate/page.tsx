import { EstimateForm } from "@/components/estimate-form"

export default function EstimatePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-blue-600 mb-4">Get Your Free Estimate</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Tell us about your cleaning needs and we'll provide you with a detailed, no-obligation quote within 24
              hours
            </p>
          </div>
          <EstimateForm />
        </div>
      </div>
    </div>
  )
}
