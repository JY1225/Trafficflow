package com.sweii.util;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageDecoder;
import com.sun.image.codec.jpeg.JPEGImageEncoder;
public class ImageServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private String attriName = "sessionTextImage";
    private String imageFilePath = "textimage.jpg";
    private double rdnum = 1.0D;
    private static final String CONTENT_TYPE = "image/jpeg;charset=iso8859_1";
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	doPost(request, response);
    }
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	response.setContentType("image/jpeg;charset=iso8859_1");
	String text = "";
	String imageFile = "";
	int x = 0;
	int y = 0;
	String fontColor = "";
	int fontSize = 0;
	String fontStyle = "";
	String fontName = "";
	double _tempint = 0.0D;
	try {
	    int i1 = (int) (Math.random() * 10.0D);
	    int i2 = (int) (Math.random() * 10.0D);
	    int i3 = (int) (Math.random() * 10.0D);
	    int i4 = (int) (Math.random() * 10.0D);
	    _tempint = Integer.parseInt(String.valueOf(i1) + String.valueOf(i2) + String.valueOf(i3) + String.valueOf(i4)) * this.rdnum;
	    if ((_tempint >= 0.0D) && (_tempint < 10.0D)) text = "000" + (int) _tempint;
	    if ((_tempint >= 10.0D) && (_tempint < 100.0D)) text = "00" + (int) _tempint;
	    if ((_tempint >= 100.0D) && (_tempint < 1000.0D)) text = "0" + (int) _tempint;
	    if (_tempint >= 1000.0D) {
		int _s1 = (int) _tempint;
		text = String.valueOf(_s1);
	    }
	    request.getSession(true).setAttribute(this.attriName, text);
	    imageFile = this.imageFilePath;
	    x = 4;
	    y = 12;
	    fontColor = "000000";
	    fontSize = 12;
	    fontStyle = "bold";
	    fontName = "Arial";
	} catch (Exception e) {
	    e.printStackTrace();
	}
	ServletOutputStream output = response.getOutputStream();
	String imgPath = request.getSession().getServletContext().getRealPath("/");
	if ((imageFile.toLowerCase().endsWith(".jpeg")) || (imageFile.toLowerCase().endsWith(".jpg"))) {
	    imageFile = imgPath + imageFile;
	    InputStream imageIn = new FileInputStream(new File(imageFile));
	    JPEGImageDecoder decoder = JPEGCodec.createJPEGDecoder(imageIn);
	    BufferedImage image = decoder.decodeAsBufferedImage();
	    Graphics g = image.getGraphics();
	    g.setColor(new Color(Integer.parseInt(fontColor, 16)));
	    Font mFont = new Font(fontName, 0, fontSize);
	    if (fontStyle.equalsIgnoreCase("italic")) mFont = new Font(fontName, 2, fontSize);
	    if (fontStyle.equalsIgnoreCase("bold")) mFont = new Font(fontName, 1, fontSize);
	    if (fontStyle.equalsIgnoreCase("plain")) mFont = new Font(fontName, 0, fontSize);
	    g.setFont(mFont);
	    g.drawString(text, x, y);
	    JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(output);
	    encoder.encode(image);
	    imageIn.close();
	}
	output.close();
    }
    public void destroy() {
    }
}