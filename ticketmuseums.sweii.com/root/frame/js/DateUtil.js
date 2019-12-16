var DateUtil = {};

/*
 * yyyy-MM-dd HH:mm:ss <BR> 字符串转换为日期格式
 * 
 */
DateUtil.toDate = function(dateStr) {
	var d = new Date(Date.parse(dateStr.replace(/-/g, "/")));
	return d;
}

/**
 *  begin >end返回 + ,相等返回0，小于返回- 比较日期大小
 */
DateUtil.compare = function(beginDate, endDate) {
	
	var iDays = parseInt(Math.abs(beginDate - endDate) / 1000 / 60 / 60 /24);      
    if((beginDate-endDate)<0){    
        return -iDays;    
    }    

    return iDays;
    
	if (endDate.getYear() > beginDate.getYear())
		return -1;
	else if (endDate.getYear() < beginDate.getYear())
		return 1;

	if (endDate.getMonth() > beginDate.getMonth())
		return -1;
	else if (endDate.getMonth() < beginDate.getMonth())
		return 1;

	if (endDate.getDate() > beginDate.getDate())
		return -1;
	else if (endDate.getDate() < beginDate.getDate())
		return 1;

	 

	return 0;
}
