"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import { ProductSchema } from "@/schemas";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRef, useTransition } from "react";
import { toastFunction } from "../toastfunction";
import ImageUploader from "./image-uploader";

export function CreateProductForm() {
  const [isPending, startTransition] = useTransition();
  const imageUploaderRef = useRef<any>(null);

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: undefined,
      description: undefined,
      price: undefined,
      images: [],
      stock: 1,
    },
  });

  const onSubmit = async (data: z.infer<typeof ProductSchema>) => {
    startTransition(async () => {
      const status = await imageUploaderRef.current.uploadImage();
      console.log("status", status.uploadUrls);

      if (status && status.error) {
        toastFunction(status.error, "destructive");
        return;
      }

      data.images = status.uploadUrls; // Extend the data with image URLs

      axios
        .post("/api/product", data)
        .then(async ({ data }) => {
          if (data.success) {
            toastFunction(data.success, "success");
          } else {
            toastFunction(data.error, "destructive");
          }

          form.reset();
        })
        .catch((error) => {
          toastFunction("Request failed! An error occurred.", "destructive");
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Set a name"
                  {...field}
                  disabled={isPending}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>Set a product name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Set a description"
                  {...field}
                  disabled={isPending}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>Set a product description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Set a price"
                  {...field}
                  disabled={isPending}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>Set a price.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input
                  placeholder="Set a stock"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormDescription>Set stock amount.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Upload Image</FormLabel>
          <FormControl>
            <ImageUploader ref={imageUploaderRef} form={form} />
          </FormControl>
          <FormDescription>
            A maximum of 4 images can be uploaded.
          </FormDescription>
        </FormItem>

        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Product
        </Button>
      </form>
    </Form>
  );
}
