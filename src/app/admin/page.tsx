"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Menu
} from 'lucide-react';
import { usePostStore } from '@/store/PostStore';
import { toDate } from "date-fns"
import { useActivitiesStore } from '@/store/ActivitiesStore';
import LoadingOverlay from '../components/LoadingOverlay';
import { getEngagementRate, getPostLikes, getSubscribers } from '@/lib/postDataService';
import { getComments } from '@/lib/commentService';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { logoutAdmin } from '@/lib/authService';
import useAdminAuthGuard from '@/lib/hooks/useAdminAuthGuard';
import { useSidebarToggle } from '@/lib/context/SidebarContext';
export default function Page() {
  const [subscribers, setSubsribers] = useState<any>([])
  const [engagementRate, setEngagementRate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [engagementData, setEngagementData] = useState<{ [key: string]: { likes: number; comments?: number } }>({});
  const { storePostData, loading } = usePostStore()
  const { storeActivitiesData } = useActivitiesStore()
  const { authLoading, isAdmin } = useAdminAuthGuard()
  const { toggleIsOpen } = useSidebarToggle()
  const router = useRouter()

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",  // e.g. Friday
    year: "numeric",  // e.g. 2025
    month: "long",    // e.g. October
    day: "numeric",   // e.g. 17
  });


  const recentPosts = [...storePostData]
    .sort((a, b) => {
      const getDate = (val: any) => {
        if (!val) return new Date(0); // fallback for missing date
        if (val instanceof Date) return val;
        if (val?.toDate) return val.toDate(); // Firestore Timestamp
        return new Date(val); // string or number
      };

      const aDate = getDate(a.createdAt);
      const bDate = getDate(b.createdAt);

      return bDate.getTime() - aDate.getTime();
    })
    .slice(0, 5);

  useEffect(() => {
    const fetchSubscribers = () => {
      getSubscribers((data: any[]) => {
        return setSubsribers(data);
      })
    }

    fetchSubscribers()
  }, [])

  useEffect(() => {
    (async () => {
      const engagement = await getEngagementRate();
      setEngagementRate(parseFloat(engagement!));
      setIsLoading(false);
    })();
  }, []);


  useEffect(() => {
    if (!recentPosts.length) return;

    const fetchEngagementData = async () => {
      const data: Record<string, { likes: number; comments?: number }> = {};
      let commentCount: any = null
      for (const post of recentPosts) {

        const [likes, comments] = await Promise.all([
          getPostLikes(post.dbID!),
          getComments(post.dbID!, (data => {
            commentCount = data.length
          })),
        ]);


        data[post.dbID!] = { likes, comments: commentCount };
      }
      setEngagementData(data);
    };



    fetchEngagementData();
  }, [recentPosts]);



  if (loading || authLoading || storePostData.length === 0) {
    return <LoadingOverlay />
  }

  if (!isAdmin) {
    router.push("/admin/login")
  }
  // Sort by views in descending order
  const topPosts = [...storePostData]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 3); // top 5 posts

  const stats = [
    {
      label: 'Total Views',
      value: storePostData.reduce((sum, posts) => sum + (posts.views || 0), 0),
      change: '+12.5%',
      icon: Eye,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      label: 'Total Posts',
      value: storePostData.length,
      change: '+8 this week',
      icon: FileText,
      gradient: 'from-violet-500 to-purple-500',
      bgGradient: 'from-violet-50 to-purple-50'
    },
    {
      label: 'Subscribers',
      value: subscribers.length,
      change: '+324 this month',
      icon: Users,
      gradient: 'from-emerald-500 to-green-500',
      bgGradient: 'from-emerald-50 to-green-50'
    },
    {
      label: 'Engagement',
      value: `${engagementRate}%`,
      change: '+2.1%',
      icon: TrendingUp,
      gradient: 'from-orange-500 to-amber-500',
      bgGradient: 'from-orange-50 to-amber-50'
    },
  ];

  const handleLogout = async () => {
    try {
      await logoutAdmin()
      router.push("/admin/login")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-white via-white/50 to-gray-50">


      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
          <div className="flex flex-wrap gap-3 items-center justify-between px-5 sm:px-8 py-4">
            <div className="flex items-center gap-4">
              <button onClick={toggleIsOpen} className='flex lg:hidden text-black w-9 h-9 bg-gray-300 items-center justify-center rounded'>
                <Menu />
              </button>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Dashboard</h2>
                <p className="text-sm text-slate-500 flex items-center gap-2 mt-0.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className='truncate max-w-[150px]'>
                    {formattedDate}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* <div className="relative hidden md:block">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search anything..."
                  className="pl-10 w-80 bg-slate-50/80 border-slate-200 focus:bg-white transition-colors"
                />
              </div> */}
              {/* <Button variant="outline" size="icon" className="relative border-slate-200 hover:bg-slate-50">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              </Button> */}
              <Button variant="outline" className='text-black' onClick={handleLogout}>
                Logout
              </Button>

              <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-semibold text-slate-900">Admin User</p>
                  <p className="text-xs text-slate-500">admin@blog.com</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold shadow-lg shadow-blue-500/30">
                  AU
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-5 sm:p-8 bg-slate-50">
          {/* Welcome Section */}
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Admin 👋</h3>
            <p className="text-slate-600">Here's what's happening with your blog today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Card key={idx} className="relative border-0 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-50`}></div>
                  <CardContent className="p-6 relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                        <ArrowUp className="w-3.5 h-3.5" />
                        <span className="text-sm font-semibold">{stat.change}</span>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                    <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Posts */}
            <Card className="lg:col-span-2 border-0 shadow-xs shadow-blue-50/">
              <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-slate-100">
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900">Recent Posts</CardTitle>
                  <CardDescription className="text-slate-500 mt-1">Manage and monitor your content</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {recentPosts
                    .map((post) => (
                      <div key={post.dbID} className="group p-5 rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-white to-slate-50/50">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{post.title}</h4>
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                              <span className={`px-3 py-1 rounded-full font-semibold ${post.status === 'Published'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-amber-100 text-amber-700'
                                }`}>
                                {post.status}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {post.date}
                              </span>
                              <span>by {post.author}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                              <Eye className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="font-medium">{post.views?.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                              <ThumbsUp className="w-4 h-4 text-red-600" />
                            </div>
                            <span className="font-medium">{engagementData[post.dbID!]?.likes ?? 0}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                              <MessageSquare className="w-4 h-4 text-purple-600" />
                            </div>
                            <span className="font-medium">{engagementData[post.dbID!]?.comments ?? 0}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Top Performing */}
              <Card className="border-0 shadow-xs shadow-blue-50/ overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50 opacity-60"></div>
                <CardHeader className="relative border-b border-slate-100 pb-4">
                  <CardTitle className="text-xl font-bold text-slate-900">Top Performing</CardTitle>
                  <CardDescription className="text-slate-500">Most viewed this week</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 relative space-y-4">
                  {
                    topPosts.map((item, index) => (
                      <div key={item.dbID} className="flex items-center gap-4 p-3 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900 leading-tight mb-1">{item.title}</p>
                          <p className="text-xs text-slate-500 font-medium">{item.views} views</p>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-0 shadow-xs shadow-blue-50/">
                <CardHeader className="border-b border-slate-100 pb-4">
                  <CardTitle className="text-xl font-bold text-slate-900">Recent Activity</CardTitle>
                  <CardDescription className="text-slate-500">Latest updates</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {storeActivitiesData.map((activity, idx) => {
                      const activityDate =
                        typeof activity.time === "object" && "toDate" in activity.time
                          ? activity.time.toDate()
                          : new Date(activity.time as any);

                      return (
                        <div key={idx} className="flex gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                          <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === "comment_added" ? 'bg-blue-500' :
                            activity.type === "post_published" ? 'bg-green-500' : 'bg-purple-500'
                            }`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">{`${activity.title} "${activity.message}"`}</p>
                            <p className="text-xs text-slate-500 mt-1">{activityDate.toLocaleString()}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}