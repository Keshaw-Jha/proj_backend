const commonLayout = (body) => {
  return `<div id="root" style="background-color: #FF204E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 16px; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; width: 100%; height: 100%; margin: 0; padding: 0;">
  <span id="logo" style="display: block; text-align: center; color: #fff; font-size: 30px; font-weight: 600; margin-bottom: 20px;">Pravesh</span>
  <div id="content" style="background-color: #fff; border-radius: 5px; padding: 15px; width: 600px; margin: 0 auto;">
    ${body} 
     <p id="team" style="border-top: 1px solid #ddd; margin-top: 25px; padding-top: 10px;">Thanks,<br>The Pravesh team</p>
 </div>
</div>`;
};

const qrEmail = (ticketObj) => {
  const body = `<p>Hello ${ticketObj.name},</p>
  <p>Thank you for choosing Pravesh! Below is your e-ticket for your upcoming event. Simply scan it upon arrival and departure for seamless access.<br/>
We look forward to hosting you and ensuring a memorable experience. See you soon!</p>
<table align="center" style="width: 100%;">
        <tr>
            <td align="center">
                <img alt="qr-code" src="${ticketObj.qr}" style="max-width: 100%; height: auto; display: block;"/>
            </td>
        </tr>
    </table>`;
  return commonLayout(body);
};

const otpEmail = (ticketObj) => {
  const body = `<p>Hello ${ticketObj.name},</p>
  <p>Thank you for choosing Pravesh! Below is your e-ticket for your upcoming event. Simply scan it upon arrival and departure for seamless access.<br/>
We look forward to hosting you and ensuring a memorable experience. See you soon!</p>
<table align="center" style="width: 100%;">
        <tr>
            <td align="center">
            <h1 >OTP:  ${ticketObj.otp}</h1>
            </td>
        </tr>
    </table>
  `;
  return commonLayout(body);
};

const durationAlert = (userObj) => {
  const body = `<p style="text-align: center;">
  <img src="https://img.icons8.com/ios-filled/50/FF204E/error.png" alt="Alert" style="width: 50px; height: 50px;"/>
</p>
<p>Hello ${userObj.name},</p>
<p>You have exceeded your stay duration of <strong>${userObj.maxDuration} minutes</strong>.</p>
<p style="color: #FF204E; font-weight: bold;">⚠️ Please note: Additional charges will apply if you stay beyond the next <strong>5 minutes</strong>.</p>
<p>We kindly ask you to start planning your exit calmly to avoid crowding at the exits. Thank you for your cooperation and understanding.</p>`;
  return commonLayout(body);
};

module.exports = { qrEmail, otpEmail, durationAlert };
