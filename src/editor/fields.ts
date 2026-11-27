import { html, nothing, TemplateResult } from "lit";
import { toHexPickerValue } from "./helpers";

export interface SelectOption {
  value: string;
  label: string;
}

export function renderTextField(opts: {
  label: string;
  value?: string;
  placeholder?: string;
  listId?: string;
  fullWidth?: boolean;
  onChange: (val: string) => void;
}): TemplateResult {
  return html`
    <div class=${opts.fullWidth ? "field full" : "field"}>
      <label>${opts.label}</label>
      <input
        type="text"
        .value=${opts.value ?? ""}
        placeholder=${opts.placeholder ?? ""}
        list=${opts.listId ? opts.listId : nothing}
        @change=${(e: Event) => opts.onChange((e.target as HTMLInputElement).value.trim())}
      />
    </div>
  `;
}

export function renderNumberField(opts: {
  label: string;
  value?: number | null;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  fullWidth?: boolean;
  onChange: (val: number | undefined) => void;
}): TemplateResult {
  const strVal = opts.value !== undefined && opts.value !== null && Number.isFinite(opts.value) ? String(opts.value) : "";
  return html`
    <div class=${opts.fullWidth ? "field full" : "field"}>
      <label>${opts.label}</label>
      <input
        type="number"
        .value=${strVal}
        placeholder=${opts.placeholder ?? ""}
        min=${opts.min !== undefined ? String(opts.min) : nothing}
        max=${opts.max !== undefined ? String(opts.max) : nothing}
        step=${opts.step !== undefined ? String(opts.step) : "any"}
        @change=${(e: Event) => {
          const raw = (e.target as HTMLInputElement).value.trim();
          if (raw === "") {
            opts.onChange(undefined);
            return;
          }
          const n = Number(raw);
          opts.onChange(Number.isFinite(n) ? n : undefined);
        }}
      />
    </div>
  `;
}

export function renderSelectField(opts: {
  label: string;
  value?: string;
  options: SelectOption[];
  fullWidth?: boolean;
  onChange: (val: string) => void;
}): TemplateResult {
  const cur = opts.value ?? "";
  return html`
    <div class=${opts.fullWidth ? "field full" : "field"}>
      <label>${opts.label}</label>
      <select
        .value=${cur}
        @change=${(e: Event) => opts.onChange((e.target as HTMLSelectElement).value)}
      >
        ${opts.options.map((opt) => html`<option value=${opt.value} ?selected=${cur === opt.value}>${opt.label}</option>`)}
      </select>
    </div>
  `;
}

export function renderTriBoolField(opts: {
  label: string;
  value?: boolean;
  fullWidth?: boolean;
  onChange: (val: boolean | undefined) => void;
}): TemplateResult {
  const cur = opts.value === true ? "true" : opts.value === false ? "false" : "";
  return renderSelectField({
    label: opts.label,
    value: cur,
    fullWidth: opts.fullWidth,
    options: [
      { value: "", label: "Default / Inherit" },
      { value: "true", label: "Enabled" },
      { value: "false", label: "Disabled" }
    ],
    onChange: (val) => {
      if (val === "true") opts.onChange(true);
      else if (val === "false") opts.onChange(false);
      else opts.onChange(undefined);
    }
  });
}

export function renderCheckboxField(opts: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}): TemplateResult {
  return html`
    <label class="check">
      <input
        type="checkbox"
        .checked=${opts.checked}
        @change=${(e: Event) => opts.onChange((e.target as HTMLInputElement).checked)}
      />
      ${opts.label}
    </label>
  `;
}

export function renderColorField(opts: {
  label: string;
  value?: string;
  placeholder?: string;
  fullWidth?: boolean;
  onChange: (val: string | undefined) => void;
}): TemplateResult {
  return html`
    <div class=${opts.fullWidth ? "field full" : "field"}>
      <label>${opts.label}</label>
      <div class="color-input">
        <input
          type="color"
          .value=${toHexPickerValue(opts.value)}
          @input=${(e: Event) => opts.onChange((e.target as HTMLInputElement).value)}
        />
        <input
          type="text"
          .value=${opts.value ?? ""}
          placeholder=${opts.placeholder ?? "#1a73e8"}
          @change=${(e: Event) => {
            const v = (e.target as HTMLInputElement).value.trim();
            opts.onChange(v === "" ? undefined : v);
          }}
        />
        ${opts.value
          ? html`<button type="button" class="icon-btn" title="Clear color" @click=${() => opts.onChange(undefined)}>✕</button>`
          : nothing}
      </div>
    </div>
  `;
}

export function renderTextareaField(opts: {
  label: string;
  value?: string;
  placeholder?: string;
  rows?: number;
  onChange: (val: string) => void;
}): TemplateResult {
  return html`
    <div class="field full">
      <label>${opts.label}</label>
      <textarea
        class="code-box"
        rows=${String(opts.rows ?? 5)}
        .value=${opts.value ?? ""}
        placeholder=${opts.placeholder ?? ""}
        @change=${(e: Event) => opts.onChange((e.target as HTMLTextAreaElement).value)}
      ></textarea>
    </div>
  `;
}
