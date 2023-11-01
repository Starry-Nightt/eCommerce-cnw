const FormRules = {
  email: [
    { required: true, message: "Please input your email!" },
    {
      pattern:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: "Invalid email",
    },
  ],
  username: [{ required: true, message: "Please input your username!" }],
  password: [
    { required: true, message: "Please input your password!" },
    { min: 6, message: "Password should have at least 6 character" },
  ],
};

export default FormRules;
