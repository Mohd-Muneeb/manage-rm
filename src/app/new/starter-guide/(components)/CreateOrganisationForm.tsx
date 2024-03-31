"use client";

import * as React from "react";
import { useState } from "react"; // Import useState hook
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";
import { z } from "zod";
import { type User } from "next-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define Zod schema for the data
const formSchema = z.object({
  name: z.string(),
  desc: z.string(),
});

const CreateOrganisationForm = ({ user }: { user: User }) => {
  const [formData, setFormData] = useState({ name: "", desc: "" });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  if (!user) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      formSchema.parse(formData);
      const response = await fetch("/api/organisation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, id: user.id, domain: user.domain }),
      });
      if (response.ok) {
        redirect("/dashboard");
      } else {
        console.error("Failed to create organisation");
      }
    } catch (error) {
      console.error("Form validation error:", error);
    }
  };

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Organisation</CardTitle>
          <CardDescription>
            Deploy your new organisation in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Name of your project"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="desc">Description</Label>
                <Textarea
                  id="desc"
                  placeholder="Type your message here."
                  value={formData.desc}
                  onChange={(e) =>
                    setFormData({ ...formData, desc: e.target.value })
                  }
                />
              </div>
            </div>
            <Button className="mt-3" type="submit">
              Deploy
            </Button>
          </form>
        </CardContent>
      </Card>{" "}
    </div>
  );
};

export default CreateOrganisationForm;
