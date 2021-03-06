/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const setFutureMessage = /* GraphQL */ `
  mutation SetFutureMessage($futureMessageInput: FutureMessageInput!) {
    setFutureMessage(futureMessageInput: $futureMessageInput)
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      message
      recipientPhoneNumber
      waitTimestamp
      ttl
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      message
      recipientPhoneNumber
      waitTimestamp
      ttl
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      message
      recipientPhoneNumber
      waitTimestamp
      ttl
      createdAt
      updatedAt
      owner
    }
  }
`;
