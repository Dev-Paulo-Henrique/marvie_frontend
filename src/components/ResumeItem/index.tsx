interface ResumeProps {
  title?: string;
  subtitle?: string;
  amount: string;
  isCode?: boolean;
  isTotal?: boolean;
}

export function ResumeItem({
  amount,
  subtitle,
  title,
  isCode,
  isTotal,
}: ResumeProps) {
  return (
    <li
      className={`list-group-item d-flex justify-content-between ${
        isCode ? "bg-light" : "lh-sm"
      }`}
    >
      {!isTotal ? (
        <>
          <div className={isCode ? "text-success" : ""}>
            <h6 className="my-0">{isCode ? "Código promocional" : title}</h6>
            <small className="text-muted">
              {isCode ? "IFPEMARVIE" : subtitle}
            </small>
          </div>
          <span className={isCode ? "text-success" : "text-muted"}>
            {amount}
          </span>
        </>
      ) : (
        <>
          <span>Total (BRL)</span>
          <strong>{amount}</strong>
        </>
      )}
    </li>
  );
}
