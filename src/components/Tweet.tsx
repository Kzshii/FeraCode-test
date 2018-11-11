import * as React from 'react';
import Image from './Image';

type Props = {
  image: string;
  tweet?: string;
  date?: string;
  userName?: string;
};

export default function Tweet({ image, tweet, date, userName }: Props) {
  return (
    <React.Fragment>
      <div className="row featurette">
        <div className="col-md-5 pull-md-7">
          <Image image={image} avatar/>
        </div>
        <div className="col-md-7 push-md-5">
          <h2 className="featurette-heading">{userName}
            <span className="text-muted"> {date!}</span>
          </h2>
          <p className="lead">{tweet}</p>
        </div>
      </div>
      <hr className="featurette-divider"/>
    </React.Fragment>
  );
}
