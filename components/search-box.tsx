import { Input } from "antd";
import { SearchProps } from "antd/es/input/Search";
import { useRouter } from "next/router";
import React, { useState } from "react";

const { Search } = Input;

interface Props {
  className?: string;
  onSearchKey?: (key: string) => void;
  value?: string;
  onChange?: any
}

function SearchBox({ className, onSearchKey, value, onChange }: Props) {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    onSearchKey(value);
  };

  return (
    <Search
      placeholder="Tìm kiếm sách"
      allowClear
      enterButton
      className={className}
      value={value}
      onChange={onChange}
      onSearch={onSearch}
    />
  );
}

export default SearchBox;
