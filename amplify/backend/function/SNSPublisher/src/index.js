const AWS = require('aws-sdk')
const sns = new AWS.SNS()

exports.handler = async (input) => {
  // TODO implement
  const messageParams = {
    Message: input.message,
    PhoneNumber: input.phoneNumber,
  }
  await sns.publish(messageParams).promise()

  return `success`
}
