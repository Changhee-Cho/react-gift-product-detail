import { useState } from 'react';
import { css } from '@emotion/react';
import theme from '@/styles/tokens';

const itemDetailSection = css`
  width: 100%;
  background-color: ${theme.colors.backgroundDefault};
`;
const itemDetailAreaDiv = css`
  width: 100%;
`;
const itemDetailButtonDiv = css`
  display: flex;
  position: relative;
  border-bottom: 1px solid ${theme.colors.borderDisabled};
`;
const buttonStyle = css`
  position: relative;
  padding: 16px 20px;
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 0%;
`;
const focusedButtonP = css`
  font-size: ${theme.typography.body1Regular.fontSize};
  font-weight: ${theme.typography.body1Regular.fontWeight};
  line-height: ${theme.typography.body1Regular.lineHeight};
  color: ${theme.colors.textDefault};
  margin: 0px;
  text-align: left;
`;
const notFocusedButtonP = css`
  font-size: ${theme.typography.body1Regular.fontSize};
  font-weight: ${theme.typography.body1Regular.fontWeight};
  line-height: ${theme.typography.body1Regular.lineHeight};
  color: ${theme.colors.textSub};
  margin: 0px;
  text-align: left;
`;
const focusedButtonUnderline = css`
  position: absolute;
  bottom: -1px;
  left: 0px;
  right: 0px;
  height: 2px;
  background-color: ${theme.colors.gray900};
`;
const notFocusedButtonUnderline = css`
  display: none;
`;

const itemDetailBox = css`
  min-height: 400px;
`;
const itemDetailContentBox = css`
  width: 100%;
`;
const itemDetailContentInner = css`
  width: 100%;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
`;
const itemDetailContentDiv = css`
  white-space: pre-wrap;
  max-width: 100%;
  width: 100%;
  overflow-y: hidden;
  font-size: ${theme.typography.body1Regular.fontSize};
  font-weight: ${theme.typography.body1Regular.fontWeight};
  line-height: ${theme.typography.body1Regular.lineHeight};
`;
const itemDetailContentP = css`
  width: 100%;
`;
const itemDetailContentImg = css`
  width: 100%;
`;
const reviewTitle = css`
  font-size: ${theme.typography.body2Bold.fontSize};
  font-weight: ${theme.typography.body2Bold.fontWeight};
  line-height: ${theme.typography.body2Bold.lineHeight};
  color: ${theme.colors.textDefault};
  margin: 0px;
  text-align: left;
  display: block;
`;
const reviewContent = css`
  font-size: ${theme.typography.body1Regular.fontSize};
  font-weight: ${theme.typography.body1Regular.fontWeight};
  line-height: ${theme.typography.body1Regular.lineHeight};
  color: ${theme.colors.textDefault};
  margin: 0px;
  text-align: left;
  display: block;
`;
const detailTitle = css`
  font-size: ${theme.typography.body2Bold.fontSize};
  font-weight: ${theme.typography.body2Bold.fontWeight};
  line-height: ${theme.typography.body2Bold.lineHeight};
  color: ${theme.colors.textDefault};
  margin: 0px;
  text-align: left;
`;
const detailContent = css`
  font-size: ${theme.typography.body1Regular.fontSize};
  font-weight: ${theme.typography.body1Regular.fontWeight};
  line-height: ${theme.typography.body1Regular.lineHeight};
  color: ${theme.colors.textDefault};
  margin: 0px;
  white-space: pre-wrap;
  text-align: left;
`;
const noReviewNotice = css`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const spacer8 = css`
  height: ${theme.spacing.spacing2};
  background-color: transparent;
`;
const spacer16 = css`
  height: ${theme.spacing.spacing4};
  background-color: transparent;
`;

type Tab = 'description' | 'review' | 'details';

type Review = {
  id: string;
  authorName: string;
  content: string;
};

type DetailAnnouncement = {
  name: string;
  value: string;
  displayOrder: number;
};

type Props = {
  info?: {
    imageURL?: string;
  };
  review?: {
    reviews?: Review[];
  };
  detail?: {
    announcements?: DetailAnnouncement[];
  };
};

const ProductDetailTabs = ({ info, review, detail }: Props) => {
  const [selectedTab, setSelectedTab] = useState<Tab>('description');

  const renderTabButton = (label: string, tab: Tab) => (
    <button css={buttonStyle} onClick={() => setSelectedTab(tab)} key={tab}>
      <p css={selectedTab === tab ? focusedButtonP : notFocusedButtonP}>
        {label}
      </p>
      <div
        css={
          selectedTab === tab
            ? focusedButtonUnderline
            : notFocusedButtonUnderline
        }
      />
    </button>
  );

  return (
    <section css={itemDetailSection}>
      <div css={itemDetailAreaDiv}>
        <div css={itemDetailButtonDiv}>
          {renderTabButton('상품설명', 'description')}
          {renderTabButton('선물후기', 'review')}
          {renderTabButton('상세정보', 'details')}
        </div>
        <div css={itemDetailBox}>
          <div css={itemDetailContentBox}>
            <div css={itemDetailContentInner}>
              {selectedTab === 'description' && (
                <div css={itemDetailContentDiv}>
                  <p css={itemDetailContentP}>
                    <img
                      css={itemDetailContentImg}
                      src={info?.imageURL}
                      alt="상품 설명"
                    />
                  </p>
                </div>
              )}
              {selectedTab === 'review' && Array.isArray(review?.reviews) && (
                <div>
                  {review.reviews.length === 0 ? (
                    <div css={noReviewNotice}>
                      <p css={itemDetailContentP}>
                        아직 등록된 리뷰가 없습니다.
                      </p>
                    </div>
                  ) : (
                    review.reviews.map((r) => (
                      <div key={r.id}>
                        <div css={spacer16} />
                        <p css={reviewTitle}>{r.authorName}</p>
                        <div css={spacer8} />
                        <p css={reviewContent}>{r.content}</p>
                        <div css={spacer8} />
                      </div>
                    ))
                  )}
                </div>
              )}
              {selectedTab === 'details' && (
                <div css={itemDetailContentDiv}>
                  {!detail?.announcements ||
                  detail.announcements.length === 0 ? (
                    <div css={noReviewNotice}>
                      <p css={itemDetailContentP}>상세 정보가 없습니다.</p>
                    </div>
                  ) : (
                    [...detail.announcements]
                      .sort((a, b) => a.displayOrder - b.displayOrder)
                      .map(({ name, value }) => (
                        <div key={name}>
                          <div css={spacer16} />
                          <p css={detailTitle}>{name}</p>
                          <div css={spacer8} />
                          <p css={detailContent}>{value}</p>
                        </div>
                      ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailTabs;
