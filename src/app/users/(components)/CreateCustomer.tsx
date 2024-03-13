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
import { UserPlusIcon } from "lucide-react";
import { Typography } from "~/components/ui/typography";
import { useDisclosure } from "~/hooks/useDisclosure";
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
import { type User } from "@prisma/client";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  lastName: z.string(),
  email: z.string().email({
    message: "Email must be a valid email",
  }),
  mobile: z.string(),
});

const CreateCustomer = ({ user }: { user: User | null }) => {
  const { close, isOpen, toggle } = useDisclosure();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
    },
  });

  const handleCustomerFormSubmit = async (
    values: z.infer<typeof formSchema>,
  ) => {
    console.log(values);

    await fetch("/api/customer/add-via-form", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        ...values,
        userId: user?.id,
        location: user?.location,
        organisationId: user?.organisationId,
      }),
    })
      .then((data) => {
        console.log("asdfasdfasd");
        if (data.status === 200) {
          toast({
            title: "Uploaded Customer Successfully!",
            description: "Updated new customer in database",
          });
        } else {
          toast({
            title: "An error occured!",
            description: `An error has occured, status ${data.status}`,
            variant: "destructive",
          });
        }
        return data;
      })
      .catch((err) => {
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
        <Button className="flex items-center gap-2">
          <UserPlusIcon size={16} />
          <Typography>{"Create"}</Typography>{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Add Customers</DialogTitle>
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
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
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
                type="button"
              >
                Discard
              </Button>
              <Button type="submit">Create Customer</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCustomer;
