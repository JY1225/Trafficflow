package com.sweii.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileUtil {
	/**
     * 保存图片
     * @param sourceFile  原始图片
     * @param path        保存目标路径
     * @return  boolean
     */
	public static boolean saveFile(byte[] datas,String path,String name){
		//System.out.println("path="+path+name);
		FileOutputStream wr=null;
		try {
			File file = new File(path);
			if (!file.exists()) {
				file.mkdirs();
			}
			file = new File(path+name);
			if (file.exists()) {
				file.delete();
			}
			wr = new FileOutputStream(file);
			wr.write(datas);
			wr.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}finally{
			if(wr!=null){
				try {
					wr.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
    /**
     * 保存图片
     * @param sourceFile  原始图片
     * @param path        保存目标路径
     * @return  boolean
     */
	public static boolean saveFile(File sourceFile,String path){
		FileInputStream in=null;
		FileOutputStream wr=null;
		try {
		    if(sourceFile==null){
		    	return false;
		    }
			 in = new FileInputStream(sourceFile);
			byte[] data = new byte[Integer.parseInt(new Long(sourceFile.length())
					.toString())];
			in.read(data);
			in.close();
			in=null;
			File file = new File(path);
			if (!file.exists()) {
				file.mkdirs();
			}
			file = new File(path);
			if (file.exists()) {
				file.delete();
			}
			wr = new FileOutputStream(file);
			wr.write(data);
			wr.close();
			wr=null;
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}finally{
			if(in!=null){
				try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if(wr!=null){
				try {
					wr.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
}
