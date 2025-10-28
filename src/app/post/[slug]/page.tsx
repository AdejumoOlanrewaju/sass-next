import React from "react";
import PostDetail from "@/app/components/PostDetail";
import type { Metadata } from "next";
import { ResolvingMetadata } from "next";
import posts from "@/lib/post";
// export const metadataBase = new URL("https://telexblog.vercel.app");

// 🧠 Generate SEO metadata dynamically
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }>}
): Promise<any> {
  console.log(posts)
  const slugVar =  (await params).slug
  const post = posts.find((p) => p.slug === slugVar);

  if (!post) {
    return {
      title: "Post Not Found | TelexBlog",
      description: "The post you’re looking for doesn’t exist.",
    };
  }

  const ogImageUrl = "https://telexblog.vercel.app/og-image.jpg";

  return {
    title: `${post.title} | TelexBlog`,
    description: post.excerpt || "Explore the latest tech insights on TelexBlog.",
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://telexblog.vercel.app/posts/${slugVar}`,
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

// 🧩 Post page
const Post =  async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <>
      <PostDetail paramSlug={slug} />
    </>
  );
};

export default Post;
