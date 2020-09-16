import chalk from 'chalk'
import { formatHyperlink, ColorifyConstants } from 'vtex'

export const Messages = {
  PROMOTE_INIT: 'Promoting workspace',
  PROMOTE_CHECK_WORKSPACE: (workspace: string, url: string) => `${chalk.bold(
    `The workspace ${ColorifyConstants.ID(workspace)} is about to be promoted,`
  )} to be sure if this is the one you want to promote, check on the link below, please.\n
  🖥️  ${ColorifyConstants.ID(workspace)} workspace
  See at: ${ColorifyConstants.URL_INTERACTIVE(url)}\n`,
  PROMOTE_PROMPT_CONFIRM: (workspace: string) =>
    `Do you want to promote ${ColorifyConstants.ID(workspace)} to master? ${chalk.dim(
      `Doing so, the work you did locally will be taken to production.`
    )}`,
  PROMOTE_PROMPT_NEGATIVE_ANSWER: (workspace: string) =>
    `${chalk.bold(
      `Ok! Workspace ${ColorifyConstants.ID(workspace)} was not promoted.`
    )} If you are looking for other workspaces, run ${ColorifyConstants.COMMAND_OR_VTEX_REF('vtex workspace list')}.\n`,
  PROMOTE_SUCCESS: (workspace: string) =>
    `✨ ${chalk.bold('Success!')} The workspace ${ColorifyConstants.ID(
      workspace
    )} was promoted to ${ColorifyConstants.ID(
      'master'
    )}, taking your changes to the final users. All the content it had is now at the workspace ${ColorifyConstants.ID(
      'master'
    )} and the workspace ${ColorifyConstants.ID(workspace)} was deleted.`,
  PROMOTE_ASK_FEEDBACK: `What do you think about checking the workspace before promoting it? Please, tell us ${formatHyperlink(
    'here',
    'https://forms.gle/RZk6gS2nWUZQ9KQr9'
  )}.`,
  PROMOTE_MASTER_ERROR: (workspace: string) => `It is not possible to promote workspace ${workspace} to master`,
  PROMOTE_NOT_PRODUCTION_ERROR: (workspace: string) =>
    `Workspace ${ColorifyConstants.ID(workspace)} is not a ${ColorifyConstants.ID(
      'production'
    )} workspace\nOnly production workspaces may be promoted\nUse the command ${ColorifyConstants.COMMAND_OR_VTEX_REF(
      'vtex workspace create <workspace> --production'
    )} to create a production workspace`,
  PROMOTE_SPINNER_START: 'Preparing the workspace to be promoted',
  PROMOTE_CONFLICT_ERROR: (workspace: string, buckets: string[]) =>
    `${
      `Couldn't promote workspace ${ColorifyConstants.ID(workspace)}.\n` +
      `  There are conflicts between ${ColorifyConstants.ID(workspace)} and ${ColorifyConstants.ID(
        'master'
      )} in the following data:\n\n`
    }${buckets.map((bucket) => `    ${bucket}`).join('\n')}\n\n` +
    `  If you have changed data related to the apps above, any request on workspace ${ColorifyConstants.ID(
      workspace
    )} that interacts with the conflicting data may solve the problem.\n` +
    `  Run ${ColorifyConstants.COMMAND_OR_VTEX_REF(
      'vtex workspace promote --help'
    )} to see alternatives conflict resolution strategies for promoting workspaces.`,
  CONFLICTING_BUCKET_DESCRIPTOR: (bucket: string, app: string) =>
    `• ${ColorifyConstants.ID(bucket)} from app ${ColorifyConstants.ID(app)}`,
}
