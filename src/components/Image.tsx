import * as React from 'react';
import classNames from 'classnames';

type Props = {
  image: string;
  avatar?: boolean;
  cover?: boolean;
  height?: string;
  width?: string;
};

export default function Image({ image, avatar, cover, height, width }: Props) {
  const classes = classNames({
    'featurette-image img-fluid mx-auto': avatar,
    'first-slide': cover
  });
  return (
    <React.Fragment>
      <img src={image} className={classes} alt='' height={height} width={width}/>
    </React.Fragment>
  );
}
