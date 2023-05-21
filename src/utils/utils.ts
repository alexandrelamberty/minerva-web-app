export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatError = (err: any) => {
  if (err.code === "ERR_BAD_REQUEST") {
    const messages = err.response.data.msg.toString();
    return messages;
  } else if (err.message) return err.message;
};

export const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};
