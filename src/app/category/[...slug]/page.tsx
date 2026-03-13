import CategoryPageUi from "@/app/components/CategoryPageUi";


export default async function CategoryPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const category = (await params).slug.join("").replace(/-/g, " ");

  return (
            <>
              <CategoryPageUi category={category}/>
            </>
  );
}
