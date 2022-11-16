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
  // 当前的冲突处理机制是, 如果A文件启用a字段, B文件禁用a字段, 则仍然显示a字段, 有启用则显示
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
        from: fileName,
      });
  })
  return allColFields;
}

const generateTotalExcelFile = async (allFiles: AllFiles, colField?: any): Promise<OneFile> => {
  const totalRows: Array<RowData> = [];
  const totalCols: Array<ColField> = [];
  const totalColsFieldSet: Set<string> = new Set();
  allFiles.forEach((oneFile) => {
    totalRows.push(...oneFile.allRows);
    oneFile.allColFields.forEach((oneColField) => {
      if (!totalColsFieldSet.has(oneColField.name)) {
        totalCols.push(oneColField);
        totalColsFieldSet.add(oneColField.name);
      }
    })
  });
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
