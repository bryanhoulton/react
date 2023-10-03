import {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';

import { api, Project } from '../services/api';

import { ApiKeyContext } from './ApiKeyContext';

interface ProjectContextValue {
  project: Project | null;
  projectId: string | null;
}

export const ProjectContext = createContext<ProjectContextValue>({
  project: null,
  projectId: null,
});

export const useProject = (): ProjectContextValue => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }

  return context;
};

export const useProjectId = (): string => {
  const id = useProject().projectId;
  if (!id) {
    throw new Error('All components must be wraped inside of AmpersandProvider, and AmpersandProvider must have a project ID');
  }
  return id;
};

type ProjectProviderProps = {
  projectId: string,
  children?: React.ReactNode;
};

export function ProjectProvider(
  { projectId, children }:ProjectProviderProps,
) {
  const [project, setProject] = useState<Project | null>(null);
  const apiKey = useContext(ApiKeyContext);

  useEffect(() => {
    api.getProject({ projectId }, {
      headers: {
        'X-Api-Key': apiKey ?? '',
      },
    }).then((_project) => {
      setProject(_project);
    }).catch((err) => {
      console.error('ERROR: ', err);
    });
  }, [projectId, apiKey]);

  const contextValue = useMemo(() => ({ projectId, project }), [projectId, project]);

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
}
