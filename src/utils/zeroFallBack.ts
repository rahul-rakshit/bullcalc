function zeroFallback(input: string) {
  if (input !== "") {
    return input;
  }

  return "0";
}

export default zeroFallback;
