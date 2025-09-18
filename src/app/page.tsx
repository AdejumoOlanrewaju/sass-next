import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, User, Search } from "lucide-react"
import Link from "next/link"

// Sample blog posts data (will be replaced with database later)
const featuredPosts = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt:
      "Exploring the latest technologies and methodologies shaping the future of web development, from AI integration to performance optimization.",
    author: "Sarah Chen",
    date: "2024-01-15",
    category: "Technology",
    readTime: "8 min read",
    image: "/development.jpg",
  },
  {
    id: 2,
    title: "Building Sustainable Design Systems",
    excerpt:
      "A comprehensive guide to creating design systems that scale with your organization and stand the test of time.",
    author: "Marcus Rodriguez",
    date: "2024-01-12",
    category: "De",
    readTime: "12 min read",
    image: "/design-components.jpg",
  },
  {
    id: 3,
    title: "The Art of Technical Writing",
    excerpt: "How to communicate complex technical concepts clearly and effectively to diverse audiences.",
    author: "Emily Watson",
    date: "2024-01-10",
    category: "Writing",
    readTime: "6 min read",
    image: "/placeholder.jpg",
  },
]

const recentPosts = [
  {
    id: 4,
    title: "Optimizing React Performance: A Deep Dive",
    author: "David Kim",
    date: "2024-01-08",
    category: "Development",
  },
  {
    id: 5,
    title: "Understanding User Experience Psychology",
    author: "Lisa Park",
    date: "2024-01-05",
    category: "UX Design",
  },
  {
    id: 6,
    title: "The Rise of Edge Computing",
    author: "Alex Thompson",
    date: "2024-01-03",
    category: "Technology",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="font-serif text-2xl font-bold text-primary">
                ModernBlog
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Articles
                </Link>
                <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                  Categories
                </Link>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                Subscribe
              </Button>
              <Button size="sm" className="bg-accent hover:bg-accent/90" asChild>
                <Link href="/login">Admin Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-background to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Insights & Stories for the Modern Mind
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover thoughtful articles on technology, design, and innovation. Join our community of curious minds
              exploring the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Explore Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Subscribe to Newsletter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground">Featured Articles</h2>
            <Button variant="ghost" className="text-accent hover:text-accent/80">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {featuredPosts.map((post, index) => (
              <Card
                key={post.id}
                className={`group cursor-pointer hover:shadow-lg transition-all duration-300 pt-0 ${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
              >
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="space-y-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle
                    className={`font-serif group-hover:text-accent transition-colors ${index === 0 ? "text-2xl" : "text-xl"}`}
                  >
                    {post.title}
                  </CardTitle>
                  <CardDescription className="leading-relaxed">{post.excerpt}</CardDescription>
                  <div className="flex items-center gap-2 pt-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{post.author}</span>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8">Recent Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Card key={post.id} className="group cursor-pointer hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3">
                    {post.category}
                  </Badge>
                  <h3 className="font-serif text-lg font-semibold mb-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl opacity-90 mb-8">
            Get the latest articles and insights delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-foreground bg-background border border-border focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link href="/" className="font-serif text-2xl font-bold text-primary mb-4 block">
                ModernBlog
              </Link>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A sophisticated platform for sharing insights on technology, design, and innovation. Join our community
                of curious minds.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/blog" className="block text-muted-foreground hover:text-foreground transition-colors">
                  All Articles
                </Link>
                <Link
                  href="/categories"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Categories
                </Link>
                <Link href="/about" className="block text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Connect</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Twitter
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  LinkedIn
                </Link>
                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  RSS Feed
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 ModernBlog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
