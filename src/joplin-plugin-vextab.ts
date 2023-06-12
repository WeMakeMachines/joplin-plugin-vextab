import VexTabWrapper from "./VexTabWrapper";

export default function () {
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
        if (token.info !== "joplin-plugin-vextab")
          return defaultRender(tokens, idx, options, env, self);
        try {
          markdownIt.utils.escapeHtml(token.content);
          const vexTabWrapper = new VexTabWrapper();
          const contentHtml = vexTabWrapper.render(token.content);
          return `<div class="joplin-editable">${contentHtml}</div>`;
        } catch (error) {
          console.log(error);
        }
      };
    },
  };
}
