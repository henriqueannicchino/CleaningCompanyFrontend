import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Building2, Sparkles, Wrench, Calendar } from "lucide-react"

const services = [
  {
    icon: Home,
    title: "Residential Cleaning",
    description: "Complete home cleaning services including kitchens, bathrooms, bedrooms, and living areas.",
    features: ["Deep cleaning", "Regular maintenance", "Move-in/out cleaning"],
  },
  {
    icon: Building2,
    title: "Commercial Cleaning",
    description: "Professional office and commercial space cleaning to maintain a productive work environment.",
    features: ["Office buildings", "Retail spaces", "Medical facilities"],
  },
  {
    icon: Sparkles,
    title: "Deep Cleaning",
    description: "Intensive cleaning service that reaches every corner and surface of your space.",
    features: ["Spring cleaning", "Post-construction", "One-time service"],
  },
  {
    icon: Home,
    title: "AirBnB Cleaning",
    description: "Specialized cleaning for short-term rentals to ensure 5-star guest experiences and quick turnovers.",
    features: ["Same-day turnovers", "Guest-ready standards", "Inventory restocking"],
  },
  {
    icon: Wrench,
    title: "Post-Construction",
    description: "Thorough cleanup after construction or renovation projects.",
    features: ["Dust removal", "Debris cleanup", "Final polish"],
  },
  {
    icon: Calendar,
    title: "Recurring Service",
    description: "Regular cleaning schedules tailored to your needs and preferences.",
    features: ["Weekly", "Bi-weekly", "Monthly"],
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Cleaning Services</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We offer comprehensive cleaning solutions for every need, from regular maintenance to specialized deep
            cleaning services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl text-gray-900 dark:text-white">{service.title}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
