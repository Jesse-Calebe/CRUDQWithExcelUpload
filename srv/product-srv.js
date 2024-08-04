const cds = require("@sap/cds");

class ProductImpl extends cds.ApplicationService {
  init() {
    this.before("CREATE", "Files", (req) => {
      console.log("Create called");
      console.log(JSON.stringify(req.data));
      req.data.url = `/attachments/Files(${req.data.ID})/content`;
    });

    this.on("UPDATE", "Files", async (req) => {
      if (req.data.content) {
        var entity = req.headers.slug;
        // const stream = new PassThrough();
        const stream = req.data.content;
        var buffers = [];
        req.data.content.pipe(stream);
        await new Promise((resolve, reject) => {
          stream.on("data", (dataChunk) => {
            buffers.push(dataChunk);
          });
          stream.on("end", async () => {
            var buffer = Buffer.concat(buffers);
            var workbook = XLSX.read(buffer, {
              type: "buffer",
              cellText: true,
              cellDates: true,
              dateNF: 'dd"."mm"."yyyy',
              cellNF: true,
              rawNumbers: false,
            });
            let data = [];
            const sheets = workbook.SheetNames;
            for (let i = 0; i < sheets.length; i++) {
              const temp = XLSX.utils.sheet_to_json(
                workbook.Sheets[workbook.SheetNames[i]],
                {
                  cellText: true,
                  cellDates: true,
                  dateNF: 'dd"."mm"."yyyy',
                  rawNumbers: false,
                }
              );
              temp.forEach((res, index) => {
                if (index === 0) return;
                data.push(JSON.parse(JSON.stringify(res)));
              });
            }
            if (data) {
              const responseCall = await CallEntity(entity, data);
              if (responseCall == -1)
                reject(req.error(400, JSON.stringify(data)));
              else {
                resolve(
                  req.notify({
                    message: "Upload Successful",
                    status: 200,
                  })
                );
              }
            }
          });
        });
      } else {
        return next();
      }
    });

    super.init();
  }
}

module.exports = ProductImpl;
