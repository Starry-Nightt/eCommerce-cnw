import { Input, Space } from "antd";
import React from "react";
const { Search } = Input;

interface Props {
  value?: string;
  placeholder?: string;
  className?: string;
  onSearch?: any;
}

function TableSearch({ value, onSearch, placeholder, className }: Props) {
  return (
    <Search
      value={value}
      placeholder={placeholder ?? "Nhập từ khóa tìm kiếm"}
      className={className}
      onSearch={onSearch}
      enterButton
      style={{width: "fit-content"}}
    />
  );
}

export default TableSearch;
