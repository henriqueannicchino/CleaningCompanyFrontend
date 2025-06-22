"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calculator, ArrowLeft, CheckCircle, Phone, Mail } from "lucide-react"
import Link from "next/link"

interface EstimateData {
  // Service Details
  serviceType: string
  propertyType: string
  propertySize: string
  frequency: string
  bedrooms: string
  bathrooms: string

  // Property Features
  hasBasement: boolean
  hasGarage: boolean
  hasPets: boolean
  hasHardFloors: boolean
  hasCarpets: boolean

  // Contact Information
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  zipCode: string

  // Additional Information
  additionalServices: string[]
  urgency: string
  specialRequirements: string
  preferredContact: string

  // Estimate
  estimatedPrice: { min: number; max: number }
}

const serviceTypes = [
  { value: "standard", label: "Standard Cleaning", minPrice: 80, maxPrice: 120 },
  { value: "deep", label: "Deep Cleaning", minPrice: 150, maxPrice: 250 },
  { value: "move-in", label: "Move-in/Move-out", minPrice: 200, maxPrice: 350 },
  { value: "post-construction", label: "Post-Construction", minPrice: 250, maxPrice: 400 },
  { value: "recurring", label: "Recurring Service", minPrice: 70, maxPrice: 110 },
  { value: "commercial", label: "Commercial Cleaning", minPrice: 100, maxPrice: 200 },
  { value: "airbnb", label: "AirBnB Cleaning", minPrice: 120, maxPrice: 180 },
]

const additionalServices = [
  { id: "windows", label: "Window Cleaning (Interior)", price: 25 },
  { id: "oven", label: "Oven Deep Clean", price: 35 },
  { id: "fridge", label: "Refrigerator Clean", price: 30 },
  { id: "garage", label: "Garage Cleaning", price: 40 },
  { id: "basement", label: "Basement Cleaning", price: 50 },
  { id: "laundry", label: "Laundry Service", price: 20 },
  { id: "organizing", label: "Organization Service", price: 45 },
  { id: "carpet-deep", label: "Carpet Deep Clean", price: 60 },
]

export function EstimateForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [estimateData, setEstimateData] = useState<EstimateData>({
    serviceType: "",
    propertyType: "",
    propertySize: "",
    frequency: "",
    bedrooms: "",
    bathrooms: "",
    hasBasement: false,
    hasGarage: false,
    hasPets: false,
    hasHardFloors: false,
    hasCarpets: false,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    additionalServices: [],
    urgency: "",
    specialRequirements: "",
    preferredContact: "",
    estimatedPrice: { min: 0, max: 0 },
  })

  const updateEstimateData = (field: keyof EstimateData, value: any) => {
    setEstimateData((prev) => {
      const updated = { ...prev, [field]: value }
      // Recalculate price when relevant fields change
      if (["serviceType", "propertySize", "additionalServices", "frequency"].includes(field)) {
        updated.estimatedPrice = calculateEstimate(updated)
      }
      return updated
    })
  }

  const calculateEstimate = (data: EstimateData) => {
    const service = serviceTypes.find((s) => s.value === data.serviceType)
    if (!service) return { min: 0, max: 0 }

    let minPrice = service.minPrice
    let maxPrice = service.maxPrice

    // Size multiplier
    const sizeMultiplier =
      {
        small: 1,
        medium: 1.3,
        large: 1.6,
        "extra-large": 2,
      }[data.propertySize] || 1

    minPrice *= sizeMultiplier
    maxPrice *= sizeMultiplier

    // Frequency discount
    const frequencyDiscount =
      {
        weekly: 0.9,
        "bi-weekly": 0.95,
        monthly: 1,
        "one-time": 1,
      }[data.frequency] || 1

    minPrice *= frequencyDiscount
    maxPrice *= frequencyDiscount

    // Additional services
    const additionalPrice = data.additionalServices.reduce((total, serviceId) => {
      const service = additionalServices.find((s) => s.id === serviceId)
      return total + (service?.price || 0)
    }, 0)

    return {
      min: Math.round(minPrice + additionalPrice),
      max: Math.round(maxPrice + additionalPrice),
    }
  }

  const handleAdditionalServiceChange = (serviceId: string, checked: boolean) => {
    const current = estimateData.additionalServices
    const updated = checked ? [...current, serviceId] : current.filter((id) => id !== serviceId)
    updateEstimateData("additionalServices", updated)
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const handleSubmit = () => {
    console.log("Estimate request submitted:", estimateData)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-blue-600 mb-4">Estimate Request Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in Salles Nettoyage. We've received your estimate request and will get back to
            you within 24 hours with a detailed quote.
          </p>

          <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Your Estimated Price Range</h3>
            <div className="text-3xl font-bold text-blue-600">
              ${estimateData.estimatedPrice.min} - ${estimateData.estimatedPrice.max}
            </div>
            <p className="text-sm text-blue-800 mt-2">
              *Final price may vary based on specific requirements and site inspection
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center justify-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Phone className="w-5 h-5 text-blue-600" />
              <span className="text-sm">(555) 123-4567</span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Mail className="w-5 h-5 text-blue-600" />
              <span className="text-sm">info@sallesnettoyage.com</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline" className="bg-white text-gray-900">
                Back to Home
              </Button>
            </Link>
            <Link href="/book">
              <Button>Book Service Now</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
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
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {step}
              </div>
              {step < 3 && <div className={`w-8 h-0.5 ${step < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Service & Property Details */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="w-5 h-5" />
              <span>Service & Property Details</span>
            </CardTitle>
            <CardDescription>Tell us about your cleaning needs and property</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="serviceType">Service Type</Label>
                <Select onValueChange={(value) => updateEstimateData("serviceType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="propertyType">Property Type</Label>
                <Select onValueChange={(value) => updateEstimateData("propertyType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="retail">Retail Space</SelectItem>
                    <SelectItem value="warehouse">Warehouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="propertySize">Property Size</Label>
                <Select onValueChange={(value) => updateEstimateData("propertySize", value)}>
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
                <Label htmlFor="frequency">Cleaning Frequency</Label>
                <Select onValueChange={(value) => updateEstimateData("frequency", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="How often?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-time">One-time</SelectItem>
                    <SelectItem value="weekly">Weekly (10% discount)</SelectItem>
                    <SelectItem value="bi-weekly">Bi-weekly (5% discount)</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bedrooms">Number of Bedrooms</Label>
                <Select onValueChange={(value) => updateEstimateData("bedrooms", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Studio/0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5+">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bathrooms">Number of Bathrooms</Label>
                <Select onValueChange={(value) => updateEstimateData("bathrooms", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bathrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="1.5">1.5</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="2.5">2.5</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="3.5">3.5</SelectItem>
                    <SelectItem value="4+">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Property Features (Select all that apply)</Label>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="basement"
                    checked={estimateData.hasBasement}
                    onCheckedChange={(checked) => updateEstimateData("hasBasement", checked)}
                  />
                  <Label htmlFor="basement">Has basement</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="garage"
                    checked={estimateData.hasGarage}
                    onCheckedChange={(checked) => updateEstimateData("hasGarage", checked)}
                  />
                  <Label htmlFor="garage">Has garage</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pets"
                    checked={estimateData.hasPets}
                    onCheckedChange={(checked) => updateEstimateData("hasPets", checked)}
                  />
                  <Label htmlFor="pets">Has pets</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hardFloors"
                    checked={estimateData.hasHardFloors}
                    onCheckedChange={(checked) => updateEstimateData("hasHardFloors", checked)}
                  />
                  <Label htmlFor="hardFloors">Hard floors (wood, tile, etc.)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="carpets"
                    checked={estimateData.hasCarpets}
                    onCheckedChange={(checked) => updateEstimateData("hasCarpets", checked)}
                  />
                  <Label htmlFor="carpets">Carpeted areas</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Additional Services & Requirements */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Additional Services</CardTitle>
              <CardDescription>Select any additional services you'd like included</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {additionalServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={service.id}
                        checked={estimateData.additionalServices.includes(service.id)}
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
              <CardTitle>Service Requirements</CardTitle>
              <CardDescription>Help us provide the most accurate estimate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="urgency">Timeline</Label>
                <Select onValueChange={(value) => updateEstimateData("urgency", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="When do you need this service?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">ASAP (within 48 hours)</SelectItem>
                    <SelectItem value="this-week">This week</SelectItem>
                    <SelectItem value="next-week">Next week</SelectItem>
                    <SelectItem value="flexible">I'm flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="specialRequirements">Special Requirements or Notes</Label>
                <Textarea
                  id="specialRequirements"
                  placeholder="Please describe any specific cleaning needs, problem areas, or special instructions..."
                  value={estimateData.specialRequirements}
                  onChange={(e) => updateEstimateData("specialRequirements", e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3: Contact Information */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>We'll use this information to send you your detailed estimate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={estimateData.firstName}
                    onChange={(e) => updateEstimateData("firstName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={estimateData.lastName}
                    onChange={(e) => updateEstimateData("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={estimateData.email}
                    onChange={(e) => updateEstimateData("email", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={estimateData.phone}
                    onChange={(e) => updateEstimateData("phone", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Property Address</Label>
                <Input
                  id="address"
                  value={estimateData.address}
                  onChange={(e) => updateEstimateData("address", e.target.value)}
                  placeholder="Street address"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={estimateData.city}
                    onChange={(e) => updateEstimateData("city", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={estimateData.zipCode}
                    onChange={(e) => updateEstimateData("zipCode", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                <Select onValueChange={(value) => updateEstimateData("preferredContact", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="How would you like us to contact you?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone call</SelectItem>
                    <SelectItem value="text">Text message</SelectItem>
                    <SelectItem value="any">Any method is fine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Price Estimate Preview */}
          {estimateData.estimatedPrice.min > 0 && (
            <Card className="bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">Estimated Price Range</CardTitle>
                <CardDescription className="text-green-700">Based on the information provided</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    ${estimateData.estimatedPrice.min} - ${estimateData.estimatedPrice.max}
                  </div>
                  <p className="text-sm text-green-700">Final price will be confirmed after a brief consultation</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="bg-white text-gray-900">
          Previous
        </Button>

        {currentStep < 3 ? (
          <Button onClick={nextStep}>Next Step</Button>
        ) : (
          <Button onClick={handleSubmit} size="lg" className="px-8">
            Get My Free Estimate
          </Button>
        )}
      </div>
    </div>
  )
}
