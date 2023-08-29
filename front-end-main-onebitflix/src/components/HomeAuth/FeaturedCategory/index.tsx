import styles from "../../../../styles/slideCategory.module.scss";
import useSWR from "swr";
import courseService from "@/src/services/courseServices";
import SlideComponent from "../../common/SlideComponent";

export default function FeaturedCategory() {
  const { data, error, isLoading } = useSWR("/featured", courseService.getFeatured);

  if (error) {
    console.log(error);
    return <div>Failed to load</div>;
  }
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <h2 className={styles.titleCategory}>EM DESTAQUE</h2>
      <SlideComponent courses={data.data} />
    </>
  );
}
