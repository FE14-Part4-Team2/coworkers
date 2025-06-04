export const validateField = (
  name: string,
  value: string,
  formData: Record<string, string> = {},
): string => {
  switch (name) {
    case "email":
      if (!value) return "이메일은 필수 입력입니다.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "이메일 형식으로 작성해 주세요.";
      return "";

    case "name":
      if (!value) return "이름은 필수 입력입니다.";
      if (value.length > 20) return "이름은 최대 20자까지 가능합니다.";
      return "";

    case "password":
      const hasLetter = /[A-Za-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecial = /[!@#$%^&*]/.test(value);

      if (!value) return "비밀번호는 필수 입력입니다.";
      if (value.length < 8) return "비밀번호는 최소 8자 이상입니다.";
      if (!/^[A-Za-z0-9!@#$%^&*]+$/.test(value))
        return "비밀번호는 숫자, 영문, 특수문자로만 가능합니다.";
      if (!hasLetter || !hasNumber || !hasSpecial)
        return "비밀번호는 숫자, 영문, 특수문자를 모두 포함해야 합니다.";
      return "";

    case "confirmPassword":
      if (!value) return "비밀번호 확인을 입력해주세요.";
      if (value !== formData.password) return "비밀번호가 일치하지 않습니다.";
      return "";

    default:
      return "";
  }
};
