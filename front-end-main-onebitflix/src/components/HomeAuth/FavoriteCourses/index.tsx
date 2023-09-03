import useSWR from "swr";
import courseService from "@/src/services/courseServices";
import SlideComponent from "../../common/SlideComponent";
import styles from "../../../../styles/slideCategory.module.scss";
import SpinnerComponent from "../../common/Spinner";

interface FavoriteCoursesProps {}

function FavoriteCourses() {
  const { data, error, isLoading } = useSWR("/favorites", courseService.getFav);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <SpinnerComponent />;

  return (
    <>
      <h2 className={styles.titleCategory}>Favoritos</h2>

      {data.data.courses.length >= 1 ? (
        <SlideComponent courses={data.data.courses} />
      ) : (
        <p className="h5 text-center pt-3">
          <strong>Você não tem nenhum curso favoritado</strong>
        </p>
      )}
    </>
  );
}

export default FavoriteCourses;
