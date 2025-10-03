"use client";

import { useState } from "react";
import { User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
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
import { updateUserName, updateUserImage } from "./profile-edit";

export default function Component({
    imageURL,
    userName,
    userEmail,
}: {
    imageURL: string | null | undefined;
    userName: string;
    userEmail: string;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit profile</Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-sm [&>button:last-child]:top-3.5">
                <DialogHeader className="contents space-y-0 text-left">
                    <DialogTitle className="border-b px-6 py-4 text-base">
                        Edit profile
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="sr-only">
                    Make changes to your profile here. You can change your photo and set a username.
                </DialogDescription>
                <div className="overflow-y-auto pt-4">
                    <div className="px-6 pt-4 pb-6">
                        <ProfileForm
                            userEmail={userEmail}
                            userName={userName}
                            imageURL={imageURL}
                        />
                    </div>
                </div>
                <DialogFooter className="border-t px-6 py-4">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="submit" form="profile-form">
                            Save changes
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

const formSchema = z.object({
    name: z.string().min(1, { message: "Name cannot be empty." }),
    email: z.string().email(),
    imageFile: z.instanceof(File).optional(),
});

export function ProfileForm({
    imageURL,
    userName,
    userEmail,
}: {
    imageURL: string | null | undefined;
    userName: string;
    userEmail: string;
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: userName,
            email: userEmail,
        },
    });

    const [base64String, setBase64String] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64String(reader.result as string);
                form.setValue("imageFile", file);
            };
            reader.readAsDataURL(file);
        }
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.name !== userName) {
            await updateUserName(userEmail, values.name);
        }

        if (base64String) {
            await updateUserImage(userEmail, base64String);
        }
    }

    return (
        <Form {...form}>
            <form
                id="profile-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 @container"
            >
                <div className="w-full flex justify-center">
                    {base64String ? (
                        <Image
                            src={base64String}
                            className="object-cover size-40 rounded-full"
                            width={160}
                            height={160}
                            alt="Profile image preview"
                        />
                    ) : imageURL ? (
                        <Image
                            src={imageURL}
                            className="object-cover size-40 rounded-full"
                            width={160}
                            height={160}
                            alt="Current profile image"
                        />
                    ) : (
                        <User2 className="size-40 text-gray-400" />
                    )}
                </div>

                <div className="grid grid-cols-12 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                                <FormLabel className="flex shrink-0">Name</FormLabel>
                                <div className="w-full">
                                    <FormControl>
                                        <Input
                                            type="text"
                                            className=""
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                                <FormLabel className="flex shrink-0">Email</FormLabel>
                                <div className="w-full">
                                    <FormControl>
                                        <Input
                                            type="email"
                                            disabled
                                            className=""
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="imageFile"
                        render={({ field: { value, onChange, ...fieldProps } }) => (
                            <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                                <FormLabel className="flex shrink-0">Change Profile</FormLabel>
                                <div className="w-full">
                                    <FormControl>
                                        <Input
                                            {...fieldProps}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
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