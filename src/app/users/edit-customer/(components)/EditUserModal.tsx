"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditIcon, UserPlusIcon } from "lucide-react";
import { Typography } from "~/components/ui/typography";
import { useDisclosure } from "~/hooks/useDisclosure";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { isValidPhoneNumber } from "react-phone-number-input";
import { type Customer, type User } from "@prisma/client";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { PhoneInput } from "~/components/ui/phone-input";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  lastName: z.string(),
  email: z.string().email({
    message: "Email must be a valid email",
  }),
  mobile: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" })
    .or(z.literal("")),
  isEmailSubscribed: z.boolean(),
  isSmsSubscribed: z.boolean(),
});

const EditUserModal = ({
  user,
  customer,
}: {
  user: User | null;
  customer: Customer;
}) => {
  const { close, isOpen, toggle } = useDisclosure();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: customer?.firstName ?? "",
      lastName: customer?.lastName ?? "",
      email: customer?.email ?? "",
      mobile: `+${customer?.countryCode ?? ""}${customer?.mobile ?? ""}` ?? "",
      isEmailSubscribed: customer.isEmailSubscribed,
      isSmsSubscribed: customer.isSmsSubscribed,
    },
  });

  const { formState } = form;

  const isFormDirty = Object.keys(form.formState.dirtyFields).length > 0;

  const getDirtyValues = () => {
    const dirtyValues = {};

    for (const fieldName of Object.keys(formState.dirtyFields)) {
      // console.log(fieldName);
      dirtyValues[fieldName] = form.getValues(fieldName);
    }
    return dirtyValues;
  };

  const handleCustomerFormSubmit = async (
    values: z.infer<typeof formSchema>,
  ) => {
    await fetch("/api/customer", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        ...getDirtyValues(),
        id: customer.id,
      }),
    })
      .then((data) => {
        if (data.status === 200) {
          close();
          toast({
            title: "Uploaded Customer Successfully!",
            description: "Updated new customer in database",
          });
        } else {
          close();
          toast({
            title: "An error occured!",
            description: `An error has occured, status ${data.status}`,
            variant: "destructive",
          });
        }
        return data;
      })
      .catch((err) => {
        close();
        toast({
          title: "An error occured!",
          description: `An error has occured, status ${err}`,
          variant: "destructive",
        });
      });
  };

  return (
    <Dialog modal open={isOpen} onOpenChange={toggle}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="flex items-center gap-2 py-2">
          <EditIcon size={16} />
          <Typography>Edit</Typography>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Edit Customers</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCustomerFormSubmit)}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Smith" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="test@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile</FormLabel>
                  <FormControl>
                    <PhoneInput defaultCountry="IN" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isEmailSubscribed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg py-2">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Allow Emails</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isSmsSubscribed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg pb-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Allow Messages</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="mt-4 flex w-full justify-end gap-2">
              <Button
                onClick={() => {
                  form.resetField("firstName");
                  form.resetField("lastName");
                  form.resetField("email");
                  form.resetField("mobile");
                  close();
                }}
                variant={"outline"}
                type="button"
              >
                Discard
              </Button>
              <Button disabled={!isFormDirty} type="submit">
                Edit Customer
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
