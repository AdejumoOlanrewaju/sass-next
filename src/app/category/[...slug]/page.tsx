import CategoryPageUi from "@/app/components/CategoryPageUi";


export default async function CategoryPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const category = (await params).slug.join("").replace(/-/g, " "); // e.g. "ai-ml" → "ai ml"

  return (
            <>
              <CategoryPageUi category={category}/>
            </>
  );
}
