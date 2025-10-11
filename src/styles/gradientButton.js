import { createStyles } from "antd-style";

export const useGradientButtonStyle = createStyles(({ prefixCls, css }) => ({
  gradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      position: relative;
      overflow: hidden;
      border: none;

      > span {
        position: relative;
        z-index: 1;
      }

      &::before {
        content: '';
        background: linear-gradient(90deg, #4f46e5, #9333ea);
        position: absolute;
        inset: 0;
        transition: all 0.3s ease;
        border-radius: inherit;
        z-index: 0;
      }

      &:hover::before {
        filter: brightness(1.1);
      }
    }
  `,
}));
