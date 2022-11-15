import { AllFiles, ColField, OneFile, RowData } from "renderer/store/reducers/types";

const number2char = (num: number) => {
  if (num <= 0) {
    return '';
  }
  let n = num;
  let reversedRes = '';
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

const getKeys = (rows: Array<RowData>, fileName: string, disable:boolean = true): Array<ColField> => {
  const allColFieldsSet: Set<string> = new Set();
  rows.map((oneRow: {[key: string]: string}) => {
    Object.keys(oneRow).map((oneColField) => {
      allColFieldsSet.add(oneColField);
    })
  })
  const allColFields: Array<ColField> = [];
  allColFieldsSet.forEach((oneColField: string) => {
    allColFields.push(
      {
        name: oneColField,
        disable: disable,
        from: fileName
      });
  })
  return allColFields;
}

const generateTotalExcelFile = async (allFiles: AllFiles): Promise<OneFile> => {
  const totalRows: Array<RowData> = [];
  allFiles.forEach((oneFile) => {
    totalRows.push(...oneFile.allRows);
  });
  const totalCols: Array<ColField> = [...getKeys(totalRows, '总表')];
  return  Promise.resolve({
    allRows: totalRows,
    allColFields: totalCols,
    id: '总表',
  })
}


export {
  number2char,
  transferAllFileData2ExcleStyle,
  getKeys,
  generateTotalExcelFile,
}
