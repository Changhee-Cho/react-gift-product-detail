import { css } from '@emotion/react';
import theme from '@src/styles/tokens/index';
import PresentCard from '@/components/PresentCard';
import OrderForm from '@/components/OrderForm';
import ItemInfo from '@/components/ItemInfo';
import RecipientFormList from '@/components/RecipientFormList';
import type { OrderSchema } from '@src/hooks/useOrderForm';
import { FormProvider } from 'react-hook-form';
import useOrderFormComplete, {
  type SenderSchema,
} from '@/hooks/useOrderFormComplete';
import { useParams } from 'react-router-dom';
import { Suspense, useState } from 'react';
import { useUserInfo } from '@/contexts/AuthContext';
import { useFetchProduct } from '@/hooks/useFetchProduct';
import { useCreateOrder } from '@/hooks/useCreateOrder';
import PageLoading from '@/components/common/PageLoading';

const sectionStyle = css`
  width: 100%;
  padding-bottom: 3.125rem;
  background-color: ${theme.colors.gray00};
`;

const buttonStyle = css`
  width: 100%;
  max-width: 720px;
  height: 3.125rem;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: 0px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(254, 229, 0);
  color: rgb(42, 48, 56);
  transition:
    background-color 200ms,
    color 200ms;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;
  border: 0;
  cursor: pointer;
`;

const space24 = css`
  height: 24px;
`;

const OrderContent = () => {
  const { productId } = useParams();
  const { product } = useFetchProduct(productId);
  const [recipients, setRecipients] = useState<OrderSchema[]>([]);
  const [recipientModalOpen, setRecipientModalOpen] = useState(false);
  const methods = useOrderFormComplete();
  const { handleSubmit } = methods;
  const { user } = useUserInfo();

  const { createOrder, isOrdering } = useCreateOrder({
    userToken: user?.authToken,
    recipients,
    product,
  });

  const unitPrice = product?.price || 0;
  const totalRecipientQuantity = recipients.reduce(
    (sum, r) => sum + (Number(r.quantity) || 0),
    0
  );
  const totalOrderPrice = unitPrice * totalRecipientQuantity;

  const onSubmit = (data: SenderSchema) => {
    createOrder(data);
  };

  if (isOrdering) return <PageLoading />;

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section css={sectionStyle}>
            <PresentCard />
            <OrderForm
              onOpenRecipientModal={() => setRecipientModalOpen(true)}
              recipients={recipients}
            />
            {product && <ItemInfo product={product} />}
            <div css={space24} />
            <button type="submit" css={buttonStyle}>
              {totalOrderPrice.toLocaleString()}원 주문하기
            </button>
          </section>
        </form>
      </FormProvider>

      <RecipientFormList
        open={recipientModalOpen}
        onClose={() => setRecipientModalOpen(false)}
        recipients={recipients}
        setRecipients={setRecipients}
      />
    </>
  );
};

const Order = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <OrderContent />
    </Suspense>
  );
};

export default Order;
