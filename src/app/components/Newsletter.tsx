import React from 'react'

const Newsletter = () => {
    return (
        <section className='md:w-[80%]'>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
                <p className="text-blue-100 mb-4 text-sm">Get the latest tech insights delivered to your inbox.</p>
                <div className="space-y-3">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                        Subscribe
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Newsletter
