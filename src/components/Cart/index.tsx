export function Cart() {
  return (
    <div className="dropup position-fixed bottom-0 end-0 rounded-circle m-5" style={{ zIndex: 1 }}>
      <button
        type="button"
        className="btn btn-success btn-lg dropdown-toggle hide-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        aria-haspopup="true"
      >
        <i className="fa-solid fa-plus"></i>
        <span className="visually-hidden">Add Category</span>
      </button>
      <ul className="dropdown-menu">
        <li>
          <a className="dropdown-item" href="#">
            ...
          </a>
        </li>
      </ul>
    </div>
  );
}
