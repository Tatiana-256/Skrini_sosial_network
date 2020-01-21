import React, { useState } from "react";
import classes from "./Pagination.module.css";

let Pagination = ({
  totalUsersCount,
  pageSize,
  currentPage,
  onPageChanged,
  blockSize = 10
}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let blockCount = Math.ceil(pagesCount / blockSize);
  let [blockNumber, setBlockNumber] = useState(1);
  let leftBlockPageNumber = (blockNumber - 1) * blockSize + 1;
  let rightBlockPageNumber = blockNumber * blockSize;

  return (
    <div className={classes.pages}>
      {blockNumber > 1 && (
        <button
          className={classes.btn}
          onClick={() => {
            setBlockNumber(blockNumber - 1);
          }}
        >
          Previous pages block{" "}
        </button>
      )}
      {pages
        .filter(p => p >= leftBlockPageNumber && p <= rightBlockPageNumber)
        .map(p => {
          return (
            <span
              className={currentPage === p && classes.selected}
              onClick={e => {
                onPageChanged(p);
              }}
            >
              {p}
            </span>
          );
        })}
      {blockCount > blockNumber && (
        <button
          className={classes.btn}
          onClick={() => {
            setBlockNumber(blockNumber + 1);
          }}
        >
          Next pages block
        </button>
      )}
    </div>
  );
};

export default Pagination;
