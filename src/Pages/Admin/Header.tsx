interface HeaderProps {
link?: string
title: string
textButton?: string
}

export function Header({link, title, textButton}: HeaderProps) {
  return (
    <div className="d-flex align-items-start justify-content-between">
      <h2 className="fw-normal mb-4" style={{ color: "var(--gray-75)" }}>
        {title}
      </h2>
      {link && textButton && <a href={link} className="btn text-bg-primary">
        + {textButton}
      </a>}
    </div>
  );
}
