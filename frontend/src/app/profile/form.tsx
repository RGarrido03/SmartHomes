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
import { useCookies } from "next-client-cookies";
import { User } from "../login/user";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username is mandatory.",
  }),
  name: z.string().min(1, {
    message: "Name is mandatory.",
  }),
  email: z.string().email({
    message: "Enter a valid e-mail address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export function ProfileForm() {
  const { toast } = useToast();
  const cookies = useCookies();
  const user: User = JSON.parse(cookies.get("currentUser") ?? "");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username,
      name: user.name,
      email: user.email,
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await fetch(
      `http://${process.env.NEXT_PUBLIC_HOST_URL}/api/clients/${user.id}`,
      {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      },
    );
    if (result.status === 200) {
      user.name = values.name;
      user.username = values.username;
      user.email = values.email;
      cookies.set("currentUser", JSON.stringify(user));
      toast({
        title: "Success!",
        description: "We updated your profile.",
      });
    } else {
      toast({
        title: "Error logging in.",
        description: "User is already registered.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
