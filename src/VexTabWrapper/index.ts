// @ts-ignore
import { Vex, VexTab, Artist } from "../../vendor/main.prod";

const Renderer = Vex.Flow.Renderer;

interface VexTabWrapperOptions {
  x?: number;
  y?: number;
  width?: number;
  scale?: number;
}

export default class VexTabWrapper {
  container: HTMLDivElement = document.createElement("div");
  renderer: any = null;
  artist: any = null;
  tab: any = null;
  defaultOptions: VexTabWrapperOptions = {
    x: 10,
    y: 10,
    width: 600,
    scale: 0.8,
  };

  constructor(options: VexTabWrapperOptions = {}) {
    const parsedOptions = { ...this.defaultOptions, ...options };
    this.renderer = new Renderer(this.container, Renderer.Backends.SVG);
    this.artist = new Artist(
      parsedOptions.x,
      parsedOptions.y,
      parsedOptions.width,
      { scale: parsedOptions.scale }
    );
    this.tab = new VexTab(this.artist);
  }

  render(text: string): string {
    this.tab.parse(text);
    this.artist.render(this.renderer);

    return this.container.outerHTML;
  }
}
