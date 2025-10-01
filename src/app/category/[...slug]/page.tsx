import posts from "@/lib/post";

export default function CategoryPage({ params }: { params: { slug: string[] } }) {
  const category = params.slug.join(" ");
  const filteredPosts =
    category.toLowerCase() === "all"
      ? posts
      : posts.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase()
        );

  return (
    <section className="mt-10 w-full">
      <h1 className="text-2xl font-bold mb-6">
        Posts in {category}
      </h1>
      <div className="grid gap-6">
        {filteredPosts.map((post, index) => (
          <article key={index} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold">
              {post.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
