import { Button } from "@/components/ui/button"
import { Shield, Users, Clock, Award } from "lucide-react"

const stats = [
  { icon: Users, value: "500+", label: "Happy Customers" },
  { icon: Clock, value: "10+", label: "Years Experience" },
  { icon: Shield, value: "100%", label: "Insured & Bonded" },
  { icon: Award, value: "4.9/5", label: "Customer Rating" },
]

export function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/cleaningProducts.jpg?height=500&width=600"
              alt="Professional cleaning team"
              className="rounded-lg shadow-lg"
            />
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Salles Nettoyage?
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              With over a decade of experience, we've built our reputation on reliability, quality, and exceptional
              customer service. Our trained professionals use eco-friendly products and proven techniques to deliver
              outstanding results.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Trained Professionals</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Background-checked and fully trained cleaning experts
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Eco-Friendly Products</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Safe, non-toxic cleaning solutions for your family and pets
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Satisfaction Guarantee</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {"We're not happy until you're completely satisfied"}
                  </p>
                </div>
              </div>
            </div>

            <Button size="lg">Learn More About Us</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
