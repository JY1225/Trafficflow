package com.sweii.util;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
public class MD5 {
    /**
     * 用MD5算法加密
     * @param in String : 待加密的原文
     * @return String : 加密后的密文，如果原文为空，则返回null;
     */
    public static String encode(final String in) {
	return encode(in, "");
    }
    /**
     * 用MD5算法加密
     * @param in String : 待加密的原文
     * @param charset String : 加密算法字符集
     * @return String : 加密后的密文，若出错或原文为null，则返回null
     */
    public static String encode(final String in, final String charset) {
	if (in == null) return null;
	try {
	    MessageDigest md = MessageDigest.getInstance("MD5");
	    if (charset == null || "".equals(charset)) {
		md.update(in.getBytes());
	    } else {
		try {
		    md.update(in.getBytes(charset));
		} catch (Exception e) {
		    md.update(in.getBytes());
		}
	    }
	    byte[] digesta = md.digest();
	    return byte2hex(digesta);
	} catch (java.security.NoSuchAlgorithmException ex) {
	    //出错
	    ex.printStackTrace();
	    return null;
	}
    }
    private static String byte2hex(final byte[] b) {
	String hs = "";
	String stmp = "";
	for (int n = 0; n < b.length; n++) {
	    stmp = (java.lang.Integer.toHexString(b[n] & 0XFF));
	    if (stmp.length() == 1) {
		hs = hs + "0" + stmp;
	    } else {
		hs = hs + stmp;
	    }
	}
	return hs;
    }
    public static byte[] encode(final byte[] in) {
	if (in == null) return null;
	try {
	    MessageDigest md = MessageDigest.getInstance("MD5");
	    md.update(in);
	    return md.digest();
	} catch (NoSuchAlgorithmException ex) {
	    ex.printStackTrace();
	    return null;
	}
    }
    public MD5() {
    }
    public static void main(String[] args) throws Exception {
	System.out.println("EFEFEFEFEEEEEEEE066900010008110000EAFF6A000282BC07010100052D0000EAFF6A000282BC0701010005370000EAFF6A000282BC07010100053A00003C45".toLowerCase());
	/*
	System.out.println("=="+MD5.encode("test").length());
	
	InputStreamReader ir = new InputStreamReader(new FileInputStream(new File("C:\\cardInfo.txt")));
	LineNumberReader input = new LineNumberReader(ir);
	String line;
	StringBuffer cards = new StringBuffer();
	while ((line = input.readLine()) != null) {
	    if (line.length() > 0 && line.split(" ").length > 1) {
		String[] numbers = line.split(" ");
		String card = Long.toHexString(Long.valueOf(numbers[1]));
		if (card.length() == 8) {
		    card = card.substring(2);
		} else if (card.length() == 7) {
		    card = card.substring(1);
		} else if (card.length() == 5) {
		    card = "0" + card;
		} else if (card.length() == 4) {
		    card = "00" + card;
		} else if (card.length() == 3) {
		    card = "000" + card;
		} else if (card.length() == 2) {
		    card = "0000" + card;
		} else if (card.length() == 1) {
		    card = "00000" + card;
		}
		String doorNumber = UdpUtil.encodeCard(Long.valueOf(card, 16).toString());//门闸
		cards.append(numbers[0] + " " + doorNumber + " " + numbers[1] + "\n");
		System.out.println(numbers[0] + " " + doorNumber + " " + numbers[1]);
	    }
	}
	FileOutputStream wr = new FileOutputStream(new File("C:\\key.txt"), true);
	Writer out = new OutputStreamWriter(wr, "GBK");
	out.write(cards.toString());//13710134198
	out.write("\n");
	out.close();*/
    }
}