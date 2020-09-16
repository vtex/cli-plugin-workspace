import { flags } from '@oclif/command'

import workspacePromote from '../../modules/promote'
import { CustomCommand } from 'vtex'

const conflictFlagMapping: { [flag: string]: string } = {
  master: 'Masterwins',
  mine: 'MineWins',
  abort: 'Abort',
}

const conflictFlagDescription = [
  'Defines how to handle data conflict between workspaces.',
  '- master: Keeps data from master unchanged when there are conflicts. Workspace conflicting data is discarded.',
  '- mine: Overrides the data on master with the one of the workspace when there is conflict. Any changes on conflicting data made on master will be lost.',
  '- abort: Aborts the workspace promotion when any data conflict is detected.',
].join('\n')

const conflictResolutionFlag = flags.string({
  description: conflictFlagDescription,
  options: ['master', 'mine', 'abort'],
  default: 'master',
  parse: (flag) => conflictFlagMapping[flag],
})

export default class WorkspacePromote extends CustomCommand {
  static description = 'Promote this workspace to master'

  static aliases = ['promote']

  static examples = ['vtex workspace promote', 'vtex promote']

  static flags = {
    ...CustomCommand.globalFlags,
    conflict: conflictResolutionFlag,
  }

  static args = []

  async run() {
    const {
      flags: { conflict },
    } = this.parse(WorkspacePromote)

    await workspacePromote(conflict)
  }
}
