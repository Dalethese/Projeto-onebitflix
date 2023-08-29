import FeaturedSection from "@/src/components/HomeAuth/FeaturedSection";
import HeaderAuth from "@/src/components/common/headerAuth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function HomeAuth() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("onebitflix-token")) {
      router.push("/home");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <FeaturedSection />
      </main>
    </>
  );
}
