import chalk from 'chalk'
import { createWorkspacesClient, SessionManager, logger, createTable, WorkspaceResponse } from 'vtex'

export default () => {
  const { account, workspace: currentWorkspace } = SessionManager.getSingleton()

  logger.debug('Listing workspaces')
  const table = createTable({ head: ['Name', 'Weight', 'Production'] })

  const workspaces = createWorkspacesClient()

  return workspaces
    .list(account)
    .then((workspaceArray: WorkspaceResponse[]) =>
      workspaceArray.forEach((workspace) => {
        const name = workspace.name === currentWorkspace ? chalk.green(`* ${workspace.name}`) : workspace.name
        const { weight } = workspace
        const { production } = workspace

        table.push([name, weight, production])
      })
    )
    .then(() => console.log(table.toString()))
}
