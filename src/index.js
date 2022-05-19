import { join } from 'path';
export default (api) => {
    api.chainWebpack(webpackConfig => {
        webpackConfig
          .entry('umi')
          .clear()
          .add(join(api.paths.absTmpPath, 'entry.ts'));
        return webpackConfig;
      });
      api.onGenerateFiles(() => {   
        api.writeTmpFile({
          path: 'entry.ts',
          content: 'import("./umi")',
        });
      });
      api.addHTMLHeadScripts(() => {
        return [
          {
            src: `${api.userConfig.define['process.env.UI_URL']}/remoteEntry.js`,
          },
        ];
      });
};


