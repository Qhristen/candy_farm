"use client";

import Link from "next/link";
import ConnectButton from "./appkit/connect-botton";
import Container from "./container";
import Logo from "./logo";

export function Header() {
  return (
    <div className="fixed w-full z-50">
      <Container>
        <div className="w-full flex items-center py-3 justify-between z-50 bg-black text-white flex-row space-y-2 md:space-y-0">
          <div className="flex-1">
            <Link className="normal-case text-xl" href="/">
             <Logo />
            </Link>
            {/* <ul className="menu menu-horizontal px-1 space-x-2">
            {links.map(({ label, path }) => (
              <li key={path}>
                <Link className={pathname.startsWith(path) ? 'active' : ''} href={path}>
                  {label}
                </Link>
              </li>
            ))}
          </ul> */}
          </div>
          <div className="flex items-center gap-2 space-x-2">
            <ConnectButton />
            {/* <ClusterUiSelect /> */}
            {/* <UserNav /> */}
          </div>
        </div>
      </Container>
    </div>
  );
}
