interface StaticsProps {
  count: number;
  text: string;
}

export function Statics({ count, text }: StaticsProps) {
  return (
    <div className="text-white w-100">
      <div className="d-flex align-items-center gap-2 p-4 h-100" style={{ background: "var(--gray-75)" }}>
        <h1>
          <strong>{count}</strong>
        </h1>
        <small>{text}</small>
      </div>
    </div>
  );
}
