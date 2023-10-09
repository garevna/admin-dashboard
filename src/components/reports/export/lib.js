module.exports = {
  toBase64: s => window.btoa(unescape(encodeURIComponent(s))),
  format: function (s, c) {
    return s.replace(/{(\w+)}/g, function (m, p) { return c[p] })
  },
  downloadTable: function (dataURL, name) {
    var link = document.createElement('a')
    link.download = name
    link.href = dataURL
    link.click()
  },
  template: `
  <html xmlns:o="urn:schemas-microsoft-com:office:office"
        xmlns:x="urn:schemas-microsoft-com:office:excel"
        xmlns="http://www.w3.org/TR/REC-html40"
  >
    <head>
      <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>
                  {worksheet}
                </x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
      <![endif]-->
      <meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>
    </head>

    <body>
      <style>
        table {
          font-family: Arial;
          font-size: 12px;
          border-collapse: collapse;
        }
        td, th {
          border: solid 1px #999;
          padding: 4px 8px;
        }
      </style>
      <table>{table}</table>
    </body>
  </html>`
}
