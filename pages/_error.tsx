import type { NextPage } from 'next'

import * as Sentry from '@sentry/nextjs';
import NextErrorComponent from 'next/error';

const CustomErrorComponent: NextPage<{ statusCode: number }> = props => {
  return <NextErrorComponent statusCode={props.statusCode} />;
};

CustomErrorComponent.getInitialProps = async contextData => {
  await Sentry.captureUnderscoreErrorException(contextData);
  return NextErrorComponent.getInitialProps(contextData);
};

export default CustomErrorComponent;
