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
