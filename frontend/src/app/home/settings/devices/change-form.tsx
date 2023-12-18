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
import { DialogFooter } from "@/components/ui/dialog";
import { User } from "@/app/login/user";
import { Dispatch, SetStateAction } from "react";
import { Device } from "../../devices/page";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deviceTypes } from "../../devices/types";

const formSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  houseArea: z.string().min(1),
});

type ChangeHouseFormProps = {
  currentData: Device;
  setOpenChangeModal: Dispatch<SetStateAction<boolean>>;
};

export function ChangeDeviceForm({
  currentData,
  setOpenChangeModal,
}: ChangeHouseFormProps) {
  const { toast } = useToast();
  const cookies = useCookies();
  const user: User = JSON.parse(cookies.get("currentUser") ?? "");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentData.name,
      type: currentData.type,
      houseArea: currentData.houseArea,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await fetch(
      `http://${process.env.NEXT_PUBLIC_HOST_URL}/api/devices/${currentData.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          house: {
            houseId: cookies.get("house"),
          },
          name: values.name,
          type: values.type,
          houseArea: values.houseArea,
          turnedOn: currentData.on
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      },
    );
    if (result.status === 200) {
      setOpenChangeModal(false);
    } else {
      toast({
        title: "Error creating house.",
        description: "Internal server error.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 py-4">
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(deviceTypes).map(([k, v]) => (
                      <SelectItem key={k} value={k}>
                        {v.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="houseArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>House area</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
