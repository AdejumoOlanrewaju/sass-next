import React from "react";
import PostDetail from "@/app/components/PostDetail";
import type { Metadata } from "next";
import { getPostMetadata } from "@/lib/postMetadata";
// export const metadataBase = new URL("https://telexblog.vercel.app");

// 🧠 Generate SEO metadata dynamically
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }>}
): Promise<Metadata> {

  const slugVar =  (await params).slug
  return getPostMetadata(slugVar)
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
