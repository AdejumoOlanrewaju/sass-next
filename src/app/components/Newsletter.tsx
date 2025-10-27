"use client"
import React, { useState } from 'react'
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { toast } from "sonner";
const Newsletter = () => {
    const [email, setEmail] = useState('')


    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();

        // Trim spaces
        const trimmedEmail = email.trim();

        // Check if empty
        if (trimmedEmail === "") {
            toast.error("Please enter your email address.");
            return;
        }

        // Validate email format using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        try {
            await addDoc(collection(db, "subscribers"), {
                email: trimmedEmail,
                createdAt: serverTimestamp(),
            });

            setEmail("");
            toast.success("Thanks for subscribing!");
        } catch (error) {
            console.error("Error adding subscriber:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <section className='md:w-[80%]'>
            <div className="bg-linear-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
                <p className="text-blue-100 mb-4 text-sm">Get the latest tech insights delivered to your inbox.</p>
                <div className="space-y-3">
                    <input
                        required
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <button onClick={handleSubscribe} className="w-full bg-white text-blue-600 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                        Subscribe
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Newsletter
