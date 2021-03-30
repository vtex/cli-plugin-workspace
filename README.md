# VTEX CLI Plugin Workspace

Extend the `vtex` toolbelt!

## Developing

1. Clone `vtex/toolbelt` and follow the steps on the Contributing section.
2. Clone/Create a plugin with this template.
3. Change the template name under this project's `package.json`.
2. Run `yarn link` on this project.
3. Now run `vtex link @vtex/cli-plugin-template` (or the new name) on the `vtex/toolbelt` project.
4. Run `yarn watch` on the `vtex/toolbelt`
5. Test the command on a VTEX IO app with `vtex-test hello`

For more information, read [Ocliff Docs](https://oclif.io/docs/introduction).

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
![npm](https://img.shields.io/npm/v/@vtex/cli-plugin-workspace)

<!-- toc -->
* [VTEX CLI Plugin Workspace](#vtex-cli-plugin-workspace)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @vtex/cli-plugin-workspace
$ vtex COMMAND
running command...
$ vtex (-v|--version|version)
@vtex/cli-plugin-workspace/1.0.22-beta linux-x64 node-v12.21.0
$ vtex --help [COMMAND]
USAGE
  $ vtex COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`vtex workspace:delete WORKSPACE1 [ITHWORKSPACE]`](#vtex-workspacedelete-workspace1-ithworkspace)
* [`vtex workspace:list`](#vtex-workspacelist)
* [`vtex workspace:promote`](#vtex-workspacepromote)
* [`vtex workspace:reset [WORKSPACENAME]`](#vtex-workspacereset-workspacename)
* [`vtex workspace:status [WORKSPACENAME]`](#vtex-workspacestatus-workspacename)
* [`vtex workspace:use WORKSPACE`](#vtex-workspaceuse-workspace)

## `vtex workspace:delete WORKSPACE1 [ITHWORKSPACE]`

Deletes one or many workspaces from the current account.

```
USAGE
  $ vtex workspace:delete WORKSPACE1 [ITHWORKSPACE]

ARGUMENTS
  WORKSPACE1    Name of the workspace to delete.
  ITHWORKSPACE  Name of the multiple workspaces to delete.

OPTIONS
  -f, --force    Deletes the specified workspace even if it is currently in use.
  -h, --help     show CLI help
  -v, --verbose  Show debug level logs
  -y, --yes      Answers yes to all prompts.
  --trace        Ensure all requests to VTEX IO are traced

EXAMPLES
  vtex workspace delete workspaceName
  vtex workspace delete workspaceName1 workspaceName2
```

_See code: [build/commands/workspace/delete.ts](https://github.com/vtex/cli-plugin-workspace/blob/v1.0.22-beta/build/commands/workspace/delete.ts)_

## `vtex workspace:list`

Lists all workspaces of the current account.

```
USAGE
  $ vtex workspace:list

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  Show debug level logs
  --trace        Ensure all requests to VTEX IO are traced

ALIASES
  $ vtex workspace:ls

EXAMPLES
  vtex workspace list
  vtex workspace ls
```

_See code: [build/commands/workspace/list.ts](https://github.com/vtex/cli-plugin-workspace/blob/v1.0.22-beta/build/commands/workspace/list.ts)_

## `vtex workspace:promote`

Promotes the current workspace to master. (Only works for production workspaces.) Run vtex promote --help to see how to deal with data conflicts.

```
USAGE
  $ vtex workspace:promote

OPTIONS
  -h, --help
      show CLI help

  -v, --verbose
      Show debug level logs

  --conflict=master|mine|abort
      [default: master] Defines how to handle data conflict between workspaces.
      - master: Discards the workspace's conflicting data, keeping the data from master unchanged.
      - mine: Overrides the master with the specified workspace. Any conflicting data on the master is lost.
      - abort: Aborts the workspace promotion in case of data conflict.

  --trace
      Ensure all requests to VTEX IO are traced

ALIASES
  $ vtex promote

EXAMPLES
  vtex workspace promote
  vtex promote
```

_See code: [build/commands/workspace/promote.ts](https://github.com/vtex/cli-plugin-workspace/blob/v1.0.22-beta/build/commands/workspace/promote.ts)_

## `vtex workspace:reset [WORKSPACENAME]`

Cleans all configurations of a workspace and recreates it with the configurations from master. If not specified which workspace, it defaults to the current one.

```
USAGE
  $ vtex workspace:reset [WORKSPACENAME]

ARGUMENTS
  WORKSPACENAME  Name of the workspace to reset.

OPTIONS
  -h, --help        show CLI help
  -p, --production  Recreates the workspace as a production one.
  -v, --verbose     Show debug level logs
  -y, --yes         Answers yes to all prompts.
  --trace           Ensure all requests to VTEX IO are traced

EXAMPLES
  vtex workspace reset
  vtex workspace reset workspaceName
```

_See code: [build/commands/workspace/reset.ts](https://github.com/vtex/cli-plugin-workspace/blob/v1.0.22-beta/build/commands/workspace/reset.ts)_

## `vtex workspace:status [WORKSPACENAME]`

Displays information about the specified workspace.

```
USAGE
  $ vtex workspace:status [WORKSPACENAME]

ARGUMENTS
  WORKSPACENAME  Name of the workspace.

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  Show debug level logs
  --trace        Ensure all requests to VTEX IO are traced

EXAMPLE
  vtex workspace status
```

_See code: [build/commands/workspace/status.ts](https://github.com/vtex/cli-plugin-workspace/blob/v1.0.22-beta/build/commands/workspace/status.ts)_

## `vtex workspace:use WORKSPACE`

Creates and switches to a new workspace or simply switches to an existing one.

```
USAGE
  $ vtex workspace:use WORKSPACE

ARGUMENTS
  WORKSPACE  Name of the workspace

OPTIONS
  -h, --help        show CLI help
  -p, --production  Creates and/or switches to a production workspace.
  -r, --reset       Resets the workspace before switching to it.
  -v, --verbose     Show debug level logs
  --trace           Ensure all requests to VTEX IO are traced

ALIASES
  $ vtex use

EXAMPLES
  vtex workspace use workspaceName
  vtex use workspaceName
```

_See code: [build/commands/workspace/use.ts](https://github.com/vtex/cli-plugin-workspace/blob/v1.0.22-beta/build/commands/workspace/use.ts)_
<!-- commandsstop -->
