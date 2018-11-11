import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = Partial<{
  children?: React.ReactNode;
  to?: string;
  success?: boolean;
  primary?: boolean;
  block?: boolean;
}> & React.HTMLProps<HTMLButtonElement>;

export default function Button({
  children,
  to,
  success,
  primary,
  block,
  ...props
}: Props) {
  const classes = classNames({
    'btn-success': success,
    'btn btn-large btn-primary': primary,
    'btn-block': block,
  });

  if (to) {
    return (
      <Link to={to} className={classes} {...props as any}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
