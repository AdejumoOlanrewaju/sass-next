import CategoryPageUi from "@/app/components/CategoryPageUi";
import posts from "@/lib/post";
import Image from "next/image";
import Link from "next/link";

export default async function CategoryPage({ params }: { params: { slug: string[] } }) {
  const category = (await params).slug.join("").replace(/-/g, " "); // e.g. "ai-ml" → "ai ml"

  return (
            <>
              <CategoryPageUi category={category}/>
            </>
  );
}
