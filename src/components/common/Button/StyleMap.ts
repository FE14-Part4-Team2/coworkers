import type { ButtonVariant, ButtonTone } from "./Types";

type VariantStyleMap = {
  tones: Record<ButtonTone, string>;
  disabled: string;
};

export const StyleMap: Record<ButtonVariant, VariantStyleMap> = {
  primary: {
    tones: {
      default: "bg-brand-primary text-inverse",
      dark: "bg-interaction-hover text-inverse",
      darker: "bg-interaction-pressed text-inverse",
    },
    disabled: "bg-interaction-inactive text-inverse",
  },
  secondary: {
    tones: {
      default: "bg-white text-brand-primary border border-brand-primary",
      dark: "bg-white text-interaction-hover border border-interaction-hover",
      darker:
        "bg-white text-interaction-pressed border border-interaction-pressed",
    },
    disabled:
      "bg-white text-interaction-inactive border border-interaction-inactive",
  },
  danger: {
    tones: {
      default: "bg-status-danger text-inverse",
      dark: "bg-status-danger-dark text-inverse",
      darker: "bg-status-danger-darker text-inverse",
    },
    disabled: "bg-status-danger/50 text-inverse/50",
  },
  ghost: {
    tones: {
      default: "bg-transparent text-brand-primary border border-brand-primary",
      dark: "bg-transparent text-interaction-hover border border-interaction-hover",
      darker:
        "bg-transparent text-interaction-pressed border border-interaction-pressed",
    },
    disabled:
      "bg-transparent text-interaction-inactive border border-interaction-inactive",
  },
};
