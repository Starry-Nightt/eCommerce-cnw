import { Input } from "antd";
import { SearchProps } from "antd/es/input/Search";
import { useRouter } from "next/router";
import React, { useState } from "react";

const { Search } = Input;

interface Props {
  className?: string;
  onSearchKey?: (key: string) => void;
}

function SearchBox({ className, onSearchKey }: Props) {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    onSearchKey(value);
  };

  return (
    <Search
      placeholder="Tìm kiếm sách"
      allowClear
      enterButton
      className={className}
      onSearch={onSearch}
    />
  );
}

export default SearchBox;
