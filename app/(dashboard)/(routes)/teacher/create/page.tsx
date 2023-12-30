"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Назва є обов'язковим полем",
  }),
});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${response.data.id}`);
      toast.success("Курс створено!");
    } catch {
      toast.error("Ой!😯 Щось пішло не так");
    }
  }

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">
          Назвіть ваш курс
        </h1>
        <p className="text-sm text-slate-600">
          Як би ви хотіли назвати ваш курс? Не хвилюйтесь, ви можете звінити це в майбутньому.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Назва курсу
                  </FormLabel>
                  <FormControl>
                    <Input
                    className="rounded-full bg-white-100 focus-visible:ring-violet-500"
                      disabled={isSubmitting}
                      placeholder="приклад: Професійна Веб розробка"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Чому ви будете навчати в цьому курсі?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button
                  type="button"
                  variant="ghost"
                >
                  Відмінити
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="enabled:bg-zinc-900"
              >
                Продовжити
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
   );
}

export default CreatePage;