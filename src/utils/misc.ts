export const getAvatarArrayBuffer = (dataUrl: string) => {
  let arrayBuffer;

  const base64 = dataUrl.split("base64,")[1];
  if (base64) {
    const binary = atob(base64);
    const length = binary.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) bytes[i] = binary.charCodeAt(i);
    arrayBuffer = bytes.buffer;
  }

  return arrayBuffer;
};

export const substringText = (text: string, num: number) => {
  return text?.length > num ? `${text?.substring(0, num)}...` : text;
};

export const priorityColor = (prioritId: number | undefined) => {
  return {
    color:
      prioritId === 1 ? "#08a508" : prioritId === 2 ? "#f7bc30" : "#fa4d4d",
    borderColor:
      prioritId === 1 ? "#08a508" : prioritId === 2 ? "#f7bc30" : "#fa4d4d",
  };
};
