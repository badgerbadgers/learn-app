// content should be an html which you want to send to the recipient
const emailTemplate = (content) => {
  return `
          <html>
          <body>
              <div style="text-align: left;">
                   ${content}
              </div>
          </body>
          </html>
      `;
};
export default emailTemplate;
