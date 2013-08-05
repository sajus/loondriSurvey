/**
 * Set up generic API for the handling the crypto;
 */
define(['CryptoJS'], function() {
	var cryptKey = "abcd";
	return CryptoJS = $.extend(CryptoJS, {
		encryptCrypto:function(input) {
			var hash = CryptoJS.Rabbit.encrypt(input, cryptKey);
			return encodeURIComponent(hash);
		},
		decryptCrypto:function(hash) {
			var sUrlHash = decodeURIComponent(hash);
			return CryptoJS.Rabbit.decrypt(sUrlHash, cryptKey).toString(CryptoJS.enc.Utf8);
		}
	})
});
