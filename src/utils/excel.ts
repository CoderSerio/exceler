const number2char = (num: number) => {
  if (num <= 0) {
    return '';
  }
  let n = num;
  let reversedRes = ''
  const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  while(Math.floor(n)) {
    n --;
    let index = n % 26;
    n = Math.floor(n / 26);
    reversedRes += charSet[index];
  }
  const res = reversedRes.split('').reverse().join('');
  return res;
}

const transferAllFileData2ExcleStyle = () => {

}

export {
  number2char,
  transferAllFileData2ExcleStyle
}
