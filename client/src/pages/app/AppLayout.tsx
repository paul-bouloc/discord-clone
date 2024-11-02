import LoadingPage from "@/components/LoadingPage";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function AppLayout() {
	const { setUser } = useAuth();
	const navigate = useNavigate();

	const { data, isFetching } = useQuery({
		queryKey: ["AppLayoutGetUser"],
		queryFn: () =>
			axios
				.get(import.meta.env.VITE_API_URL + "user", {
					withCredentials: true,
				})
				.then((res) => {
					setUser(res.data);
					return res.data;
				})
				.catch(() => {
					navigate("/auth");
					return null;
				}),
		retry: false,
	});

	if (isFetching) return <LoadingPage />;

	if (!data) return <Navigate to="/auth" />;

  return(
    <>
      <div className="flex w-full h-screen overflow-hidden flex-nowrap text-sky-950">
        coucou
      </div>
    </>
  )
}
