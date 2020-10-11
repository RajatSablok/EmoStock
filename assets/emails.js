const email = {
  tracker: (userName, companyName, status) => {
    return `
    <style>
  html {
    -webkit-text-size-adjust: none;
    -ms-text-size-adjust: none;
  }
  @media only screen and (min-device-width: 750px) {
    .table750 {
      width: 750px !important;
    }
  }
  @media only screen and (max-device-width: 750px),
    only screen and (max-width: 750px) {
    table[class="table750"] {
      width: 100% !important;
    }
    .mob_b {
      width: 93% !important;
      max-width: 93% !important;
      min-width: 93% !important;
    }
    .mob_b1 {
      width: 100% !important;
      max-width: 100% !important;
      min-width: 100% !important;
    }
    .mob_left {
      text-align: left !important;
    }
    .mob_soc {
      width: 50% !important;
      max-width: 50% !important;
      min-width: 50% !important;
    }
    .mob_menu {
      width: 50% !important;
      max-width: 50% !important;
      min-width: 50% !important;
      box-shadow: inset -1px -1px 0 0 rgba(255, 255, 255, 0.2);
    }
    .mob_center {
      text-align: center !important;
    }
    .top_pad {
      height: 15px !important;
      max-height: 15px !important;
      min-height: 15px !important;
    }
    .mob_pad {
      width: 15px !important;
      max-width: 15px !important;
      min-width: 15px !important;
    }
    .mob_div {
      display: block !important;
    }
  }
  @media only screen and (max-device-width: 550px),
    only screen and (max-width: 550px) {
    .mod_div {
      display: block !important;
    }
  }
  .table750 {
    width: 750px;
  }
</style>
<table
  style="
    background: #f3f3f3;
    min-width: 350px;
    font-size: 1px;
    line-height: normal;
  "
  border="0"
  width="100%"
  cellspacing="0"
  cellpadding="0"
>
  <tbody>
    <tr>
      <td align="center" valign="top">
        <!-- [if (gte mso 9)|(IE)]>
         <table border="0" cellspacing="0" cellpadding="0">
         <tr><td align="center" valign="top" width="750"><![endif]-->
        <table
          class="table750"
          style="
            width: 100%;
            max-width: 750px;
            min-width: 350px;
            background: #f3f3f3;
          "
          border="0"
          width="750"
          cellspacing="0"
          cellpadding="0"
        >
          <tbody>
            <tr>
              <td
                class="mob_pad"
                style="width: 25px; max-width: 25px; min-width: 25px;"
                width="25"
              >
                &nbsp;
              </td>
              <td style="background: #ffffff;" align="center" valign="top">
                <table
                  style="
                    width: 100% !important;
                    min-width: 100%;
                    max-width: 100%;
                    background: #f3f3f3;
                  "
                  border="0"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <tbody>
                    <tr>
                      <td align="right" valign="top">
                        <div
                          class="top_pad"
                          style="
                            height: 25px;
                            line-height: 25px;
                            font-size: 23px;
                          "
                        >
                          &nbsp;
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  style="
                    min-width: 88%;
                    max-width: 88%;
                    width: 88%;
                    height: 10px;
                  "
                  border="0"
                  width="88%"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <tbody>
                    <tr style="height: 10px;">
                      <td style="height: 10px;" align="left" valign="top">
                        <div
                          style="
                            height: 73px;
                            line-height: 73px;
                            font-size: 71px;
                          "
                        >
                          &nbsp;
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  style="width: 88% !important; min-width: 88%; max-width: 88%;"
                  border="0"
                  width="88%"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <tbody>
                    <tr>
                      <td align="left" valign="top">
                       
                          <span
                            style="
                              font-family: 'Source Sans Pro', Arial, Tahoma,
                                Geneva, sans-serif;
                              color: #1a1a1a;
                              font-size: 52px;
                              line-height: 60px;
                              font-weight: 300;
                              letter-spacing: -1.5px;
                            "
                            >Hey ${userName},</span
                          >
                        </span>
                        <div
                          style="
                            height: 33px;
                            line-height: 33px;
                            font-size: 31px;
                          "
                        >
                          &nbsp;
                        </div>
                        <span
                          style="
                            font-size: 24px;
                            line-height: 32px;
                            color: #585858;
                            font-family: 'Source Sans Pro', sans-serif;
                          "
                        >
                          <span
                            style="
                              font-family: 'Source Sans Pro', Arial, Tahoma,
                                Geneva, sans-serif;
                              color: #585858;
                              font-size: 24px;
                              line-height: 32px;
                            "
                            >You requested to track ${companyName} on EmoStocks.
                            <br><br>
                          </span>

                          <span
                          style="
                            font-family: 'Source Sans Pro', Arial, Tahoma,
                              Geneva, sans-serif;
                            color: #585858;
                            font-size: 24px;
                            line-height: 32px;
                          "
                          >The stock price of ${companyName} is expected to ${status} based on current news.
                          <br><br>
                        </span>

                        <span
                        style="
                          font-family: 'Source Sans Pro', Arial, Tahoma,
                            Geneva, sans-serif;
                          color: #585858;
                          font-size: 24px;
                          line-height: 32px;
                        "
                        ><a href='https://emostocks.vercel.app/'>Click here</a> to know more.
                        <br><br>
                      </span>

                      <span
                      style="
                        font-family: 'Source Sans Pro', Arial, Tahoma,
                          Geneva, sans-serif;
                        color: #585858;
                        font-size: 24px;
                        line-height: 32px;
                      "
                      >Regards,
                      <br />
                    </span>
                    <span
                      style="
                        font-family: 'Source Sans Pro', Arial, Tahoma,
                          Geneva, sans-serif;
                        color: #585858;
                        font-size: 24px;
                        line-height: 32px;
                      "
                      >Team EmoStocks,
                      <br />
                    </span>
                        <div
                          style="
                            height: 50px;
                            line-height: 50px;
                            font-size: 73px;
                          "
                        >
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td
                class="mob_pad"
                style="width: 25px; max-width: 25px; min-width: 25px;"
                width="25"
              >
                &nbsp;
              </td>
            </tr>
          </tbody>
        </table>
        <!-- [if (gte mso 9)|(IE)]>
         </td></tr>
         </table><![endif]-->
      </td>
    </tr>
  </tbody>
</table>
`;
  },
};

module.exports = email;
