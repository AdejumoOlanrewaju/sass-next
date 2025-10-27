import React from "react";
import posts from "@/lib/post";
import PostDetail from "@/app/components/PostDetail";
import type { Metadata } from "next";

export const metadataBase = new URL("https://telexblog.vercel.app");

// 🧠 Generate SEO metadata dynamically
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = posts.find((p) => p.slug === params.slug);

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
      url: `https://telexblog.vercel.app/posts/${params.slug}`,
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
const Post = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  return (
    <>
      <PostDetail paramSlug={slug} />
    </>
  );
};

export default Post;
