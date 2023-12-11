"use client";

import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

const formSchema = z.object({
  email: z.string().email({
    message: "Enter a valid e-mail address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const cookies = useCookies();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await fetch(
      `http://${process.env.NEXT_PUBLIC_HOST_URL}/api/authentication/login`,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (result.status === 200) {
      const currentUser = await result.json();
      cookies.set("currentUser", JSON.stringify(currentUser));
      router.push("/insight");
    } else {
      toast({
        title: "Error logging in.",
        description: "Invalid credentials.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-3 space-y-2">
          <Button type="submit" className="font-bold">
            Login
          </Button>
          <Link href="/register" className="!m-0">
            <Button variant="secondary" type="submit" className="font-semibold">
              Register
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
}
