"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { deleteOrganization } from "@/app/actions/delete-org";
import { createProviderSession } from "@/app/actions/get-session";

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Username must be at least 1 character.",
  }),
});

export const DeleteOrgForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form submitted with data:", data); // Debug log

    try {
      const token = await createProviderSession();

      const result = await deleteOrganization(data, token);

      if (result?.success) {
        toast.success("Organization deleted successfully", {
          description: `Organization ${data.name} has been created`, // Use data.name instead of name
          action: {
            label: "Dismiss",
            onClick: () => console.log("dismissed"),
          },
        });
      } else {
        console.error("Server action failed:", result?.error); // Debug log
        toast.error("Failed to create organization", {
          description: result?.error || "No error message provided",
        });
      }
    } catch (error) {
      console.error("Caught error:", error); // Debug log
      toast.error("An error occurred", {
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  }

  return (
    <Card className="relative w-[400px] bg-white/45 dark:bg-black/45 shadow-md">
      <CardHeader>
        <CardTitle>Delete organization</CardTitle>
        <CardDescription>
          Delete an organization, this is for a testing demo in the CloudKey
          Platform dev environment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Organization" {...field} />
                  </FormControl>
                  <FormDescription>
                    <span className="font-extrabold">WARNING!</span> This will{" "}
                    <span className="text-pink-800 font-extrabold">DELETE</span>{" "}
                    the given organization.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
