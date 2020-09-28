import messages from './messages';

export const joinCycle = (subject, object, owner) => ({owner, action: messages.joinCycleRequests.message, subject, object});