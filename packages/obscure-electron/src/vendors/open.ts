import { dynamicImport } from 'tsimportlib';
import type { AppName, Options, OpenAppOptions } from 'open';
import { ChildProcess } from 'child_process';
import { exit } from 'process';

/**
 * Service to open 3rd party applications on the end user's machine.
 * We leverage a service here since open is an ESM module, therefore
 * we need to take advantage of dynamic imports to load it into
 * this CommonJS application.
 */
class OpenAppService {
  /**
   * internal reference to default export of open
   */
  private _open: (target: string, options?: Options) => Promise<ChildProcess>;

  /**
   * Dynamically loads the open module, this function should be the first thing invoked before
   * initializing the rest of the application, if we cannot successfully load open then the
   * application should exit.
   */
  async startUp() {
    try {
      this._open = ((await dynamicImport('open', module)) as typeof import('open')).default;
    } catch (e) {
      console.error(e);
      exit(2);
    }
  }

  public open(target: string, options?: Options): Promise<ChildProcess> {
    return this._open(target, options);
  }
}

export { AppName, Options, OpenAppOptions };

export default new OpenAppService();
