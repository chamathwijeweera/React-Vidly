import React from "react";
import _ from "lodash";
import PropType from "prop-types";

const Pagination = props => {
  const { itemCount, pageSize, currentPage, onPageChange } = props;
  const pageCount = itemCount / pageSize;
  const pages = _.range(1, pageCount + 1);

  if (Math.ceil(pages) === 1) return null;

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemCount: PropType.number.isRequired,
  pageSize: PropType.number.isRequired,
  currentPage: PropType.number.isRequired,
  onPageChange: PropType.func.isRequired
};

export default Pagination;
