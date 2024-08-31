import { useNavigate } from "react-router-dom";

interface HeaderProps {
title: string
textButton?: string
}

export function Header({title, textButton}: HeaderProps) {
  const navigate = useNavigate();
  return (
    <div className="d-flex align-items-start justify-content-between">
      <h2 className="fw-normal mb-4" style={{ color: "var(--gray-75)" }}>
        {title}
      </h2>
      {textButton && <button onClick={() => navigate("new")} className="btn text-bg-primary">
        + {textButton}
      </button>}
    </div>
  );
}
