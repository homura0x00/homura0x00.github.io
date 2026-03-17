import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function MyAvatar({ uri, title }: { uri: string, title: string}) {
  return (
    <Avatar>
      <AvatarImage
        src={uri}
        alt={title}
      />
      <AvatarFallback>{title}</AvatarFallback>
    </Avatar>
  )
}
