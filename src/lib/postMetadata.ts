import { getPostsServer } from "./post";

export const getPostMetadata = async (slug: string) => {
  const posts = await getPostsServer()
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found | TelexBlog",
      description: "The post you're looking for doesn't exist.",
    };
  }

  const ogImageUrl = "https://telexblog.vercel.app/og-image.jpg";

  return {
    title: `${post.title} | TelexBlog`,
    description: post.excerpt || "Explore the latest tech insights on TelexBlog.",
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://telexblog.vercel.app/posts/${slug}`,
      siteName: "TelexBlog",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
    },
  };
}