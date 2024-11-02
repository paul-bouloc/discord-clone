import AppLayout from "@/pages/app/AppLayout"
import AuthLayout from "@/pages/auth/AuthLayout"
import Login from "@/pages/auth/login/Login"
import Register from "@/pages/auth/register/Register"
import ErrorPage from "@/pages/error/ErrorPage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import AuthProvider from "@/context/AuthContext"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="app"/>
    },
    {
      path: 'app',
      element: <AppLayout/>,
      errorElement: <ErrorPage/>,
      // children: [
      //   {
      //     path: '/',
      //     element: <Home/>
      //   },
      //   {
      //     path: 'room/:roomId',
      //     element: <RoomPage/>
      //   },
      //   {
      //     path: 'profile',
      //     element: <Profile/>
      //   },
      // ]
    },
    {
      path: 'auth',
      element: <AuthLayout/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: 'register',
          element: <Register/>
        },
        {
          path: '',
          element: <Login/>
        }
      ]
    },
  ])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router}/>
          <Toaster/>
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
