/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($owner: String) {
    onCreateMessage(owner: $owner) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($owner: String) {
    onUpdateMessage(owner: $owner) {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($owner: String) {
    onDeleteMessage(owner: $owner) {
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
