"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 ">
      {/* Hero Section */}
      <section className="relative py-24 px-6 text-center bg-linear-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">

        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          About <span className="text-blue-600 dark:text-blue-400">Our Blog</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
          Sharing world-class tutorials, engineering insights, and hands-on guides to help you stay ahead in tech space.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          {[
            { label: "Monthly Readers", value: "10K+" },
            { label: "Articles Published", value: "250+" },
            { label: "Contributors", value: "50+" },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</p>
              <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 lg:px-20 py-20">
        {[
          {
            title: "Our Mission",
            text: "To empower students, developers, and tech enthusiasts with practical, hands-on knowledge in gasdets as well as mobile, AI, and cloud technologies.",
          },

          {
            title: "Our Vision",
            text: "To build a global hub where everyone can learn, share, and collaborate on the future of technology.",
          },
          {
            title: "Our Values",
            text: "Collaboration, transparency, and a relentless focus on developer experience and growth.",
          },
        ].map((item, i) => (
          <div key={i} className="max-w-[1560px] mx-auto">
            <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>
                <p className="text-gray-600 dark:text-gray-300">{item.text}</p>
              </CardContent>
            </Card>

          </div>
        ))}
      </section>

      {/* Journey / Timeline */}
      <section className="px-6 lg:px-20 py-16 bg-white">
        <div className="max-w-[1560px] mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="relative border-l-2 border-blue-500 dark:border-blue-400 pl-6 space-y-12">
            {[
              {
                year: "October 2025",
                text: "Launched our tech blog with a mission to make tech simple for students and developers — from the latest laptops to bug fixes that save hours.",
              },
              {
                year: "December 2025",
                text: "Expanded our focus with practical tutorials and deep dives into web, AI, and hardware trends — connecting with a growing global audience.",
              },
              {
                year: "January 2026",
                text: "Celebrated our first major milestone — thousands of readers worldwide trusting us for tech insights, laptop reviews, and real-world developer solutions.",
              },
            ].map((milestone, i) => (
              <div key={i} className="relative">
                <span className="absolute left-[-37px] w-6 h-6 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                <h3 className="text-xl font-semibold">{milestone.year}</h3>
                <p className="text-gray-600 dark:text-gray-300">{milestone.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 lg:px-20 py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-[1560px] mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { name: "Olanrewaju Adejumo", role: "Founder & Editor", img: "./profile-picture.jpg" },
            ].map((member, i) => (
              <Card
                key={i}
                className="rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition transform"
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Avatar className=" w-[120px] h-[120px] mb-4 ring-4 ring-blue-100 dark:ring-gray-700 flex items-center justify-center">
                    <AvatarImage className=" w-[90px] h-full  object-cover" src={member.img} alt={member.name} />
                    <AvatarFallback >{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 lg:px-20 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="max-w-2xl mx-auto space-y-4">
          <AccordionItem value="q2">
            <AccordionTrigger>Is the content free?</AccordionTrigger>
            <AccordionContent>
              Absolutely. All our tutorials, guides, and articles are completely free for the community.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>Do you offer mentorship?</AccordionTrigger>
            <AccordionContent>
              We’re working on mentorship and community programs. Stay tuned by subscribing to our newsletter.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center bg-linear-to-r from-blue-600 to-indigo-600 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to contribute?</h2>
        <p className="max-w-xl mx-auto mb-8 text-lg px-2">
          Join our growing network of developers, authors, and innovators. Share your expertise and inspire thousands.
        </p>
        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
          Get in Touch
        </Button>
      </section>
    </main>
  )
}
