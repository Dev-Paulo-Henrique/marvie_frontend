import { useEffect, useState } from "react";
import { ResumeItem } from "../ResumeItem";
import { toast } from "react-toastify";

interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface ResumeProps {
  items: Item[];
  onDiscountApplied?: (newTotal: number) => void;
}

export function Resume({ items, onDiscountApplied }: ResumeProps) {
  const [itemList, setItemList] = useState(items);
  const [promoCode, setPromoCode] = useState("");
  const [discountedTotal, setDiscountedTotal] = useState<number | null>(null);
  const [isCodeApplied, setIsCodeApplied] = useState(false);

  useEffect(() => {
    setItemList(items);
  }, [items]);

  const total = itemList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const applyDiscount = (code: string) => {
    if (code === "IFPEMARVIE") {
      const discount = 0.1;
      const newTotal = total - total * discount;
      setDiscountedTotal(newTotal);
      setIsCodeApplied(true);
      setPromoCode("");
      if (onDiscountApplied) onDiscountApplied(newTotal);
      toast.success("Cupom aplicado!", {
        position: "top-center",
        toastId: "successCoupon",
        hideProgressBar: true,
        autoClose: 3000,
        pauseOnHover: false,
        closeButton: false,
        className: "text-center",
      });
    } else {
      setDiscountedTotal(total);
      setIsCodeApplied(false);
      if (onDiscountApplied) onDiscountApplied(total);
      toast.error("Cupom inválido", {
        position: "top-center",
        toastId: "errorCoupon",
        hideProgressBar: true,
        autoClose: 3000,
        pauseOnHover: false,
        closeButton: false,
        className: "text-center",
      });
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    applyDiscount(promoCode.toUpperCase());
  };

  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(discountedTotal !== null ? discountedTotal : total);

  return (
    <div className="col-md-5 col-lg-4 order-md-last">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-primary">Seu carrinho</span>
        <span className="badge bg-primary rounded-pill">
          {itemList.reduce((acc, item) => acc + item.quantity, 0)}
        </span>
      </h4>
      <ul className="list-group mb-3">
        {itemList.map((item, index) => (
          <ResumeItem
            key={index}
            title={`${item.name}`}
            subtitle={`Quantidade: ${item.quantity.toString()}`}
            amount={new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(item.price)}
          />
        ))}
        {isCodeApplied && (
          <ResumeItem
            isCode
            amount={new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(total - (discountedTotal ?? 0))}
          />
        )}
        <ResumeItem isTotal amount={formattedTotal} />
      </ul>

      <form className="card p-2" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control text-uppercase"
            placeholder="Código promocional"
            onChange={(e) => setPromoCode(e.target.value)}
            disabled={isCodeApplied}
          />
          <button
            type="submit"
            className="btn btn-secondary"
            disabled={isCodeApplied}
          >
            Resgatar
          </button>
        </div>
      </form>
    </div>
  );
}
