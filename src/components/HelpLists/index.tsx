import {NavAbout} from "@/components/HelpLists/nav-about.tsx";
import {NavConnect} from "@/components/HelpLists/nav-connect.tsx";

const helpLists = {
    about: [
        { title: "关于我", href: "/about", },
        { title: "关于站点", href: "/site", },
    ],
    connect: [
        { title: "Bilibili", href: "https://www.bilibili.com", },
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