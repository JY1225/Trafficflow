/**
 * 
 * ������ز���
 */

var RMB = {
	// ����ת���ɴ�д����
	hanNum : function(numberValue) {
	
	
		var numberValue = new String(Math.round(numberValue * 100)); // ���ֽ��
		
		  //�ж��Ƿ�Ϊ����
		var chineseValue = ""; // ת����ĺ��ֽ��
		   if((numberValue.substr(0, 1))=="-"){//����
			   var chineseValue = "��"; // 
			   numberValue=numberValue.substr(1,numberValue.length);
		   } 
		   
		
		var String1 = "��Ҽ��������½��ƾ�"; // ��������
		var String2 = "��Ǫ��ʰ��Ǫ��ʰ��Ǫ��ʰԪ�Ƿ�"; // ��Ӧ��λ
		var len = numberValue.length; // numberValue ���ַ�������
		var Ch1; // ���ֵĺ������
		var Ch2; // ����λ�ĺ��ֶ���
		var nZero = 0; // ����������������ֵ�ĸ���
		var String3; // ָ��λ�õ���ֵ
		if (len > 15) {
			alert("�������㷶Χ");
			return "";
		}
		if (numberValue == 0) {
			chineseValue = "��Ԫ��";
			return chineseValue;
		}

		String2 = String2.substr(String2.length - len, len); // ȡ����Ӧλ����STRING2��ֵ
		for ( var i = 0; i < len; i++) {
			String3 = parseInt(numberValue.substr(i, 1), 10); // ȡ����ת����ĳһλ��ֵ
			if (i != (len - 3) && i != (len - 7) && i != (len - 11)
					&& i != (len - 15)) {
				if (String3 == 0) {
					Ch1 = "";
					Ch2 = "";
					nZero = nZero + 1;
				} else if (String3 != 0 && nZero != 0) {
					Ch1 = "��" + String1.substr(String3, 1);
					Ch2 = String2.substr(i, 1);
					nZero = 0;
				} else {
					Ch1 = String1.substr(String3, 1);
					Ch2 = String2.substr(i, 1);
					nZero = 0;
				}
			} else { // ��λ�����ڣ��ڣ���Ԫλ�ȹؼ�λ
				if (String3 != 0 && nZero != 0) {
					Ch1 = "��" + String1.substr(String3, 1);
					Ch2 = String2.substr(i, 1);
					nZero = 0;
				} else if (String3 != 0 && nZero == 0) {
					Ch1 = String1.substr(String3, 1);
					Ch2 = String2.substr(i, 1);
					nZero = 0;
				} else if (String3 == 0 && nZero >= 3) {
					Ch1 = "";
					Ch2 = "";
					nZero = nZero + 1;
				} else {
					Ch1 = "";
					Ch2 = String2.substr(i, 1);
					nZero = nZero + 1;
				}
				if (i == (len - 11) || i == (len - 3)) { // �����λ����λ��Ԫλ�������д��
					Ch2 = String2.substr(i, 1);
				}
			}
			chineseValue = chineseValue + Ch1 + Ch2;
		}

		if (String3 == 0) { // ���һλ���֣�Ϊ0ʱ�����ϡ�����
			chineseValue = chineseValue + "��";
		}

		return chineseValue;
	}
};