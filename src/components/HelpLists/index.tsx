import {NavAbout} from "@/components/HelpLists/nav-about.tsx";
import {NavConnect} from "@/components/HelpLists/nav-connect.tsx";

const helpLists = {
    about: [
        { title: "Me", href: "/about", },
        { title: "WebSite", href: "https://github.com/homura0x00/homura0x00.github.io", },
    ],
    connect: [
        { title: "Bilibili", href: "https://space.bilibili.com/37937494", },
        { title: "Github", href: "https://github.com/homura0x00", },
    ]
}

export default function HelpLists() {
    return (
        <div className={"m-2 flex flex-col md:flex-row gap-4"}>
            <NavAbout items={helpLists.about} />
            <NavConnect items={helpLists.connect} />
        </div>
    );
}