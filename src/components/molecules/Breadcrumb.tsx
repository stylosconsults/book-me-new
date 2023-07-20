import React, { Fragment } from "react";

import Link from "next/link";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import Button from "../atoms/Button";

interface BreadcrumbProps {
  noBackHomeBtn?: boolean;
  fullLocation: Array<{
    name: string;
    link: string;
  }>;
}
export default function Breadcrumb({
  fullLocation,
  noBackHomeBtn = false,
}: BreadcrumbProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          {!noBackHomeBtn && (
            <Link href="/">
              <Button icon={<RxCaretLeft size={20} />}>Back home</Button>
            </Link>
          )}
        </div>
        <div className="flex items-center">
          <Link href="/" className="text-gray-400 hover:text-gray-500">
            Home
          </Link>
          {fullLocation?.map(({ link, name }, index) => (
            <Fragment key={index}>
              <RxCaretRight size={20} />
              {index !== fullLocation.length - 1 ? (
                <Link href={link} className="text-gray-400 hover:text-gray-500">
                  {name}
                </Link>
              ) : (
                <span className="text-gray-400 cursor-not-allowed">{name}</span>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
