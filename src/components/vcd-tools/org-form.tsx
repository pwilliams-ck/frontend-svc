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
import { createVCDOrg } from "@/app/actions/create-org";

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Username must be at least 1 character.",
  }),
});

export const OrgForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form submitted with data:", data); // Debug log

    try {
      const result = await createVCDOrg(data);

      if (result?.success) {
        toast.success("Organization created successfully", {
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
        <CardTitle>Create organization</CardTitle>
        <CardDescription>
          Deploy an organization for creating virtual data centers in one-click.
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
                    This will{" "}
                    <span className="text-emerald-800 font-extrabold">
                      CREATE
                    </span>{" "}
                    the given organization name.
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
