import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Downtown",
    rating: 5,
    text: "SparkleClean has been cleaning our office for over 2 years. They're always professional, thorough, and reliable. Highly recommend!",
  },
  {
    name: "Mike Chen",
    location: "Westside",
    rating: 5,
    text: "Amazing deep cleaning service! They transformed our home after our renovation. Every detail was perfect.",
  },
  {
    name: "Emily Rodriguez",
    location: "Northbrook",
    rating: 5,
    text: "I've been using their weekly service for 6 months. My house has never been cleaner, and the team is so friendly and trustworthy.",
  },
  {
    name: "David Thompson",
    location: "Riverside",
    rating: 5,
    text: "Professional, efficient, and eco-friendly. They use safe products around our kids and pets. Couldn't be happier!",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-700">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-blue-600 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {
              "Don't just take our word for it. Here's what our satisfied customers have to say about our cleaning services."
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-400 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-600">{testimonial.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{testimonial.location}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
