import VexTabWrapper from "./VexTabWrapper";
import { captureOptionsFromTokenInfo } from "./utils";

export default function () {
  const pluginToken = "joplin-plugin-vextab";

  return {
    plugin: function (markdownIt: any) {
      const defaultRender: Function =
        markdownIt.renderer.rules.fence ||
        function (
          tokens: any[],
          idx: number,
          options: any,
          env: any,
          self: any
        ) {
          return self.renderToken(tokens, idx, options, env, self);
        };

      markdownIt.renderer.rules.fence = function (
        tokens: any[],
        idx: number,
        options: {},
        env: any,
        self: any
      ) {
        const token = tokens[idx];
        if (!token.info.startsWith(pluginToken))
          return defaultRender(tokens, idx, options, env, self);
        try {
          const options = captureOptionsFromTokenInfo(
            token.info.split(pluginToken)[1]
          );
          markdownIt.utils.escapeHtml(token.content);
          const vexTabWrapper = new VexTabWrapper(options);
          const contentHtml = vexTabWrapper.render(token.content);
          return `<div class="joplin-editable">${contentHtml}</div>`;
        } catch (error) {
          console.log(error);
        }
      };
    },
  };
}
