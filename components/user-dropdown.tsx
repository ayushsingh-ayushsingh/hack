import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Loader2, User2 } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";
import LogoutButton from "@/components/layouts/logout-button";
import EditProfile from "@/components/edit-profile";

export async function AvatarComponent() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/login")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent rounded-full cursor-pointer">
          <div>
            {
              session ?
                <Avatar className="size-8">
                  {
                    session?.user?.image ?
                      <AvatarImage
                        src={session.user.image}
                        width={32}
                        height={32}
                        className="object-cover"
                        alt="Profile image"
                      />
                      :
                      <AvatarFallback>
                        <User2 />
                      </AvatarFallback>
                  }
                </Avatar>
                :
                <Button className="rounded-full hidden sm:inline-flex" asChild>
                  <Link href={"/signup"}>
                    Sign In
                  </Link>
                </Button>
            }
          </div></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground">
            {
              session.user.name
            }
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {
              session.user.email
            }
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <EditProfile
              imageURL={session.user.image}
              userEmail={session.user.email}
              userName={session.user.name}
              className="w-full"
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutButton className="w-full" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function UserDropdown() {
  return (
    <Suspense fallback={
      <div>
        <Loader2 className="animate-spin size-8" />
      </div>
    }>
      <AvatarComponent />
    </Suspense >
  );
}
