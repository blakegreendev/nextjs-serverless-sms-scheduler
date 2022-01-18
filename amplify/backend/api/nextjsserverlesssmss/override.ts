import { AmplifyApiGraphQlResourceStackTemplate } from '@aws-amplify/cli-extensibility-helper'

export function override(resources: AmplifyApiGraphQlResourceStackTemplate) {
  resources.models['Message'].modelDDBTable.timeToLiveSpecification = {
    enabled: true,
    attributeName: 'ttl',
  }
}
