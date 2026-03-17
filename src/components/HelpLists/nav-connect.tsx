import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";

export function NavConnect({
                             items
                         }: {
    items: {
        title: string,
        href: string,
    }[]
}) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className={"font-bold"}>Connect</BreadcrumbItem>
                <BreadcrumbSeparator />
                {items.map(item => (
                    <BreadcrumbItem key={item.title} className={"mr-1"}>
                        <BreadcrumbLink href={item.href} target="_blank">
                            {item.title}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}