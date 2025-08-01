import { css } from '@emotion/react';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import theme from '@src/styles/tokens/index';
import useRankingProducts from '@src/hooks/useRankingProducts';
import ProductRankingList from '@src/components/ProductRankingList';
import Loading from '@src/components/common/Loading';
import type { RankingSectionType } from '@/types/rankingSectionType';

const targets = [
  { key: 'ALL', label: '전체', icon: 'ALL' },
  { key: 'FEMALE', label: '여성이', icon: '👩🏻' },
  { key: 'MALE', label: '남성이', icon: '👨🏻' },
  { key: 'TEEN', label: '청소년이', icon: '👦🏻' },
];

const sortOptions = [
  { key: 'MANY_WISH', label: '받고 싶어한' },
  { key: 'MANY_RECEIVE', label: '많이 선물한' },
  { key: 'MANY_WISH_RECEIVE', label: '위시로 받은' },
];

const targetButton = css`
  width: 3.625rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
`;

const buttonDivBase = css`
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.1875rem;
  transition: background-color 200ms;
`;

const buttonPBase = css`
  font-size: 0.8rem;
  line-height: 1.1875rem;
  margin: 0px;
  text-align: left;
`;

const sectionRealtimeStyle = css`
  padding: 0px 16px;
  width: 100%;
  box-sizing: border-box;
`;

const h3Style = css`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.6875rem;
  color: ${theme.colors.textDefault};
  margin: 0px;
  width: 100%;
  text-align: left;
`;

const buttonList = css`
  display: flex;
  border-radius: 1rem;
  background-color: white;
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

const targetList = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
`;

const selectBox = css`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  border: 1px solid rgba(70, 132, 233, 0.1);
  background-color: ${theme.colors.blue100};
  border-radius: 0.5rem;
  padding: 12px 16px;
  gap: 8px;
`;

const selectContent = css`
  background: none;
  border: none;
  width: 100%;
  flex: 1 1 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.1875rem;
  color: ${theme.colors.blue500};
  transition:
    color 200ms,
    font-weight 200ms;
  cursor: pointer;
`;

const selectedContent = css`
  background: none;
  border: none;
  width: 100%;
  flex: 1 1 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.1875rem;
  color: ${theme.colors.blue700};
  transition:
    color 200ms,
    font-weight 200ms;
  cursor: pointer;
`;

const rankingDiv = css`
  width: 100%;
`;

const moreButtonCover = css`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

const moreButton = css`
  max-width: 30rem;
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid ${theme.colors.textDisabled};
  background: none;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const moreButtonText = css`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.1875rem;
  color: ${theme.colors.textDefault};
  margin: 0px;
  width: 100%;
  text-align: center;
`;

const spacer40 = css`
  height: 40px;
`;
const spacer16 = css`
  height: 16px;
`;
const spacer32 = css`
  height: 32px;
`;
const spacer20 = css`
  height: 20px;
`;
const loadingStyle = css`
  width: 100%;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RankingSection = ({
  targetType,
  rankType,
  expanded,
  onToggleExpand,
}: RankingSectionType) => {
  const { products } = useRankingProducts({ targetType, rankType });

  return (
    <section css={rankingDiv}>
      {products.length === 0 ? (
        <div css={loadingStyle}>
          <p>상품이 없습니다.</p>
        </div>
      ) : (
        <>
          <ProductRankingList products={products} expanded={expanded} />
          <div css={spacer32} />
          <div css={moreButtonCover}>
            <button
              css={moreButton}
              type="button"
              onClick={onToggleExpand}
              disabled={products.length === 0}
            >
              <p css={moreButtonText}>{expanded ? '접기' : '더보기'}</p>
            </button>
          </div>
        </>
      )}
    </section>
  );
};

const Realtime = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramTarget = searchParams.get('targetType');
  const paramSort = searchParams.get('rankType');

  const DEFAULT_TARGET = 'ALL';
  const DEFAULT_SORT = 'MANY_WISH';

  const initialTarget = paramTarget || DEFAULT_TARGET;
  const initialSort = paramSort || DEFAULT_SORT;

  const [selectedTarget, setSelectedTarget] = useState(initialTarget);
  const [selectedSort, setSelectedSort] = useState(initialSort);
  const [userHasSelected, setUserHasSelected] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!userHasSelected && [...searchParams].length === 0) {
      if (selectedTarget === DEFAULT_TARGET && selectedSort === DEFAULT_SORT) {
        setSearchParams({});
      } else {
        setSearchParams({
          targetType: selectedTarget,
          rankType: selectedSort,
        });
      }
    } else {
      setSearchParams({
        targetType: selectedTarget,
        rankType: selectedSort,
      });
    }
  }, [selectedTarget, selectedSort, userHasSelected, setSearchParams]);

  const getButtonDivStyle = (key: string) => css`
    ${buttonDivBase};
    color: ${key === selectedTarget ? 'white' : theme.colors.blue400};
    background-color: ${key === selectedTarget
      ? theme.colors.blue700
      : theme.colors.blue100};
  `;
  const getButtonPStyle = (key: string) => css`
    ${buttonPBase};
    font-weight: ${key === selectedTarget ? 700 : 400};
    color: ${key === selectedTarget
      ? theme.colors.blue700
      : theme.colors.gray700};
  `;

  const handleSelectTarget = (key: string) => {
    setSelectedTarget(key);
    setUserHasSelected(true);
    setExpanded(false);
  };

  const handleSelectSort = (key: string) => {
    setSelectedSort(key);
    setUserHasSelected(true);
    setExpanded(false);
  };

  return (
    <>
      <div css={spacer40} />
      <section css={sectionRealtimeStyle}>
        <h3 css={h3Style}>실시간 급상승 선물랭킹</h3>
        <div css={spacer20} />
        <div css={buttonList}>
          <div css={targetList}>
            {targets.map((target) => (
              <button
                key={target.key}
                css={targetButton}
                onClick={() => handleSelectTarget(target.key)}
                type="button"
              >
                <div css={getButtonDivStyle(target.key)}>{target.icon}</div>
                <p css={getButtonPStyle(target.key)}>{target.label}</p>
              </button>
            ))}
          </div>
        </div>
        <div css={spacer16} />
        <div css={selectBox}>
          {sortOptions.map(({ key, label }) => (
            <button
              key={key}
              css={key === selectedSort ? selectedContent : selectContent}
              onClick={() => handleSelectSort(key)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
        <div css={spacer16} />

        <Suspense fallback={<Loading />}>
          <RankingSection
            targetType={selectedTarget}
            rankType={selectedSort}
            expanded={expanded}
            onToggleExpand={() => setExpanded((prev) => !prev)}
          />
        </Suspense>
      </section>
      <div css={spacer40} />
    </>
  );
};

export default Realtime;
