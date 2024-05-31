import React from 'react';
import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';
import StartLayout, { Props as StartLayoutProps } from '../components/layouts/StartLayout';
import Button from '../components/UI/buttons/Button';
import Routes from '../services/Router/Routes';
import { LayoutProps } from '../types/utils/LayoutProps';
import { center } from '../styles/flex';
import ApiError from '../services/Api/ApiError';

type ErrorDetails = {
  title: string;
  description: string;
};

type Props = LayoutProps & {
  layout: 'home' | 'start';
  error?: ApiError;
  errorDetails?: ErrorDetails;
  item?: string;
};

const ErrorPage: React.FC<Props> = ({ layout, error, errorDetails, item, ...rest }) => {
  const navigate = useNavigate();

  let status;
  let message;
  let title;

  if (error instanceof ApiError) {
    status = error.status;
    message = error.message;
    title = `Error ${status}`;
  } else if (errorDetails) {
    status = null;
    message = errorDetails.description;
    title = errorDetails.title;
  } else {
    status = null;
    message = 'Oops! Something went wrong(';
    title = 'Error';
  }

  const content = (
    <>
      <Typography fontWeight={400} variant="h1" component="h1">
        {title}
      </Typography>
      <Typography variant="h2" component="h2">
        {message || 'Oops! Something went wrong('}
      </Typography>

      <Stack direction="row" spacing={3} alignItems="center">
        <Button onClick={() => navigate(-1)} size="large">
          Go Back
        </Button>
        <Button to={Routes.HOME} variant="contained" size="large">
          Go Home
        </Button>
      </Stack>
    </>
  );

  if (layout === 'home') {
    const props = rest as HomeLayoutProps;

    return (
      <HomeLayout contentSx={{ ...props.contentSx, ...center }} {...props}>
        <Stack spacing={2} alignItems="center">
          {content}
        </Stack>
      </HomeLayout>
    );
  }

  return (
    <StartLayout header={false} {...(rest as StartLayoutProps)}>
      {content}
    </StartLayout>
  );
};

export default ErrorPage;
