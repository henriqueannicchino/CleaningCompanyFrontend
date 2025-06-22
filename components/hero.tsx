import { Button } from "@/components/ui/button"
import { CheckCircle, Star } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section id="home" className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">4.9/5 from 200+ reviews</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Professional Cleaning Services You Can Trust
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Transform your space with our reliable, eco-friendly cleaning solutions. Serving homes and businesses with
              exceptional care and attention to detail.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/book">
                <Button size="lg" className="text-lg px-8">
                  Book Now
                </Button>
              </Link>
              <Link href="/estimate">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                >
                  Free Estimate
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Insured & Bonded</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Eco-Friendly</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">100% Satisfaction</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/cleaningMain.jpg?height=600&width=500"
              alt="Professional cleaning service"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-blue-600">10+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
