package com.sweii.bean;


import com.sun.jna.Structure;
import com.sun.jna.win32.StdCallLibrary;

public interface Termb extends StdCallLibrary
{
	public static class IdCardTxtInfo extends Structure
	{   
		public byte[] name=new byte[31];                
		public byte[] Sex=new byte[6];               
		public byte[] nation=new byte[11];          
		public byte[] borndate=new byte[9];            
		public byte[] address=new byte[71];         
		public byte[] idno=new byte[19];                
		public byte[] department=new byte[31];      
		public byte[] StartDate=new byte[9];           
		public byte[] EndDate=new byte[9];    
		public byte[] Reserve=new byte[37]; 
		public byte[] AppAddress1=new byte[71];   
	}
	
	int SetJpgPath(String a);
	int InitComm(int iPort);
	int Authenticate();
	int Read_Content(int iActive);   
	int GetIdCardTxtInfo(IdCardTxtInfo result);
	int CloseComm();
}