import { RowData } from 'renderer/store/reducers/types';
import { read, utils, writeFile, WorkSheet, writeFileXLSX } from 'xlsx';

interface ExcelData {
  [key: string]: string,
}

const fileRead = (file: File): Promise<ArrayBuffer | string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function () {
      if (reader.result) {
        resolve(reader.result);
      } else {
        resolve('文件读取为空');
      }
    }
    reader.onerror = function (err) {
      reject(err);
    }
    reader.readAsArrayBuffer(file);
  })
}

const xlsx2json = async (file: File) => {
  const res = await fileRead(file);
  const workSheet = read(res);
  const data = utils.sheet_to_json<ExcelData>(workSheet.Sheets[workSheet.SheetNames[0]]);
  return await Promise.resolve(data);
}

const json2xlsx = (data: Array<RowData>, exportedName: string = '编辑后的表格.xlsx') => {
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Data");
  writeFileXLSX(wb, exportedName);
}

export {
  fileRead,
  xlsx2json,
  json2xlsx
}
