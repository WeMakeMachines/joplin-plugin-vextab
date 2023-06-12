// @ts-ignore
import { Vex, VexTab, Artist } from "../../vendor/main.prod";

const Renderer = Vex.Flow.Renderer;

export default class VexTabWrapper {
  container: HTMLDivElement = document.createElement("div");
  renderer: any = null;
  artist: any = null;
  tab: any = null;

  constructor() {
    this.renderer = new Renderer(this.container, Renderer.Backends.SVG);
    this.artist = new Artist(10, 10, 600, { scale: 0.8 });
    this.tab = new VexTab(this.artist);
  }

  render(text: string): string {
    this.tab.parse(text);
    this.artist.render(this.renderer);

    return this.container.outerHTML;
  }
}
