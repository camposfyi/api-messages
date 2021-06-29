declare interface DefaultHttpMessages {
  ok?: string;
  created?: string;
  badRequest?: string;
  unauthorized?: string;
  forbidden?: string;
  notFound?: string;
  conflict?: string;
  internalServerError?: string;
}

export interface DefaultApiMessages {
  http: DefaultHttpMessages;
}

export const defaultApiMessages: DefaultApiMessages = {
  http: {
    ok: 'Success.',
    created: 'Operation successful.',
    badRequest: 'The server could not understand your request, please check your syntax.',
    unauthorized: 'Please sign in before proceeding with this action.',
    forbidden: 'You are not allowed to access this resource.',
    notFound: 'the item you are looking for was not found',
    conflict: 'There is a conflict with an existing record, please check your request.',
    internalServerError: 'An error has occurred. If the problem persists, contact customer support.',
  },
};
