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

const registerSchema = z.object({
  email: z.string().email('E-mail invalide'),
  username: z.string().min(3, 'Nom d\'utilisateur invalide'),
  password: z.string().min(8, 'Mot de passe invalide'),
})


export default function Register() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof registerSchema>) {
    console.log(values)
  }

  return (
    <div className="bg-gray-600 rounded-[5px] shadow-lg w-full xs:w-[480px] p-8">
      <div className="flex flex-col items-center">
        <h2 className="mb-2 text-2xl leading-[30px] font-semibold text-center text-gray-130">Créer un compte</h2>
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
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-1 mb-5">
                <div className="flex gap-2 items-start mb-2">
                  <FormLabel>NOM D'UTILISATEUR <span className="text-red-300">*</span></FormLabel>
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
          <Link to="/auth" className="text-blue-345 hover:underline underline-offset-2 font-medium">
            Tu as déjà un compte ?
          </Link>
        </div>
      </Form>
    </div>
  )
}