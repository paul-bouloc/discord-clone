import LoadingPage from "@/components/LoadingPage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthLayout() {

  const navigate = useNavigate();

  const {error, isFetching } = useQuery({
    queryKey: ['AuthLayoutGetUser'],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_API_URL + "/user", {
          withCredentials: true
        })
        .then((res) => {
          navigate('/')
          return res.data
        }),
    retry: false
  })

  if(isFetching) return <LoadingPage/>
  if(error) {    
    return (
      <div className="text-white flex flex-col items-center justify-center w-full h-screen bg-[url('/bg_artwork.svg')] bg-no-repeat bg-cover bg-left-top">
        <img src="/discord_full_white.svg" alt="bg_artwork" className="absolute top-12 left-12 w-[124px] h-[24px]" />
        <Outlet/>
      </div>
    )
	}
}
