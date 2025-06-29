// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNullOrEmpty = (value: any) => {
  return (
    !value ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    value === ""
  );
};

export const normalizeText = (text: string) =>
  text
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .toLowerCase();