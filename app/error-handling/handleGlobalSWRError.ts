import { toast } from 'react-toastify';
import * as sentry from "@sentry/nextjs";

import UIError from './UIError'

const handleGlobalSWRError = (error: unknown) => {
  if (error instanceof UIError) {
    toast.error(error.message)
    sentry.captureException(error.originalError)
  } else if (error instanceof Error) {
    toast.error('Unexpected error')
    sentry.captureException(error)
  } else if (typeof error === 'string') {
    toast.error(error)
    sentry.captureMessage(error)
  }
}

export default handleGlobalSWRError
