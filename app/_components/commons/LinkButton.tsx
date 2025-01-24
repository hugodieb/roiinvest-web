'use client'

import React from 'react';
import * as Icons from 'lucide-react';
import Link from 'next/link';

type IconName = keyof typeof Icons;

interface Props {
  href: string;
  classNameLink?: string;
  classNameTitle?: string;
  classNameIcon?: string;
  title?: string;
  icon?: IconName;
  size?: string;
  strokeWidth?: number;
}

export default function LinkButton({ href, classNameLink, classNameTitle, classNameIcon, title, icon, size, strokeWidth }: Props) {
  const IconComponent = icon ? Icons[icon] : null;
  const Iconsize = size ? size : '12'
  const _classNameTitle = classNameTitle ? classNameTitle : 'flex flex-row justify-center items-center'

  return (
    <Link
      href={href}
      className={classNameLink}
    >
      <div className={_classNameTitle}>
        {title}
        <span className='m-1'>
          {IconComponent && <IconComponent size={Iconsize} className={classNameIcon} strokeWidth={strokeWidth} />}
        </span>
      </div>
    </Link>
  );
};