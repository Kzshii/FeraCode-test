import * as React from 'react';
import classNames from 'classnames';

type Props = Partial<{
  type: string;
  name: string;
  value?: any;
  classe?: string;
  login?: boolean;
}> &
  React.HTMLProps<HTMLInputElement>

export default ({
  type,
  classe,
  name,
  value,
  login,
  onChange,
  ...props
}: Props) => {
  const classes = classNames({
    'form-control form-control-lg': classe === 'input',
    'form-control': login,
  });
  return (
    <input
      className={classes}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};
