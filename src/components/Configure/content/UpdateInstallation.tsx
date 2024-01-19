import {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import {
  ErrorBoundary,
} from '../../../context/ErrorContextProvider';
import { Installation, Integration } from '../../../services/api';
import { onSaveUpdate } from '../actions/onSaveUpdate';
import { setHydrateConfigState } from '../state/utils';
import { validateFieldMappings } from '../utils';

import { ConfigureInstallationBase } from './ConfigureInstallationBase';
import { useMutateInstallation } from './useMutateInstallation';

interface UpdateInstallationProps {
  installation: Installation,
  integrationObj: Integration,
}

//  Update Installation Flow
export function UpdateInstallation(
  { installation, integrationObj }: UpdateInstallationProps,
) {
  const {
    setInstallation, hydratedRevision,
    loading, selectedObjectName, apiKey, projectId,
    resetBoundary, setErrors,
    resetConfigureState, resetPendingConfigurationState, configureState,
  } = useMutateInstallation();

  const [isLoading, setLoadingState] = useState<boolean>(false);

  // when no installation or config exists, render create flow
  const { config } = installation;

  // 1. get config from installations (contains form selection state)
  // 2. get the hydrated revision (contains full form)
  // 3. generate the configuration state from the hydrated revision and config

  const resetState = useCallback(
    () => {
      resetBoundary(ErrorBoundary.MAPPING);
      // set configurationState when hydratedRevision is loaded
      if (hydratedRevision?.content && !loading && selectedObjectName) {
        setHydrateConfigState(hydratedRevision, config, selectedObjectName, resetConfigureState);
      }
    },
    [resetBoundary, hydratedRevision, loading, selectedObjectName, config, resetConfigureState],
  );

  useEffect(() => {
    if (!configureState) { resetState(); }
  }, [configureState, resetState]);

  const hydratedObject = useMemo(() => {
    const hydrated = hydratedRevision?.content?.read?.standardObjects?.find(
      (obj) => obj?.objectName === selectedObjectName,
    );

    return hydrated;
  }, [hydratedRevision, selectedObjectName]);

  const onSave = (e: any) => {
    e.preventDefault();

    // check if fields with requirements are met
    const { requiredMapFields, selectedFieldMappings } = configureState?.read || {};
    const { errorList } = validateFieldMappings(
      requiredMapFields,
      selectedFieldMappings,
      setErrors,
    );
    if (errorList.length > 0) {
      return;
    }

    if (installation
      && selectedObjectName
      && apiKey
      && projectId
      && hydratedObject) {
      setLoadingState(true);
      const res = onSaveUpdate(
        projectId,
        integrationObj.id,
        installation.id,
        selectedObjectName,
        apiKey,
        configureState,
        setInstallation,
        hydratedObject,
      );

      res.finally(() => {
        setLoadingState(false);
        resetPendingConfigurationState(selectedObjectName);
      });
    } else {
      console.error('update installation props missing');
    }
  };

  return (
    <ConfigureInstallationBase
      onSave={onSave}
      onReset={resetState}
      isLoading={isLoading}
    />
  );
}
