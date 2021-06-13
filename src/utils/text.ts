export const parseTitle = (title: string) => {
  if (title)
    return cutString(
      title
        .split("-")
        .map((t) => t[0].toUpperCase() + t.slice(1).toLowerCase())
        .join(" "),
      11
    );
};

export const cutString = (text: string, len: number) =>
  text?.split(" ").length < len
    ? text
    : text?.split(" ").slice(0, len).join(" ") + " ...";
