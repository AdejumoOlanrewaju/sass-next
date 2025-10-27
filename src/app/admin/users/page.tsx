"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,

  Save,
  X,
  Calendar,
  User,
  Tag,


} from 'lucide-react';
import { getUserInfo } from '@/lib/authService';
import LoadingOverlay from '@/app/components/LoadingOverlay';
import { UserInfoType } from '@/app/types/types';
const page = () => {
  const [userData, setUserData] = useState<UserInfoType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        await getUserInfo((data) => {
          setUserData(data)
        })
      } catch (err) {
        setLoading(false)
        console.log(err)
      } finally {
        setLoading(false)
      }

    }

    fetchUsers()
  }, [])

  console.log(userData)

  if (loading) {
    return <LoadingOverlay />
  }
  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center'>
      {/* Main Content */}
      <div className="lg:ml-64 h-full w-[calc(100%-256px)]">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                User Management
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                All new and existing users
              </p>
            </div>


          </div>
        </header>

        <div className="p-8 bg-slate-50 h-full">
          {/* Posts List */}
          <Card className="border-0 shadow-lg shadow-slate-200/50">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Username</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Email</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Date</th>
                      {/* <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Date</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Views</th>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">Actions</th> */}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {userData.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-10 text-slate-500">
                          No User found.
                        </td>
                      </tr>
                    ) : (userData.map((user, index) => {
                      const userCreatedDate =
                                              typeof user.createdAt === "object" && "toDate" in user.createdAt
                                                ? user.createdAt.toDate()
                                                : new Date(user.createdAt as any); 
                      return (
                        <tr key={index} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-semibold text-slate-900">{user.username}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                              {user.email}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5 text-sm text-slate-600">
                              <Calendar className="w-3.5 h-3.5" />
                              {userCreatedDate.toLocaleDateString()}
                            </div>
                          </td>
                        </tr>
                      )
                    }

                    ))}

                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default page




// ) : (userData.map(({ user, index }: any) => (
//   <tr key={index} className="hover:bg-slate-50 transition-colors">
//     <td className="px-6 py-4">
//       <div>
//         <p className="font-semibold text-slate-900">{user.username}</p>
//       </div>
//     </td>
//     <td className="px-6 py-4">
//       <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
//         {user.email}
//       </span>
//     </td>
//     <td className="px-6 py-4">
//       <div className="flex items-center gap-1.5 text-sm text-slate-600">
//         <Calendar className="w-3.5 h-3.5" />
//         {user.createdAt.toLocaleTimeString()}
//       </div>
//     </td>
//   </tr>
// )))}
{/* <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold">
                              {post.author.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm text-slate-700">{post.author}</span>
                          </div>
                        </td> */}
{/* <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${post.status === 'Published'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                            }`}>
                            {post.status}
                          </span>
                        </td> */}
{/* <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-slate-600">
                        <Eye className="w-3.5 h-3.5" />
                        {post.views?.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                          onClick={() => showEditPostModal(post)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleDeletePost(post.dbID!)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td> */}