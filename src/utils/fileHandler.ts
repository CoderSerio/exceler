import { read, utils, writeFile, WorkSheet } from 'xlsx';

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

const xlsxFileRead = async (file: File) => {
  const res = await fileRead(file);
  const workSheet = read(res);
  const data = utils.sheet_to_json<ExcelData>(workSheet.Sheets[workSheet.SheetNames[0]]);
  return await Promise.resolve(data);
}

export {
  fileRead,
  xlsxFileRead
}
