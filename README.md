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
$ oclif-example COMMAND
running command...
$ oclif-example (-v|--version|version)
@vtex/cli-plugin-workspace/1.1.6-beta.3 darwin-arm64 node-v16.13.0
$ oclif-example --help [COMMAND]
USAGE
  $ oclif-example COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`oclif-example workspace:delete WORKSPACE1 [ITHWORKSPACE]`](#oclif-example-workspacedelete-workspace1-ithworkspace)
* [`oclif-example workspace:list`](#oclif-example-workspacelist)
* [`oclif-example workspace:promote`](#oclif-example-workspacepromote)
* [`oclif-example workspace:reset [WORKSPACENAME]`](#oclif-example-workspacereset-workspacename)
* [`oclif-example workspace:status [WORKSPACENAME]`](#oclif-example-workspacestatus-workspacename)
* [`oclif-example workspace:use WORKSPACE`](#oclif-example-workspaceuse-workspace)

## `oclif-example workspace:delete WORKSPACE1 [ITHWORKSPACE]`

Deletes one or many [38;5;149mworkspaces[39m from the current [38;5;149maccount[39m.

```
USAGE
  $ oclif-example workspace:delete WORKSPACE1 [ITHWORKSPACE]

ARGUMENTS
  WORKSPACE1    Name of the workspace to delete.
  ITHWORKSPACE  Name of the multiple workspaces to delete.

OPTIONS
  -f, --force    Deletes the specified workspace even if it is currently in use.
  -h, --help     Shows this help message.
  -v, --verbose  Shows debug level logs.
  -y, --yes      Answers yes to all prompts.
  --trace        Ensures all requests to VTEX IO are traced.

EXAMPLES
  vtex workspace delete workspaceName
  vtex workspace delete workspaceName1 workspaceName2
```

_See code: [build/commands/workspace/delete.ts](https://github.com/vtex/cli-plugin-workspace/blob/v1.1.6-beta.3/build/commands/workspace/delete.ts)_

## `oclif-example workspace:list`

Lists all [38;5;149mworkspaces[39m of the current [38;5;149maccount[39m.

```
USAGE
  $ oclif-example workspace:list

OPTIONS
  -h, --help     Shows this help message.
  -v, --verbose  Shows debug level logs.
  --trace        Ensures all requests to VTEX IO are traced.

ALIASES
  $ oclif-example workspace:ls

EXAMPLES
  vtex workspace list
  vtex workspace ls
```

_See code: [build/commands/workspace/list.ts](https://github.com/vtex/cli-plugin-workspace/blob/v1.1.6-beta.3/build/commands/workspace/list.ts)_

## `oclif-example workspace:promote`

Promotes the current [38;5;149mworkspace[39m to master. (Only works for [38;5;149mproduction workspaces[39m.) Run [38;5;205mvtex promote --help[39m to see how to deal with data conflicts.

```
USAGE
  $ oclif-example workspace:promote

OPTIONS
  -h, --help
      Shows this help message.

  -v, --verbose
      Shows debug level logs.

  --conflict=master|mine|abort
      [default: master] Defines how to handle data conflict between workspaces.
      - master: Discards the workspace's conflicting data, keeping the data from master unchanged.
      - mine: Overrides the master with the specified workspace. Any conflicting data on the master is lost.
      - abort: Aborts the workspace promotion in case of data conflict.

  --trace
      Ensures all requests to VTEX IO are traced.

ALIASES
  $ oclif-example promote

EXAMPLES
  vtex workspace promote
  vtex promote
```

_See code: [build/commands/workspace/promote.ts](https://github.com/vtex/cli-plugin-workspace/blob/v1.1.6-beta.3/build/commands/workspace/promote.ts)_

## `oclif-example workspace:reset [WORKSPACENAME]`

Cleans all configurations of a [38;5;149mworkspace[39m and recreates it with the configurations from master. If not specified which [38;5;149mworkspace[39m, it defaults to the current one.

```
USAGE
  $ oclif-example workspace:reset [WORKSPACENAME]

ARGUMENTS
  WORKSPACENAME  Name of the workspace to reset.

OPTIONS
  -h, --help        Shows this help message.
  -p, --production  Recreates the workspace as a production one.
  -v, --verbose     Shows debug level logs.
  -y, --yes         Answers yes to all prompts.
  --trace           Ensures all requests to VTEX IO are traced.

EXAMPLES
  vtex workspace reset
  vtex workspace reset workspaceName
```

_See code: [build/commands/workspace/reset.ts](https://github.com/vtex/cli-plugin-workspace/blob/v1.1.6-beta.3/build/commands/workspace/reset.ts)_

## `oclif-example workspace:status [WORKSPACENAME]`

Displays information about the specified [38;5;149mworkspace[39m.

```
USAGE
  $ oclif-example workspace:status [WORKSPACENAME]

ARGUMENTS
  WORKSPACENAME  Name of the workspace.

OPTIONS
  -h, --help     Shows this help message.
  -v, --verbose  Shows debug level logs.
  --trace        Ensures all requests to VTEX IO are traced.

EXAMPLE
  vtex workspace status
```

_See code: [build/commands/workspace/status.ts](https://github.com/vtex/cli-plugin-workspace/blob/v1.1.6-beta.3/build/commands/workspace/status.ts)_

## `oclif-example workspace:use WORKSPACE`

Creates and switches to a new [38;5;149mworkspace[39m or simply switches to an existing one.

```
USAGE
  $ oclif-example workspace:use WORKSPACE

ARGUMENTS
  WORKSPACE  Name of the workspace

OPTIONS
  -h, --help        Shows this help message.
  -p, --production  Creates and/or switches to a production workspace.
  -r, --reset       Resets the workspace before switching to it.
  -v, --verbose     Shows debug level logs.
  --trace           Ensures all requests to VTEX IO are traced.

ALIASES
  $ oclif-example use

EXAMPLES
  vtex workspace use workspaceName
  vtex use workspaceName
```

_See code: [build/commands/workspace/use.ts](https://github.com/vtex/cli-plugin-workspace/blob/v1.1.6-beta.3/build/commands/workspace/use.ts)_
<!-- commandsstop -->
