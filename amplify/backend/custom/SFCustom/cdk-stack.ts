import * as cdk from '@aws-cdk/core'
import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper'
// 1.
import { AmplifyDependentResourcesAttributes } from '../../types/amplify-dependent-resources-ref'
import * as stepFunctions from '@aws-cdk/aws-stepfunctions'
import * as Tasks from '@aws-cdk/aws-stepfunctions-tasks'
import * as lambda from '@aws-cdk/aws-lambda'

export class cdkStack extends cdk.Stack {
  constructor(
    scope: cdk.Construct,
    id: string,
    props?: cdk.StackProps,
    amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps,
  ) {
    super(scope, id, props)
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, 'env', {
      type: 'String',
      description: 'Current Amplify CLI env name',
    })

    const retVal: AmplifyDependentResourcesAttributes = AmplifyHelpers.addResourceDependency(
      this,
      amplifyResourceProps.category,
      amplifyResourceProps.resourceName,
      [{ category: 'function', resourceName: 'SNSPublisher' }],
    )

    const publishMessageARN = cdk.Fn.ref(retVal.function.SNSPublisher.Arn)
    const amplifySNSPublishLambda = lambda.Function.fromFunctionArn(
      this,
      'Amplify Created SNS Publisher Function',
      publishMessageARN,
    )
    const step1 = new stepFunctions.Wait(this, 'Wait state', {
      comment:
        'A future timestamp based on user interaction. This has the message and intended phone number as well.',
      time: stepFunctions.WaitTime.timestampPath('$.waitTimestamp'),
    })
    const step2 = new Tasks.LambdaInvoke(this, 'Publish Message', {
      comment: 'Publish a message to SNS with using a topic',
      lambdaFunction: amplifySNSPublishLambda,
    })
    const definition = stepFunctions.Chain.start(step1).next(step2)
    new stepFunctions.StateMachine(this, 'Future State Machine', {
      stateMachineName: `future-text-message-${cdk.Fn.ref('env')}`,
      definition,
    })
  }
}
