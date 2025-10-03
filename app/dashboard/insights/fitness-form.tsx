"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export default function FitnessForm() {
    const formSchema = z.object({
        "text-input-0": z.string(),
        "email-input-0": z.string(),
        "number-input-0": z.coerce.number().optional(),
        "number-input-1": z.coerce.number().optional(),
        "switch-0": z.boolean(),
        "tel-input-0": z.number(),
        "date-0": z.date().optional(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            "text-input-0": "Ayush " + Date.now(),
            "email-input-0": Date.now() + "@gmail.com",
            "number-input-0": Math.round(Math.random() * 5000 + 5000) / 100 + 100,
            "number-input-1": Math.round(Math.random() * 5000 + 5000) / 100,
            "switch-0": Math.random() < 0.5,
            "tel-input-0": Math.floor(Math.random() * 100000000000) + 60000000000,
            "date-0": "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    function onReset() {
        form.reset();
        form.clearErrors();
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                onReset={onReset}
                className="space-y-8"
            >
                <div className="grid grid-cols-12 gap-4">
                    <FormField
                        control={form.control}
                        name="text-input-0"
                        render={({ field }) => (
                            <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                                <FormLabel className="flex shrink-0">Name</FormLabel>

                                <div className="w-full">
                                    <FormControl>
                                        <div className="relative w-full">
                                            <Input
                                                key="text-input-0"
                                                placeholder=""
                                                type="text"
                                                id="text-input-0"
                                                className=" "
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>

                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email-input-0"
                        render={({ field }) => (
                            <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                                <FormLabel className="flex shrink-0">Email</FormLabel>

                                <div className="w-full">
                                    <FormControl>
                                        <div className="relative w-full">
                                            <Input
                                                key="email-input-0"
                                                placeholder=""
                                                type="email"
                                                id="email-input-0"
                                                className=" "
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>

                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="number-input-0"
                        render={({ field }) => (
                            <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                                <FormLabel className="flex shrink-0">Height in cm</FormLabel>

                                <div className="w-full">
                                    <FormControl>
                                        <div className="relative w-full">
                                            <Input
                                                key="number-input-0"
                                                placeholder=""
                                                type="number"
                                                id="number-input-0"
                                                className=" "
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>

                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="number-input-1"
                        render={({ field }) => (
                            <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                                <FormLabel className="flex shrink-0">Weight in kg</FormLabel>

                                <div className="w-full">
                                    <FormControl>
                                        <div className="relative w-full">
                                            <Input
                                                key="number-input-1"
                                                placeholder=""
                                                type="number"
                                                id="number-input-1"
                                                className=" "
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>

                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="switch-0"
                        render={({ field }) => (
                            <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                                <FormLabel className="hidden shrink-0">Fit</FormLabel>

                                <div className="w-full">
                                    <FormControl>
                                        <FormLabel
                                            key="switch-0"
                                            className="border-0 p-0 w-full flex justify-between items-center has-[[data-state=checked]]:border-primary"
                                            htmlFor="switch-0"
                                        >
                                            <div className="grid gap-1.5 leading-none">
                                                <FormLabel>Fit</FormLabel>
                                                <p className="text-sm text-muted-foreground">
                                                    Are you physically fit?
                                                </p>
                                            </div>
                                            <Switch
                                                id="switch-0"
                                                {...field}
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormLabel>
                                    </FormControl>

                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="tel-input-0"
                        render={({ field }) => (
                            <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                                <FormLabel className="flex shrink-0">Phone Number</FormLabel>

                                <div className="w-full">
                                    <FormControl>
                                        <div className="relative w-full">
                                            <Input
                                                key="tel-input-0"
                                                placeholder=""
                                                type="number"
                                                id="tel-input-0"
                                                className=" "
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>

                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date-0"
                        render={({ field }) => (
                            <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                                <FormLabel className="flex shrink-0">Last Health Checkup</FormLabel>

                                <div className="w-full">
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className="justify-start text-left font-normal w-full"
                                                    id="date-0"
                                                    name=""
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span className="text-muted-foreground">
                                                            Pick a date
                                                        </span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    initialFocus
                                                    onSelect={field.onChange}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>

                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="reset-button-0"
                        render={({ field }) => (
                            <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                                <FormLabel className="hidden shrink-0">Reset</FormLabel>

                                <div className="w-full">
                                    <FormControl>
                                        <Button
                                            key="reset-button-0"
                                            id="reset-button-0"
                                            name=""
                                            className="w-full"
                                            type="reset"
                                            variant="outline"
                                        >
                                            Reset
                                        </Button>
                                    </FormControl>

                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="submit-button-0"
                        render={({ field }) => (
                            <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                                <FormLabel className="hidden shrink-0">Submit</FormLabel>

                                <div className="w-full">
                                    <FormControl>
                                        <Button
                                            key="submit-button-0"
                                            id="submit-button-0"
                                            name=""
                                            className="w-full"
                                            type="submit"
                                            variant="default"
                                        >
                                            Submit
                                        </Button>
                                    </FormControl>

                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    );
}
