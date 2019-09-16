const generateSignalantTemplate = (data) => `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: #f1f1f1;margin: 0 auto !important;padding: 0 !important;height: 100% !important;width: 100% !important;">
<head style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
    <meta charset="utf-8" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"> <!-- utf-8 works for most cases -->
    <meta name="viewport" content="width=device-width" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"> <!-- Forcing initial-scale shouldn't be necessary -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"> <!-- Use the latest (edge) version of IE rendering engine -->
    <meta name="x-apple-disable-message-reformatting" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
    <title style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"></title> <!-- The title tag shows in email notifications, like Android 4.4. -->

    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:200,300,400,600,700,800,900" rel="stylesheet" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">

  

</head>

<body width="100%" style="margin: 0 auto !important;padding: 0 !important;mso-line-height-rule: exactly;background-color: #222222;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: #f1f1f1;font-family: 'Nunito Sans', sans-serif;font-weight: 400;font-size: 15px;line-height: 1.8;color: rgba(0,0,0,.4);height: 100% !important;width: 100% !important;">
	<center style="width: 100%;background-color: #f1f1f1;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
    <div style="display: none;font-size: 1px;max-height: 0px;max-width: 0px;opacity: 0;overflow: hidden;mso-hide: all;font-family: sans-serif;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
      &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>
    <div style="max-width: 600px;margin: 0 auto;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" >
    	<!-- BEGIN BODY -->
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;">
      	<tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
          <td valign="top" style="padding: 1em 2.5em;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: #ffffff;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
          	<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
          		<tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
          			<td width="40%"  style="text-align: left;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
			            <h1 style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-family: 'Nunito Sans', sans-serif;color: #000000;margin-top: 0;margin: 0;"><a href="https://app.signalant.com/" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;text-decoration: none;color: #000;font-size: 20px;font-weight: 700;text-transform: uppercase;font-family: 'Nunito Sans', sans-serif;">Signalant</a></h1>
			          </td>
			          <td width="60%"  style="text-align: right;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
			            <ul style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;padding: 0;">
			            	
			            	<li style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;list-style: none;display: inline-block;margin-left: 5px;font-size: 12px;font-weight: 700;text-transform: uppercase;"><a href="https://app.signalant.com/" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;text-decoration: none;color: rgba(0,0,0,.6);">Manage Alerts</a></li>
			            	
			            </ul>
			          </td>
          		</tr>
          	</table>
          </td>
	      </tr><!-- end tr -->
				
	      <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
	        <td  style="text-align: center;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: rgba(0,0,0,.8);padding: 2.5em;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
	        	<div  style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: rgba(255,255,255,.8);">
	          	<h2 style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-family: line-height: 1;color: #ffffff;margin-top: 0;font-size: 24px;line-height: 1.4;font-weight: 700;padding-bottom: 0;">Forex Trade Alerts</h2>
	          	<p style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">You have got a notification alert from your Auto Signal. You can manage all your alerts <a href="https://app.signalant.com/" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;text-decoration: none;color: #f5564e;">here</a>. </p>
					<p style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><b style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">CURRENCY PAIR:</b> ${data.currencyPair} </p>
					<p style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><b style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">ALERT:</b> ${data.alertType}</p>
					<p style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><b style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">PRICE:</b> ${data.price}</p>
					<p style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><b style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">INDICATOR:</b> ${data.indicator}</p>




	        	</div>
	        </td>
	      </tr><!-- end: tr -->
	     
		       
				      <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
		            <td  style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: #ffffff;padding: 2.5em;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
		            	<div  style="text-align: center;padding: 0 30px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
		              	<h2 style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-family: 'Nunito Sans', sans-serif;color: #000000;margin-top: 0;font-size: 24px;line-height: 1.4;font-weight: 700;">Alert Signals</h2>
		              	
		            	</div>
		            	<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
		            		<tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                      <td valign="top" width="50%" style="padding-top: 20px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                        <table role="presentation" cellspacing="0" cellpadding="10" border="0" width="100%" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
                          
                          <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <td  style="text-align: left;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;padding: 10px 10px 0;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                            	<h3 style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-family: 'Nunito Sans', sans-serif;color: #000000;margin-top: 0;font-size: 16px;font-weight: 600;">Auto Signals</h3>
                             	<p style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">You can create customised signals using indicators and timeframe.</p>
                             	<p style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><a href="https://app.signalant.com/"  style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;text-decoration: none;color: #ffffff;padding: 5px 15px;display: inline-block;border-radius: 5px;background: #f5564e;">Create Auto Signal</a></p>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td valign="top" width="50%" style="padding-top: 20px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                        <table role="presentation" cellspacing="0" cellpadding="10" border="0" width="100%" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
                         
                          <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <td style="text-align: left;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;padding: 10px 10px 0;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                            	<h3 style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-family: 'Nunito Sans', sans-serif;color: #000000;margin-top: 0;font-size: 16px;font-weight: 600;">Manual Signals</h3>
                              <p style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">You can start following market experts and copy their signals.</p>
                              <p style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><a href="https://app.signalant.com/"  style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;text-decoration: none;color: #ffffff;padding: 5px 15px;display: inline-block;border-radius: 5px;background: #f5564e;">Follow Manual Signals</a></p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
		            	</table>
		            </td>
		          </tr><!-- end: tr -->
		          


		             <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
			          <td valign="middle"  style="background-image: url(https://res.cloudinary.com/dnwdjyxoi/image/upload/v1564921312/bg-trading_ywktxm.jpg);background-size: cover;padding: 4em 0;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;width: 100%;position: relative;z-index: 0;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
			          	<div style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;position: absolute;top: 0;left: 0;right: 0;bottom: 0;content: '';width: 100%;background: #000000;z-index: -1;opacity: .3;"></div>

			          	<center style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><h2 style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-family: 'Nunito Sans', sans-serif;color: #000000;margin-top: 0;"><font color="white" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">Your Account Stats</font></h2></center>
			            <table style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
			            	<tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
			            		<td valign="middle" width="33.333%" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
                          <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <td  style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;text-align: center;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                            	<span  style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;display: block;color: #ffffff;font-size: 34px;font-weight: 700;">${data.indicatorAlerts}</span>
                            	<span  style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;display: block;color: rgba(255,255,255,.9);font-size: 13px;">Indicator Alerts</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td valign="middle" width="33.333%" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
                          <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <td  style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;text-align: center;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                            	<span  style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;display: block;color: #ffffff;font-size: 34px;font-weight: 700;">${data.priceAlerts}</span>
                            	<span  style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;display: block;color: rgba(255,255,255,.9);font-size: 13px;">Price Alerts</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td valign="middle" width="33.333%" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
                          <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <td  style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;text-align: center;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                            	<span  style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;display: block;color: #ffffff;font-size: 34px;font-weight: 700;">${data.expertAlerts}</span>
                            	<span  style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;display: block;color: rgba(255,255,255,.9);font-size: 13px;">Expert Alerts</span>
                            </td>
                          </tr>
                        </table>
                      </td>
			            	</tr>
			            </table>
			          </td>
				      </tr><!-- end tr -->
		         
		        </table>

		      
		    <!-- end:tr -->
      <!-- 1 Column Text + Button : END -->
      
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;">
      	
        <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
        	<td valign="middle"  style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: #000000;padding: 2.5em;color: rgba(255,255,255,.5);mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
        		<table style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
            	<tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                <td valign="top" width="33.333%" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
                    <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                      <td style="text-align: left;padding-right: 10px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                      	<p style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">&copy; 2019 Signalant. </p>
                      </td>
                    </tr>
                  </table>
                </td>
                <td valign="top" width="33.333%" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
                    <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                      <td style="text-align: right;padding-left: 5px;padding-right: 5px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                      	<p style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><a href="https://app.signalant.com/" style="color: rgba(255,255,255,.4);-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;text-decoration: none;">Unsubcribe</a></p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
        	</td>
        </tr>
      </table>

    </div>
  </center>
</body>
</html>`


module.exports = {
    generateSignalantTemplate,
};
