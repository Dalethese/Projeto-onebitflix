import categoriesService, { CategoryType } from "@/src/services/categoriesService";
import useSWR from "swr";
import SlideCategories from "./SlideCategories";

export default function ListCategories() {
  const { data, error, isLoading } = useSWR(
    "/categories",
    categoriesService.getCategories
  );

  if (error) return <div>Falha ao carregar</div>;
  if (isLoading) return <div>Carregando...</div>;

  return (
    <>
      {data.data.categories?.map((category: CategoryType) => (
        <SlideCategories
          categoryId={category.id}
          categoryName={category.name}
          key={category.id}
        />
      ))}
    </>
  );
}
