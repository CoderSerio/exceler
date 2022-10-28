// export const excel = {
//   selectFile: () => {
//     document.getElementById('file').click();
//   },
//   // 读取本地excel文件
//   readWorkbookFromLocalFile: (file, callback) => {
//       var reader = new FileReader();
//       reader.onload = function(e) {
//           var data = e.target.result;
//           var workbook = XLSX.read(data, {type: 'binary'});
//           if(callback) callback(workbook);
//       };
//       reader.readAsBinaryString(file);
//   },
//   // 从网络上读取某个excel文件，url必须同域，否则报错
//   readWorkbookFromRemoteFile: (url, callback) => {
//       var xhr = new XMLHttpRequest();
//       xhr.open('get', url, true);
//       xhr.responseType = 'arraybuffer';
//       xhr.onload = function(e) {
//           if(xhr.status == 200) {
//               var data = new Uint8Array(xhr.response)
//               var workbook = XLSX.read(data, {type: 'array'});
//               if(callback) callback(workbook);
//           }
//       };
//       xhr.send();
//   },
//   // 读取 excel文件
//   outputWorkbook: (workbook) => {
//       var sheetNames = workbook.SheetNames; // 工作表名称集合
//       sheetNames.forEach(name => {
//           var worksheet = workbook.Sheets[name]; // 只能通过工作表名称来获取指定工作表
//           for(var key in worksheet) {
//               // v是读取单元格的原始值
//               console.log(key, key[0] === '!' ? worksheet[key] : worksheet[key].v);
//           }
//       });
//   },
//   readWorkbook: (workbook) => {
//       var sheetNames = workbook.SheetNames; // 工作表名称集合
//       var worksheet = workbook.Sheets[sheetNames[0]]; // 这里我们只读取第一张sheet
//       var csv = XLSX.utils.sheet_to_csv(worksheet);
//       document.getElementById('result').innerHTML = csv2table(csv);
//   },
//   // 将csv转换成表格
//   csv2table: (csv) => {
//       var html = '<table>';
//       var rows = csv.split('\n');
//       rows.pop(); // 最后一行没用的
//       rows.forEach(function(row, idx) {
//           var columns = row.split(',');
//           columns.unshift(idx+1); // 添加行索引
//           if(idx == 0) { // 添加列索引
//               html += '<tr>';
//               for(var i=0; i<columns.length; i++) {
//                   html += '<th>' + (i==0?'':String.fromCharCode(65+i-1)) + '</th>';
//               }
//               html += '</tr>';
//           }
//           html += '<tr>';
//           columns.forEach(function(column) {
//               html += '<td>'+column+'</td>';
//           });
//           html += '</tr>';
//       });
//       html += '</table>';
//       return html;
//   },
//   table2csv: (table) => {
//       var csv = [];
//       $(table).find('tr').each(function() {
//           var temp = [];
//           $(this).find('td').each(function() {
//               temp.push($(this).html());
//           })
//           temp.shift(); // 移除第一个
//           csv.push(temp.join(','));
//       });
//       csv.shift();
//       return csv.join('\n');
//   },
//   // csv转sheet对象
//   csv2sheet: (csv) => {
//       var sheet = {}; // 将要生成的sheet
//       csv = csv.split('\n');
//       csv.forEach(function(row, i) {
//           row = row.split(',');
//           if(i == 0) sheet['!ref'] = 'A1:'+String.fromCharCode(65+row.length-1)+(csv.length-1);
//           row.forEach(function(col, j) {
//               sheet[String.fromCharCode(65+j)+(i+1)] = {v: col};
//           });
//       });
//       return sheet;
//   },
//   // 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
//   sheet2blob: (sheet, sheetName) => {
//       sheetName = sheetName || 'sheet1';
//       var workbook = {
//           SheetNames: [sheetName],
//           Sheets: {}
//       };
//       workbook.Sheets[sheetName] = sheet;
//       // 生成excel的配置项
//       var wopts = {
//           bookType: 'xlsx', // 要生成的文件类型
//           bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
//           type: 'binary'
//       };
//       var wbout = XLSX.write(workbook, wopts);
//       var blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
//       // 字符串转ArrayBuffer
//       function s2ab(s) {
//           var buf = new ArrayBuffer(s.length);
//           var view = new Uint8Array(buf);
//           for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
//           return buf;
//       }
//       return blob;
//   },

//   /**
//    * 通用的打开下载对话框方法，没有测试过具体兼容性
//    * @param url 下载地址，也可以是一个blob对象，必选
//    * @param saveName 保存文件名，可选
//    */
//   openDownloadDialog: (url, saveName) => {
//       if(typeof url == 'object' && url instanceof Blob)
//       {
//           url = URL.createObjectURL(url); // 创建blob地址
//       }
//       var aLink = document.createElement('a');
//       aLink.href = url;
//       aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
//       var event;
//       if(window.MouseEvent) event = new MouseEvent('click');
//       else
//       {
//           event = document.createEvent('MouseEvents');
//           event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
//       }
//       aLink.dispatchEvent(event);
//   },

//   // $(function() {
//   //     document.getElementById('file').addEventListener('change', function(e) {
//   //         var files = e.target.files;
//   //         if(files.length == 0) return;
//   //         var f = files[0];
//   //         if(!/\.xlsx?$/g.test(f.name)) {
//   //             alert('仅支持读取xlsx格式！');
//   //             return;
//   //         }
//   //         readWorkbookFromLocalFile(f, function(workbook) {
//   //             readWorkbook(workbook);
//   //         });
//   //     });
//   //     loadRemoteFile('./sample/test.xlsx');
//   // });

//   loadRemoteFile: (url) => {
//       readWorkbookFromRemoteFile(url, function(workbook) {
//           readWorkbook(workbook);
//       });
//   },

//   exportExcel: () => {
//       var csv = table2csv($('#result table')[0]);
//       var sheet = csv2sheet(csv);
//       var blob = sheet2blob(sheet);
//       openDownloadDialog(blob, '导出.xlsx');
//   },

//   exportSpecialExcel: () => {
//       var aoa = [
//           ['主要信息', null, null, '其它信息'], // 特别注意合并的地方后面预留2个null
//           ['姓名', '性别', '年龄', '注册时间'],
//           ['张三', '男', 18, new Date()],
//           ['李四', '女', 22, new Date()]
//       ];
//       var sheet = XLSX.utils.aoa_to_sheet(aoa);
//       sheet['!merges'] = [
//           // 设置A1-C1的单元格合并
//           {s: {r: 0, c: 0}, e: {r: 0, c: 2}}
//       ];
//       openDownloadDialog(sheet2blob(sheet), '单元格合并示例.xlsx');
//   }
// }
