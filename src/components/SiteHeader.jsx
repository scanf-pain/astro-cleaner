import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import AstroLogo from "../icons/AstroLogo.jsx";
import { useState } from "react";
import PropTypes from "prop-types";
import Link from "./Link.jsx";

const links = [
  {
    name: "Home",
    desc: "homepage",
    href: "/",
    outside: false,
  },
  {
    name: "How to use",
    desc: "Quickstart guide",
    href: "/quickstart",
    outside: false,
  },
  {
    name: "About",
    desc: "about Astro Cleaner",
    href: "/about",
    outside: false,
  },
  {
    name: "App",
    desc: "to app",
    href: "/app",
    outside: false,
  },
  {
    name: "GitHub",
    desc: "Project's GitHub page",
    href: "https://github.com/scanf-pain/astro-cleaner",
    outside: true,
  },
];

const SiteHeader = ({
  childrenCenter,
  childrenEnd,
  childrenMenu,
  className,
  ...props
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Navbar
      isBordered={true}
      className={twMerge("bg-content2", className)}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      {...props}
    >
      <NavbarContent justify={"start"} className={"md:hidden"}>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className={"pr-2"} justify={"center"}>
        <NavbarBrand>
          <Link href="/" className={"text-white hover:no-underline"}>
            <AstroLogo className={"size-8"} />
            <p className="pl-2 text-2xl">ASTROCLEANER</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {childrenCenter}

      {/*Links for desktop*/}
      <NavbarContent justify={"end"} className={"flex-end hidden md:flex"}>
        {links.map((link, index) => (
          <NavbarItem key={index} className={"hidden md:inline"}>
            <Link
              href={link.href}
              title={link.desc}
              className={"text-foreground hover:text-primary"}
              isExternal={link.outside}
            >
              {link.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {childrenEnd}

      <NavbarMenu className={"bg-content1/80"}>
        {childrenMenu}
        {links.map((link, index) => (
          <NavbarMenuItem
            key={index}
            className={"flex flex-col"}
            onClick={() => setIsMenuOpen(false)}
          >
            <Link
              className={
                "flex justify-center p-4 text-3xl text-foreground hover:text-primary"
              }
              href={link.href}
              title={link.desc}
              isExternal={link.outside}
            >
              <p>{link.name}</p>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

SiteHeader.propTypes = {
  childrenCenter: PropTypes.node,
  childrenEnd: PropTypes.node,
  childrenMenu: PropTypes.node,
  className: PropTypes.string,
};
export default SiteHeader;
