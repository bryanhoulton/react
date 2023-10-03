import { useIntegrationList } from '../../context/IntegrationListContext';
import { useProviderConnection } from '../../context/ProviderConnectionContext';
import { Integration } from '../../services/api';
// import { useSubdomain } from '../../context/SubdomainProvider';
import {
  IntegrationConfig,
} from '../../types/configTypes';
import SalesforceOauthFlow from '../Salesforce/SalesforceOauthFlow';

import { ErrorTextBoxPlaceholder } from './ErrorTextBoxPlaceholder';
// import { SetUpRead } from './SetupRead';

interface ConfigureIntegrationBaseProps {
  integration: string, // integrationName
  userId: string,
  groupId: string,
  integrationObj: Integration | null,
  userConfig?: IntegrationConfig,
}

// Base component for configuring and reconfiguring an integration.
export function ConfigureIntegrationBase({
  integration, userId, groupId, integrationObj, userConfig,
}: ConfigureIntegrationBaseProps) {
  const { isConnectedToProvider } = useProviderConnection();
  const { integrations } = useIntegrationList();
  // const { subdomain } = useSubdomain();

  if (!integrations || !integrations.length || !integration) {
    return <ErrorTextBoxPlaceholder />;
  }

  if (!integrationObj) {
    return <ErrorTextBoxPlaceholder />;
  }

  // const appName = integrationObj?.name || '';
  const provider = integrationObj?.provider || '';

  //  TODO: isConnectedToProvider should be an API call
  if (!isConnectedToProvider[provider]) {
    // require user to login to Saleforce if no connection is established
    return (
      <SalesforceOauthFlow
        userId={userId}
        groupId={groupId}
      />
    );
  }

  return (
    <div>SetUpRead</div>

  // TODO: update SetupRead to use hydrated revision
  // <SetUpRead
  //   integration={integration}
  //   source={integrationObj}
  //   subdomain={subdomain}
  //   appName={appName}
  //   userConfig={userConfig}
  //   api={provider}
  //   userId={userId}
  //   groupId={groupId}
  //   redirectUrl={redirectUrl}
  // />
  );
}
