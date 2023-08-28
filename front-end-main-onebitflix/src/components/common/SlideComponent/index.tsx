import { CourseType } from "@/src/services/courseServices";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import SlideCard from "../SlideCard";
import { useEffect } from "react";

interface props {
  courses: CourseType[];
}

export default function SlideComponent({ courses }: props) {
  let slideCount = 0;

  if (courses.length > 4) {
    slideCount = 4;
  } else {
    slideCount = courses.length;
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center py-4">
        <Splide
          options={{
            type: "loop",
            perPage: slideCount,
            perMove: 1,
            width: slideCount * 300,
            pagination: false,
            arrows: courses.length > 4 ? true : false,
            drag: courses.length > 4 ? true : false,
            breakpoints: {
              1210: {
                perPage: slideCount >= 2 ? 2 : 1,
                width: slideCount >= 2 ? 600 : 300,
                arrows: slideCount > 2 ? true : false,
                drag: slideCount > 2 ? true : false,
              },
              610: {
                perPage: 1,
                width: 300,
                arrows: slideCount > 1 ? true : false,
                drag: slideCount > 1 ? true : false,
              },
              300: {
                perPage: 1,
                width: 250,
              },
            },
          }}
        >
          {courses?.map((course) => (
            <SplideSlide key={course.id}>
              <SlideCard course={course} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </>
  );
}
