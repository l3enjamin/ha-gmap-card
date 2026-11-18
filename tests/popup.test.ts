import { describe, expect, it } from "bun:test";
import { formatTemplateResultToHtml } from "../src/popup/controller";

describe("Popup Template HTML & Inline CSS Preservation", () => {
  it("keeps pure HTML templates verbatim while stripping indentation and wrapper tags", () => {
    const raw = `<ha-markdown allow-svg breaks>
      <div style="font-family:sans-serif;">
          <table><tr><td>Bus 410</td></tr></table>
      </div>
    </ha-markdown>`;
    const res = formatTemplateResultToHtml(raw);
    expect(res.isHtml).toBe(true);
    expect(res.content.startsWith("<div")).toBe(true);
    expect(res.content).not.toContain("<ha-markdown");
    expect(res.content).toContain("\n<table><tr><td>Bus 410</td></tr></table>");
  });

  it("converts mixed Markdown + inline-CSS HTML into HTML without stripping style attributes", () => {
    const raw = `### <img src="/local/store.png" style="max-width:64px;border-radius:8px;display:block;"/>  T&T Supermarket
**Milk** — **$4.99**
*Merchant:* T&T
<img src="/local/flyer.jpg" style="max-width:90vw;max-height:50vh;object-fit:contain;border-radius:8px;" />`;
    const res = formatTemplateResultToHtml(raw);
    expect(res.isHtml).toBe(true);
    expect(res.content).toContain('<h3 style="margin:0 0 6px;font-size:15px;line-height:1.3;">');
    expect(res.content).toContain('style="max-width:64px;border-radius:8px;display:block;"');
    expect(res.content).toContain("<strong>Milk</strong>");
    expect(res.content).toContain("<em>Merchant:</em>");
    expect(res.content).toContain('style="max-width:90vw;max-height:50vh;object-fit:contain;border-radius:8px;"');
  });

  it("leaves pure Markdown free of HTML tags for ha-markdown", () => {
    const raw = "### Simple Title\n**State:** On";
    const res = formatTemplateResultToHtml(raw);
    expect(res.isHtml).toBe(false);
    expect(res.content).toBe(raw);
  });
});
