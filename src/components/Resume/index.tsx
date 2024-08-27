import { useEffect, useState } from "react";
import { ResumeItem } from "../ResumeItem";
import toast from "react-hot-toast";

const items = [
  { title: "Produto", subtitle: "Descrição breve", amount: 10 },
  { title: "Produto", subtitle: "Descrição breve", amount: 50 },
];

export function Resume() {
  const [itemList, setItemList] = useState(items);
  const [promoCode, setPromoCode] = useState("");
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [isCodeApplied, setIsCodeApplied] = useState(false);

  useEffect(() => {
    setItemList(items);
  }, []);

  const total = itemList.reduce((acc, item) => acc + item.amount, 0);

  const applyDiscount = (code: string) => {
    if (code === "IFPEMARVIE") {
      const discount = 0.1;
      const newTotal = total - total * discount;
      setDiscountedTotal(newTotal);
      setIsCodeApplied(true);
      setPromoCode("");
      toast.success("Cupom aplicado!");
    } else {
      setDiscountedTotal(total);
      setIsCodeApplied(false);
      toast.error("Cupom inválido");
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    applyDiscount(promoCode.toUpperCase());
  };

  const formattedTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(discountedTotal !== 0 ? discountedTotal : total);

  return (
    <div className="col-md-5 col-lg-4 order-md-last">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-primary">Seu carrinho</span>
        <span className="badge bg-primary rounded-pill">{items.length}</span>
      </h4>
      <ul className="list-group mb-3">
        {itemList.map((item, index) => (
          <ResumeItem
            key={index}
            title={`${item.title} ${index + 1}`}
            subtitle={item.subtitle}
            amount={new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(item.amount)}
          />
        ))}
        {isCodeApplied && (
          <ResumeItem
            isCode
            amount={new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(discountedTotal - total)}
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
