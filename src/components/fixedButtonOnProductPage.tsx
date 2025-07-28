import { css } from '@emotion/react';
import { ReactComponent as HeartIcon } from '@src/assets/icons/heart_Icon.svg';

const fixedButtonsDiv = css`
  width: 100%;
  max-width: 720px;
  height: 3.125rem;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: 0px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(255, 255, 255);
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
`;
const fixedHeartButton = css`
  cursor: pointer;
  width: 4rem;
  height: 3.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font: inherit;
  color: inherit;
  background: none;
  border: none;
  outline: none;
  appearance: none;
`;
const heartSvg = css`
  display: block;
  height: auto;
`;
const heartP = css`
  font-size: 0.625rem;
  font-weight: 400;
  line-height: 1rem;
  color: rgb(42, 48, 56);
  margin: 0px;
  text-align: left;
`;
const fixedOrderButton = css`
  cursor: pointer;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(254, 229, 0);
  font: inherit;
  color: inherit;
  border: none;
  outline: none;
  appearance: none;
`;
const orderButtonP = css`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.375rem;
  color: rgb(42, 48, 56);
  margin: 0px;
  text-align: left;
`;

type Props = {
  hearted: boolean;
  wishCount: number;
  onHeartClick: () => void;
  onOrderClick: () => void;
};

const FixedButtons = ({
  hearted,
  wishCount,
  onHeartClick,
  onOrderClick,
}: Props) => (
  <div css={fixedButtonsDiv}>
    <button css={fixedHeartButton} onClick={onHeartClick}>
      <HeartIcon
        css={heartSvg}
        fill={hearted ? '#fa342c' : '#ffffff'}
        stroke={hearted ? '#fa342c' : '#2a3038'}
      />
      <p css={heartP}>{wishCount}</p>
    </button>
    <button css={fixedOrderButton} onClick={onOrderClick}>
      <p css={orderButtonP}>주문하기</p>
    </button>
  </div>
);

export default FixedButtons;
