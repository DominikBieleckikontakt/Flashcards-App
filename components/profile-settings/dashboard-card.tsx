import React, { ReactElement, cloneElement } from "react";
import Link from "next/link";
import Card from "../ui/card";

export type DashboardCardProps = {
  href: string;
  children: React.ReactNode;
  icon: ReactElement<SVGElement>;
};

const DashboardCard = ({ href, children, icon }: DashboardCardProps) => {
  return (
    <Link href={href} className="rounded-md hover:shadow-sm duration-300">
      <Card classNames="w-full justify-self-center relative overflow-hidden min-h-48 hover:border-primary duration-300">
        {children}
        {cloneElement(icon, {
          className:
            "absolute text-primary size-64 -bottom-8 -right-24 opacity-10 " +
            (icon.props.className || ""),
        })}
      </Card>
    </Link>
  );
};

export default DashboardCard;
