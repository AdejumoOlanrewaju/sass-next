"use client"
import React from 'react'
import { Button } from '@/components/ui/button';
import {
  Eye,
  ThumbsUp,
  MessageSquare,
  TrendingUp,
  Users,
  FileText,
  BarChart3,
  Plus,
  Search,
  Bell,
  Settings,
  MoreVertical,
  Edit,
  Trash2,
  ArrowUp,
  Calendar,
  Clock,
  Target,
  Zap,
  Code,
  X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebarToggle } from '@/lib/context/SidebarContext';
const SidebarAdmin = () => {
  const pathName = usePathname()
  const {isOpen, toggleIsOpen} = useSidebarToggle()
  return (
    <div>
      {/* Sidebar Navigation */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 block transition-all duration-300 -translate-x-full z-99 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 relative">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">TelexBlog</h1>
              <p className="text-xs text-slate-500">Admin Dashboard</p>
            </div>

            <button onClick={toggleIsOpen} className='text-black rounded w-9 h-9 flex lg:hidden items-center justify-center bg-gray-100 absolute top-3 right-3'>
              <X className='w-6 h-6'/>
            </button>
          </div>

          <nav className="space-y-1">
            {[
              { icon: BarChart3, label: 'Dashboard', active: true, link: "" },
              { icon: FileText, label: 'Posts', active: false, link: "/posts" },
              { icon: Users, label: 'Users', active: false, link: "/users" },
              { icon: Settings, label: 'Settings', active: false, link: "/settings" },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link key={idx} href={`/admin${item.link}`}>
                  <button

                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${pathName === `/admin${item.link}`
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-600 hover:bg-slate-50'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>

                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5" />
              <span className="font-semibold">Upgrade to Pro</span>
            </div>
            <p className="text-xs text-blue-100 mb-3">Get unlimited posts and advanced analytics</p>
            <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold">
              Upgrade Now
            </Button>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default SidebarAdmin
