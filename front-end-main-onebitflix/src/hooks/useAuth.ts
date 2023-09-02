import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getToken } from "../utils/getToken";

export default function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  return { loading };
}
