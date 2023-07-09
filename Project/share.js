var cooldown = false;

function generateOTP() {
  if (!cooldown) {
    var digits = '0123456789';
    var otpLength = 6;
    var otp = '';

    for (var i = 0; i < otpLength; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }

    document.getElementById('otp').textContent = otp;
    disableButtonForCooldown(3000); // Disable the button for 3 seconds (adjust as needed)
  }
}

function disableButtonForCooldown(cooldownTime) {
  cooldown = true;
  var button = document.getElementById('generateBtn');
  button.disabled = true;

  setTimeout(function() {
    cooldown = false;
    button.disabled = false;
  }, cooldownTime);
}
