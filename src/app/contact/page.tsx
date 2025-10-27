"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"
import { FormEvent, useRef, useState } from "react"
import { toast } from "sonner"
import emailjs from "@emailjs/browser"
export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleContact = async (e: FormEvent) => {
    e.preventDefault()
    const form = formRef.current;
    if (!form) return;

    // ✅ Validate required fields
    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();
    console.log("form: ", form)
    if (!name || !email || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // ✅ Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      await emailjs.sendForm(
        "service_4epzc1h",      // your EmailJS service ID
        "template_r59xz7o",     // your EmailJS template ID
        form,
        "SsijQ7L0MTH-Cr1qs"       // your EmailJS public key
      );

      toast.success("Message sent successfully!");
      form.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }

  }
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 text-center px-2">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Get in <span className="text-blue-600 dark:text-blue-400">Touch</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          Have a question, idea, or just want to say hello? We’d love to hear from you.
        </p>
      </section>

      {/* Contact Form + Info */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-12 px-6 lg:px-20 pt-8 pb-16">
        {/* Contact Info */}
        <div className="space-y-8 lg:col-span-2">
          <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
            <CardContent className="p-6 flex items-start space-x-4">
              <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-gray-600 dark:text-gray-400">support@devblog.com</p>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
            <CardContent className="p-6 flex items-start space-x-4">
              <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <div>
                <h3 className="text-lg font-semibold">Phone</h3>
                <p className="text-gray-600 dark:text-gray-400">+234 801 234 5678</p>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
            <CardContent className="p-6 flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <div>
                <h3 className="text-lg font-semibold">Location</h3>
                <p className="text-gray-600 dark:text-gray-400">Lagos, Nigeria</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3">

          <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
            <CardContent className="p-5 sm:p-8 space-y-6">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form className="space-y-6" ref={formRef}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input name="name" placeholder="Your Name" className="rounded-md px-3.5 py-2.5 h-auto" required />
                  <Input name="email" type="email" placeholder="Your Email" className="rounded-md px-3.5 py-2.5 h-auto" required />
                </div>
                <Input name="title" placeholder="Subject" className="rounded-md px-3.5 py-2.5 h-auto" required />
                <Textarea name="message" placeholder="Your Message" rows={6} className="rounded-md py-3.5" required />
                <Button disabled = {loading} type="button" onClick={(e) => handleContact(e)} size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center bg-linear-to-r from-blue-600 to-indigo-600 text-white px-2">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Let’s Build Something Great Together</h2>
        <p className="max-w-xl mx-auto mb-8 text-lg">
          Whether you’re a developer, a student, or an enthusiast — connect with us and be part of the journey.
        </p>
        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 rounded-xl">
          Join Our Community
        </Button>
      </section>
    </main>
  )
}
