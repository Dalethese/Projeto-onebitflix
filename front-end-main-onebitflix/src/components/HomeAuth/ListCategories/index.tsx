import categoriesService, { CategoryType } from "@/src/services/categoriesService";
import useSWR from "swr";
import SlideCategories from "./SlideCategories";
import SpinnerComponent from "../../common/Spinner";

export default function ListCategories() {
  const { data, error, isLoading } = useSWR(
    "/categories",
    categoriesService.getCategories
  );

  if (error) return <div>Falha ao carregar</div>;
  if (isLoading) return <SpinnerComponent />;

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
