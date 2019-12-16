package com.sweii.util;
import com.sweii.framework.helper.DESHelper;
public final class Base64 {
    public Base64() {
    }
    public static byte[] decode(byte abyte0[]) {
	if (abyte0.length == 0) return new byte[0];
	int i = abyte0.length / 4;
	byte abyte1[] = null;
	int j = 0;
	int k;
	for (k = abyte0.length; abyte0[k - 1] == 61;)
	    if (--k == 0) return new byte[0];
	abyte1 = new byte[k - i];
	for (int l = 0; l < i; l++) {
	    int i1 = l * 4;
	    byte byte0 = abyte0[i1 + 2];
	    byte byte1 = abyte0[i1 + 3];
	    byte byte2 = base64Alphabet[abyte0[i1]];
	    byte byte3 = base64Alphabet[abyte0[i1 + 1]];
	    if (byte0 != 61 && byte1 != 61) {
		byte byte4 = base64Alphabet[byte0];
		byte byte6 = base64Alphabet[byte1];
		abyte1[j] = (byte) (byte2 << 2 | byte3 >> 4);
		abyte1[j + 1] = (byte) ((byte3 & 0xf) << 4 | byte4 >> 2 & 0xf);
		abyte1[j + 2] = (byte) (byte4 << 6 | byte6);
	    } else if (byte0 == 61)
		abyte1[j] = (byte) (byte2 << 2 | byte3 >> 4);
	    else if (byte1 == 61) {
		byte byte5 = base64Alphabet[byte0];
		abyte1[j] = (byte) (byte2 << 2 | byte3 >> 4);
		abyte1[j + 1] = (byte) ((byte3 & 0xf) << 4 | byte5 >> 2 & 0xf);
	    }
	    j += 3;
	}
	return abyte1;
    }
    public static byte[] encode(byte abyte0[]) {
	int i = abyte0.length * 8;
	int j = i % 24;
	int k = i / 24;
	byte abyte1[] = null;
	if (j != 0)
	    abyte1 = new byte[(k + 1) * 4];
	else
	    abyte1 = new byte[k * 4];
	int l = 0;
	int i1 = 0;
	int j1 = 0;
	for (j1 = 0; j1 < k; j1++) {
	    i1 = j1 * 3;
	    byte byte0 = abyte0[i1];
	    byte byte3 = abyte0[i1 + 1];
	    byte byte6 = abyte0[i1 + 2];
	    byte byte9 = (byte) (byte3 & 0xf);
	    byte byte11 = (byte) (byte0 & 0x3);
	    l = j1 * 4;
	    byte byte13 = (byte0 & 0xffffff80) == 0 ? (byte) (byte0 >> 2) : (byte) (byte0 >> 2 ^ 0xc0);
	    byte byte15 = (byte3 & 0xffffff80) == 0 ? (byte) (byte3 >> 4) : (byte) (byte3 >> 4 ^ 0xf0);
	    byte byte16 = (byte6 & 0xffffff80) == 0 ? (byte) (byte6 >> 6) : (byte) (byte6 >> 6 ^ 0xfc);
	    abyte1[l] = lookUpBase64Alphabet[byte13];
	    abyte1[l + 1] = lookUpBase64Alphabet[byte15 | byte11 << 4];
	    abyte1[l + 2] = lookUpBase64Alphabet[byte9 << 2 | byte16];
	    abyte1[l + 3] = lookUpBase64Alphabet[byte6 & 0x3f];
	}
	i1 = j1 * 3;
	l = j1 * 4;
	if (j == 8) {
	    byte byte1 = abyte0[i1];
	    byte byte4 = (byte) (byte1 & 0x3);
	    byte byte7 = (byte1 & 0xffffff80) == 0 ? (byte) (byte1 >> 2) : (byte) (byte1 >> 2 ^ 0xc0);
	    abyte1[l] = lookUpBase64Alphabet[byte7];
	    abyte1[l + 1] = lookUpBase64Alphabet[byte4 << 4];
	    abyte1[l + 2] = 61;
	    abyte1[l + 3] = 61;
	} else if (j == 16) {
	    byte byte2 = abyte0[i1];
	    byte byte5 = abyte0[i1 + 1];
	    byte byte8 = (byte) (byte5 & 0xf);
	    byte byte10 = (byte) (byte2 & 0x3);
	    byte byte12 = (byte2 & 0xffffff80) == 0 ? (byte) (byte2 >> 2) : (byte) (byte2 >> 2 ^ 0xc0);
	    byte byte14 = (byte5 & 0xffffff80) == 0 ? (byte) (byte5 >> 4) : (byte) (byte5 >> 4 ^ 0xf0);
	    abyte1[l] = lookUpBase64Alphabet[byte12];
	    abyte1[l + 1] = lookUpBase64Alphabet[byte14 | byte10 << 4];
	    abyte1[l + 2] = lookUpBase64Alphabet[byte8 << 2];
	    abyte1[l + 3] = 61;
	}
	return abyte1;
    }
    public static boolean isArrayByteBase64(byte abyte0[]) {
	int i = abyte0.length;
	if (i == 0) return true;
	for (int j = 0; j < i; j++)
	    if (!isBase64(abyte0[j])) return false;
	return true;
    }
    public static boolean isBase64(byte byte0) {
	return byte0 == 61 || base64Alphabet[byte0] != -1;
    }
    public static boolean isBase64(String s) {
	return isArrayByteBase64(s.getBytes());
    }
    private static byte base64Alphabet[];
    private static byte lookUpBase64Alphabet[];
    static {
	base64Alphabet = new byte[255];
	lookUpBase64Alphabet = new byte[64];
	for (int i = 0; i < 255; i++)
	    base64Alphabet[i] = -1;
	for (int j = 90; j >= 65; j--)
	    base64Alphabet[j] = (byte) (j - 65);
	for (int k = 122; k >= 97; k--)
	    base64Alphabet[k] = (byte) ((k - 97) + 26);
	for (int l = 57; l >= 48; l--)
	    base64Alphabet[l] = (byte) ((l - 48) + 52);
	base64Alphabet[43] = 62;
	base64Alphabet[47] = 63;
	for (int i1 = 0; i1 <= 25; i1++)
	    lookUpBase64Alphabet[i1] = (byte) (65 + i1);
	int j1 = 26;
	for (int k1 = 0; j1 <= 51; k1++) {
	    lookUpBase64Alphabet[j1] = (byte) (97 + k1);
	    j1++;
	}
	int l1 = 52;
	for (int i2 = 0; l1 <= 61; i2++) {
	    lookUpBase64Alphabet[l1] = (byte) (48 + i2);
	    l1++;
	}
	lookUpBase64Alphabet[62] = 43;
	lookUpBase64Alphabet[63] = 47;
    }
}
