import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"

const loginSchema = z.object({
  email: z.string().email('E-mail invalide'),
  password: z.string().min(8, 'Mot de passe invalide'),
})

export default function Login() {

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values)
  }

  return (
    <div className="bg-gray-600 rounded-[5px] shadow-lg w-full xs:w-[480px] p-8">
      <div className="flex flex-col items-center">
        <h2 className="mb-2 text-2xl leading-[30px] font-semibold text-center text-gray-130">Ha, te revoilà !</h2>
        <p className="text-base leading-[20px] text-center text-gray-330">Nous sommes si heureux de te revoir !</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1 mb-5">
                <div className="flex gap-2 items-start mb-2">
                  <FormLabel>E-MAIL <span className="text-red-300">*</span></FormLabel>
                  <FormMessage className="-mt-1 -mb-1" />
                </div>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1 mb-11">
                <div className="flex gap-2 items-start mb-2">
                  <FormLabel>MOT DE PASSE <span className="text-red-300">*</span></FormLabel>
                  <FormMessage className="-mt-1 -mb-1" />
                </div>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Connexion</Button>
        </form>
        <div className="flex w-full text-sm gap-2 justify-start mt-3">
          <p className="text-gray-400">Besoin d'un compte ?</p>
          <Link to="/auth/register" className="text-blue-345 hover:underline underline-offset-2 font-medium">
            S'inscrire
          </Link>
        </div>
      </Form>
    </div>
  )
}