import React from 'react';
import * as Icons from 'lucide-react';
import Link from 'next/link';

type IconName = keyof typeof Icons;

interface Props {
  href: string;
  className?: string;
  classNameIcon?: string;
  title?: string;
  icon?: IconName;
  size?: string;
  strokeWidth?: number;
}

export default function LinkButton({ href, className = '', classNameIcon = '', title, icon, size, strokeWidth }: Props) {
  const IconComponent = icon ? Icons[icon] : null;
  const Iconsize = size ? size : '12'

  return (
    <Link
      href={href}
      className={className}
    >
      <div className='flex flex-row justify-center items-center'>
        {title}
        <span className='m-1'>
          {IconComponent && <IconComponent size={Iconsize} className={classNameIcon} strokeWidth={strokeWidth} />}
        </span>
      </div>
    </Link>
  );
};