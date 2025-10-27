"use client"

import { Shield, Cookie, Users, FileEdit, RefreshCcw, Mail } from "lucide-react"

export default function PolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="relative py-24 px-2 text-center bg-gradient-to-r from-blue-400 to-indigo-400 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Privacy <span className="text-blue-800">Policy</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-100">
          We value your privacy and are committed to protecting your personal data. This policy explains what information we collect,
          how we use it, and the choices you have.
        </p>
      </section>

      {/* Main Content */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20 space-y-20">
        {/* Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl md:text-3xl font-bold">1. Information We Collect</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            When you visit our website, we may collect personal details such as your name, email address, and account information,
            as well as non-personal data like your browser type, IP address, and usage behavior. This helps us improve your
            experience and ensure site security.
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-2">
            <li>Information you provide directly (signups, forms, comments).</li>
            <li>Technical data (device, browser, operating system).</li>
            <li>Usage data (pages visited, time spent, clicks).</li>
          </ul>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700" />

        {/* Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
            <h2 className="text-2xl md:text-3xl font-bold">2. How We Use Your Information</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We process your information to deliver high-quality content, maintain security, and keep you updated with the latest
            posts and features. Specifically, your data helps us:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-2">
            <li>Provide access to articles, tutorials, and resources.</li>
            <li>Personalize your experience and recommend relevant content.</li>
            <li>Send newsletters, updates, and announcements (only with your consent).</li>
            <li>Analyze traffic patterns to enhance site performance.</li>
          </ul>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700" />

        {/* Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Cookie className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            <h2 className="text-2xl md:text-3xl font-bold">3. Cookies & Tracking</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We use cookies and similar tracking technologies to understand how you interact with our platform. Cookies help us
            remember your preferences, analyze traffic, and deliver a smoother experience. You may disable cookies through your
            browser settings, but some features may not function properly.
          </p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700" />

        {/* Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <FileEdit className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <h2 className="text-2xl md:text-3xl font-bold">4. Your Rights</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            You have full control over your personal data. This includes the right to access, update, or delete your information,
            as well as the right to withdraw consent at any time. If you wish to exercise these rights, please contact us.
          </p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700" />

        {/* Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <RefreshCcw className="w-8 h-8 text-pink-600 dark:text-pink-400" />
            <h2 className="text-2xl md:text-3xl font-bold">5. Policy Updates</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in practices, legal requirements, or new features.
            All updates will be published on this page with a revised date at the bottom.
          </p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700" />

        {/* Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Mail className="w-8 h-8 text-red-600 dark:text-red-400" />
            <h2 className="text-2xl md:text-3xl font-bold">6. Contact Us</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            If you have any questions about this Privacy Policy or how your information is handled, feel free to reach out to us:
          </p>
          <p className="font-medium text-blue-600 dark:text-blue-400">privacy@devblog.com</p>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Last Updated: October 2025</p>
      </footer>
    </main>
  )
}
