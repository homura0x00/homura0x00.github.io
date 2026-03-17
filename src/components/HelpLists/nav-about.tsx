import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";

export function NavAbout({
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
                <BreadcrumbItem className={"font-bold"}>About</BreadcrumbItem>
                <BreadcrumbSeparator />
                {items.map(item => (
                    <BreadcrumbItem key={item.title} className={"mr-1"}>
                        <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}