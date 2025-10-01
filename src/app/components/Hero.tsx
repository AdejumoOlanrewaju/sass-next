import React from 'react'
// import { useState } from 'react';
import { Search, Menu, X, Calendar, Clock, ArrowRight, Github, Twitter, Linkedin, Mail, Tag, TrendingUp, Code, Database, Cpu } from 'lucide-react';
import FeaturedPost from './FeaturedPost';
import PostCategory from './PostCategory';


const Hero = () => {

    return (
        <section >
            <div className=" px-2 sm:px-6 lg:px-0 py-2">
               <FeaturedPost/>
            </div>
        </section>
    )
}

export default Hero
