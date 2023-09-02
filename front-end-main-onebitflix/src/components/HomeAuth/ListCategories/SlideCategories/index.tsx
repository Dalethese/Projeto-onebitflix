import styles from "@/styles/slideCategory.module.scss";
import useSWR from "swr";
import categoriesService from "@/src/services/categoriesService";
import SlideComponent from "@/src/components/common/SlideComponent";
import SpinnerComponent from "@/src/components/common/Spinner";

interface props {
  categoryId: number;
  categoryName: string;
}

function SlideCategories({ categoryId, categoryName }: props) {
  const { data, error, isLoading } = useSWR(`/categories/${categoryId}`, () => {
    return categoriesService.getCourses(categoryId);
  });

  if (error) return <div>Falha ao carregar</div>;
  if (isLoading) return <SpinnerComponent />;

  return (
    <>
      <p className={styles.titleCategory}> {categoryName} </p>
      <SlideComponent courses={data.data.courses} />
    </>
  );
}

export default SlideCategories;
