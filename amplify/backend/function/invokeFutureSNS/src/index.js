/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STATE_MACHINE_ARN
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
const stepFunctions = new AWS.StepFunctions()

exports.handler = async ({ arguments: { futureMessageInput } }) => {
  const params = {
    stateMachineArn: process.env.STATE_MACHINE_ARN + '-' + process.env.ENV,
    input: JSON.stringify({
      message: futureMessageInput.message,
      waitTimestamp: futureMessageInput.waitTimestamp,
      phoneNumber: futureMessageInput.recipientPhoneNumber,
    }),
  }

  await stepFunctions.startExecution(params).promise()

  return 'message sent to workflow'
}
