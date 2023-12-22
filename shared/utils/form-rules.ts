const FormRules = {
  email: [
    { required: true, message: "Vui lòng nhập email" },
    {
      pattern:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: "Email không hợp lệ",
    },
  ],
  name: [{ required: true, message: "Vui lòng nhập tên đăng nhập" }],
  password: [
    { required: true, message: "Vui lòng nhập mật khẩu" },
    { min: 6, message: "Mật khẩu phải gồm ít nhất 6 ký tự" },
  ],
  phone: [
    { required: true, message: "Vui lòng nhập số điện thoại" },
    {
      pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
      message: "Số điện thoại không hợp lệ",
    },
  ],
};

export default FormRules;
