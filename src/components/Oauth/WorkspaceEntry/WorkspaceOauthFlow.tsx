/**
 * OAuth flow for any providers that do not require the consumer to enter a subdomain first.
 */

import { useCallback, useState } from 'react';

import { useApiKey } from '../../../context/ApiKeyContextProvider';
import { useProject } from '../../../context/ProjectContextProvider';
import { capitalize } from '../../../utils';
import { fetchOAuthCallbackURL } from '../fetchOAuthCallbackURL';
import OAuthPopup from '../OAuthPopup';

import { WorkspaceEntry } from './WorkspaceEntry';

interface NoSubdomainOauthFlowProps {
  provider: string;
  consumerRef: string;
  consumerName?: string;
  groupRef: string;
  groupName?: string;
}

/**
 * WorkspaceEntry is generic for any provider that requires a workspace to be entered first,
 * then launches a popup with the OAuth flow.
 */
export function WorkspaceOauthFlow({
  provider, consumerRef, consumerName, groupRef, groupName,
}: NoSubdomainOauthFlowProps) {
  const { projectId } = useProject();
  const apiKey = useApiKey();

  const [workspace, setWorkspace] = useState<string>('');
  const [oAuthCallbackURL, setOAuthCallbackURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  //  fetch OAuth callback URL from connection so that oath popup can be launched
  const handleSubmit = async () => {
    setError(null);
    if (consumerName && groupName && apiKey && workspace) {
      try {
        const url = await fetchOAuthCallbackURL(
          projectId,
          consumerRef,
          groupRef,
          consumerName,
          groupName,
          apiKey,
          provider,
          workspace,
        );
        setOAuthCallbackURL(url);
      } catch (err: any) {
        console.error(err);
        setError(err?.message ?? 'Unexpected error');
      }
    }
  };

  const onClose = useCallback((err: string | null) => {
    setError(err);
    setOAuthCallbackURL(null);
  }, []);

  return (
    <OAuthPopup
      title={`Connect to ${capitalize(provider)}`}
      url={oAuthCallbackURL}
      onClose={onClose}
    >
      <WorkspaceEntry
        provider={provider}
        handleSubmit={handleSubmit}
        setWorkspace={setWorkspace}
        error={error}
        isButtonDisabled={workspace.length === 0}
      />
    </OAuthPopup>
  );
}
