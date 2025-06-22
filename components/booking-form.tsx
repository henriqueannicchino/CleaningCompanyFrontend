"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Home, DollarSign, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface BookingData {
  // Service Details
  serviceType: string
  propertyType: string
  propertySize: string
  frequency: string

  // Date & Time
  preferredDate: string
  preferredTime: string
  alternateDate: string
  alternateTime: string

  // Property Details
  bedrooms: string
  bathrooms: string
  hasBasement: boolean
  hasPets: boolean
  hasParking: boolean

  // Contact Information
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  zipCode: string

  // Additional Services
  additionalServices: string[]
  specialInstructions: string

  // Pricing
  estimatedPrice: number
}

const serviceTypes = [
  { value: "standard", label: "Standard Cleaning", basePrice: 80 },
  { value: "deep", label: "Deep Cleaning", basePrice: 150 },
  { value: "move-in", label: "Move-in/Move-out", basePrice: 200 },
  { value: "post-construction", label: "Post-Construction", basePrice: 250 },
  { value: "recurring", label: "Recurring Service", basePrice: 70 },
  { value: "airbnb", label: "AirBnB Cleaning", basePrice: 120 },
]

const additionalServices = [
  { id: "windows", label: "Window Cleaning (Interior)", price: 25 },
  { id: "oven", label: "Oven Deep Clean", price: 35 },
  { id: "fridge", label: "Refrigerator Clean", price: 30 },
  { id: "garage", label: "Garage Cleaning", price: 40 },
  { id: "basement", label: "Basement Cleaning", price: 50 },
  { id: "laundry", label: "Laundry Service", price: 20 },
]

export function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>({
    serviceType: "",
    propertyType: "",
    propertySize: "",
    frequency: "",
    preferredDate: "",
    preferredTime: "",
    alternateDate: "",
    alternateTime: "",
    bedrooms: "",
    bathrooms: "",
    hasBasement: false,
    hasPets: false,
    hasParking: false,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    additionalServices: [],
    specialInstructions: "",
    estimatedPrice: 0,
  })

  const updateBookingData = (field: keyof BookingData, value: any) => {
    setBookingData((prev) => {
      const updated = { ...prev, [field]: value }
      // Recalculate price when relevant fields change
      if (["serviceType", "propertySize", "additionalServices"].includes(field)) {
        updated.estimatedPrice = calculatePrice(updated)
      }
      return updated
    })
  }

  const calculatePrice = (data: BookingData) => {
    const service = serviceTypes.find((s) => s.value === data.serviceType)
    let basePrice = service?.basePrice || 0

    // Size multiplier
    const sizeMultiplier =
      {
        small: 1,
        medium: 1.3,
        large: 1.6,
        "extra-large": 2,
      }[data.propertySize] || 1

    basePrice *= sizeMultiplier

    // Additional services
    const additionalPrice = data.additionalServices.reduce((total, serviceId) => {
      const service = additionalServices.find((s) => s.id === serviceId)
      return total + (service?.price || 0)
    }, 0)

    return Math.round(basePrice + additionalPrice)
  }

  const handleAdditionalServiceChange = (serviceId: string, checked: boolean) => {
    const current = bookingData.additionalServices
    const updated = checked ? [...current, serviceId] : current.filter((id) => id !== serviceId)
    updateBookingData("additionalServices", updated)
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const handleSubmit = () => {
    console.log("Booking submitted:", bookingData)
    // Here you would typically send the data to your backend
    alert("Booking request submitted! We'll contact you within 24 hours to confirm.")
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {step}
              </div>
              {step < 4 && <div className={`w-8 h-0.5 ${step < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Service Selection */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Home className="w-5 h-5" />
              <span>Service Details</span>
            </CardTitle>
            <CardDescription>Tell us about the cleaning service you need</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="serviceType">Service Type</Label>
                <Select onValueChange={(value) => updateBookingData("serviceType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label} - Starting at ${service.basePrice}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="propertyType">Property Type</Label>
                <Select onValueChange={(value) => updateBookingData("propertyType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="commercial">Commercial Space</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="propertySize">Property Size</Label>
                <Select onValueChange={(value) => updateBookingData("propertySize", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (Under 1,000 sq ft)</SelectItem>
                    <SelectItem value="medium">Medium (1,000-2,000 sq ft)</SelectItem>
                    <SelectItem value="large">Large (2,000-3,500 sq ft)</SelectItem>
                    <SelectItem value="extra-large">Extra Large (3,500+ sq ft)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Select onValueChange={(value) => updateBookingData("frequency", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="How often?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-time">One-time</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Select onValueChange={(value) => updateBookingData("bedrooms", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="# of bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5+">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Select onValueChange={(value) => updateBookingData("bathrooms", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="# of bathrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="1.5">1.5</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="2.5">2.5</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="3+">3+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Property Features</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="basement"
                    checked={bookingData.hasBasement}
                    onCheckedChange={(checked) => updateBookingData("hasBasement", checked)}
                  />
                  <Label htmlFor="basement">Has basement</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pets"
                    checked={bookingData.hasPets}
                    onCheckedChange={(checked) => updateBookingData("hasPets", checked)}
                  />
                  <Label htmlFor="pets">Has pets</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="parking"
                    checked={bookingData.hasParking}
                    onCheckedChange={(checked) => updateBookingData("hasParking", checked)}
                  />
                  <Label htmlFor="parking">Parking available for cleaning team</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Date & Time */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Schedule Your Service</span>
            </CardTitle>
            <CardDescription>Choose your preferred date and time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={bookingData.preferredDate}
                  onChange={(e) => updateBookingData("preferredDate", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <Label htmlFor="preferredTime">Preferred Time</Label>
                <Select onValueChange={(value) => updateBookingData("preferredTime", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8:00-10:00">8:00 AM - 10:00 AM</SelectItem>
                    <SelectItem value="10:00-12:00">10:00 AM - 12:00 PM</SelectItem>
                    <SelectItem value="12:00-14:00">12:00 PM - 2:00 PM</SelectItem>
                    <SelectItem value="14:00-16:00">2:00 PM - 4:00 PM</SelectItem>
                    <SelectItem value="16:00-18:00">4:00 PM - 6:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="alternateDate">Alternate Date (Optional)</Label>
                <Input
                  id="alternateDate"
                  type="date"
                  value={bookingData.alternateDate}
                  onChange={(e) => updateBookingData("alternateDate", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <Label htmlFor="alternateTime">Alternate Time (Optional)</Label>
                <Select onValueChange={(value) => updateBookingData("alternateTime", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8:00-10:00">8:00 AM - 10:00 AM</SelectItem>
                    <SelectItem value="10:00-12:00">10:00 AM - 12:00 PM</SelectItem>
                    <SelectItem value="12:00-14:00">12:00 PM - 2:00 PM</SelectItem>
                    <SelectItem value="14:00-16:00">2:00 PM - 4:00 PM</SelectItem>
                    <SelectItem value="16:00-18:00">4:00 PM - 6:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Scheduling Notes:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• We typically need 2-4 hours for standard cleaning</li>
                <li>• Deep cleaning may require 4-6 hours</li>
                <li>• We'll confirm your exact time slot within 24 hours</li>
                <li>• Same-day bookings available for an additional fee</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Contact & Address */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>We need your details to confirm the booking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={bookingData.firstName}
                  onChange={(e) => updateBookingData("firstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={bookingData.lastName}
                  onChange={(e) => updateBookingData("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => updateBookingData("email", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={bookingData.phone}
                  onChange={(e) => updateBookingData("phone", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                value={bookingData.address}
                onChange={(e) => updateBookingData("address", e.target.value)}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={bookingData.city}
                  onChange={(e) => updateBookingData("city", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={bookingData.zipCode}
                  onChange={(e) => updateBookingData("zipCode", e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Additional Services & Review */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Additional Services</CardTitle>
              <CardDescription>Enhance your cleaning with these optional add-ons</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {additionalServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={service.id}
                        checked={bookingData.additionalServices.includes(service.id)}
                        onCheckedChange={(checked) => handleAdditionalServiceChange(service.id, checked as boolean)}
                      />
                      <Label htmlFor={service.id} className="font-medium">
                        {service.label}
                      </Label>
                    </div>
                    <span className="text-sm font-semibold text-green-600">+${service.price}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Special Instructions</CardTitle>
              <CardDescription>Any specific requests or areas of focus?</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Please let us know about any special requirements, areas that need extra attention, access instructions, or other important details..."
                value={bookingData.specialInstructions}
                onChange={(e) => updateBookingData("specialInstructions", e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Price Summary */}
          <Card className="bg-green-50 dark:bg-black">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Booking Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span>{serviceTypes.find((s) => s.value === bookingData.serviceType)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span>Property Size:</span>
                  <span className="capitalize">{bookingData.propertySize?.replace("-", " ")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>
                    {bookingData.preferredDate} at {bookingData.preferredTime}
                  </span>
                </div>
                {bookingData.additionalServices.length > 0 && (
                  <div className="flex justify-between">
                    <span>Add-ons:</span>
                    <span>{bookingData.additionalServices.length} selected</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Estimated Total:</span>
                  <span className="text-green-600">${bookingData.estimatedPrice}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                * Final price may vary based on actual conditions. No payment required until service is completed.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="bg-white text-gray-900">
          Previous
        </Button>

        {currentStep < 4 ? (
          <Button onClick={nextStep}>Next Step</Button>
        ) : (
          <Button onClick={handleSubmit} size="lg" className="px-8">
            Submit Booking Request
          </Button>
        )}
      </div>
    </div>
  )
}
