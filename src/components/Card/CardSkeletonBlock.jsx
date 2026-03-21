import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="134" cy="134" r="125" />
    <rect x="0" y="279" rx="10" ry="10" width="280" height="22" />
    <rect x="0" y="326" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="429" rx="10" ry="10" width="95" height="30" />
    <rect x="125" y="427" rx="25" ry="25" width="152" height="35" />
  </ContentLoader>
);

export default MyLoader;
