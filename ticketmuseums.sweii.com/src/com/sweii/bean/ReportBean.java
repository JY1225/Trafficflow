package com.sweii.bean;

import java.util.List;

import com.sweii.framework.helper.NumbericHelper;

public class ReportBean {
	private String name;// 名称
	private Integer id;// ID

	private Integer preCount;

	public Integer getPreCount() {
		return preCount;
	}

	public void setPreCount(Integer preCount) {
		this.preCount = preCount;
	}

	private Integer creatorId;

	public Integer getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(Integer creatorId) {
		this.creatorId = creatorId;
	}

	public Integer getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(Integer totalCount) {
		this.totalCount = totalCount;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getSaleAmount() {
		return saleAmount;
	}

	public void setSaleAmount(Integer saleAmount) {
		this.saleAmount = saleAmount;
	}

	public Integer getSaleCount() {
		return saleCount;
	}

	public void setSaleCount(Integer saleCount) {
		this.saleCount = saleCount;
	}

	public Integer getAddAmount() {
		return addAmount;
	}

	public void setAddAmount(Integer addAmount) {
		this.addAmount = addAmount;
	}

	public Integer getAddCount() {
		return addCount;
	}

	public void setAddCount(Integer addCount) {
		this.addCount = addCount;
	}

	public Integer getBackTAmount() {
		return backTAmount;
	}

	public void setBackTAmount(Integer backTAmount) {
		this.backTAmount = backTAmount;
	}

	public Integer getBackTCount() {
		return backTCount;
	}

	public void setBackTCount(Integer backTCount) {
		this.backTCount = backTCount;
	}

	public Integer getBackCAmount() {
		return backCAmount;
	}

	public void setBackCAmount(Integer backCAmount) {
		this.backCAmount = backCAmount;
	}

	public Integer getBackCCount() {
		return backCCount;
	}

	public void setBackCCount(Integer backCCount) {
		this.backCCount = backCCount;
	}

	public Integer getMendAmount() {
		return mendAmount;
	}

	public void setMendAmount(Integer mendAmount) {
		this.mendAmount = mendAmount;
	}

	public Integer getMendCount() {
		return mendCount;
	}

	public void setMendCount(Integer mendCount) {
		this.mendCount = mendCount;
	}

	public Integer getPreAmount() {
		return preAmount;
	}

	public void setPreAmount(Integer preAmount) {
		this.preAmount = preAmount;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getCategory() {
		return category;
	}

	public void setCategory(Integer category) {
		this.category = category;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	private Integer saleAmount = 0;// 售票金额
	private Integer saleCount = 0;// 售票数量
	private Integer addAmount = 0;// 续费金额
	private Integer addCount = 0;// 续费人数
	private Integer backTAmount = 0;// 退票金额
	private Integer backTCount = 0;// 退票数
	private Integer backCAmount = 0;// 退卡金额
	private Integer backCCount = 0;// 退卡数
	private Integer mendAmount;// 补卡金额
	private Integer mendCount;// 补卡人数
	private Integer preAmount;// 押金
	private Integer type;
	private Integer category;
	private Integer totalCount;

	public Integer getRealAmount() {
		int realAmount = NumbericHelper.getIntValue(this.getSaleAmount(), 0)
				+ NumbericHelper.getIntValue(this.getAddAmount(), 0)
				+ NumbericHelper.getIntValue(this.getMendAmount(), 0)
				- NumbericHelper.getIntValue(this.getBackTAmount(), 0)
		+ NumbericHelper.getIntValue(this.getPreAmount(), 0)-NumbericHelper.getIntValue(this.getBackCAmount(), 0);
		return realAmount;
	}

	public void doReport(List<? extends ReportBean> listReportBean) {
		for (ReportBean rb : listReportBean) {
			this.setAddAmount(NumbericHelper.getIntValue(this.getAddAmount(), 0)
					+ NumbericHelper.getIntValue(rb.getAddAmount(), 0));
			this.setAddCount(NumbericHelper.getIntValue(this.getAddCount(), 0)
					+ NumbericHelper.getIntValue(rb.getAddCount(), 0));

			this.setSaleAmount(NumbericHelper.getIntValue(this.getSaleAmount(),
					0) + NumbericHelper.getIntValue(rb.getSaleAmount(), 0));
			this.setSaleCount(NumbericHelper.getIntValue(this.getSaleCount(), 0)
					+ NumbericHelper.getIntValue(rb.getSaleCount(), 0));

			this.setBackTAmount(NumbericHelper.getIntValue(
					this.getBackTAmount(), 0)
					+ NumbericHelper.getIntValue(rb.getBackTAmount(), 0));
			this.setBackTCount(NumbericHelper.getIntValue(this.getBackTCount(),
					0) + NumbericHelper.getIntValue(rb.getBackTCount(), 0));

			this.setBackCAmount(NumbericHelper.getIntValue(
					this.getBackCAmount(), 0)
					+ NumbericHelper.getIntValue(rb.getBackCAmount(), 0));
			this.setBackCCount(NumbericHelper.getIntValue(this.getBackCCount(),
					0) + NumbericHelper.getIntValue(rb.getBackCCount(), 0));
			this.setMendAmount(NumbericHelper.getIntValue(this.getMendAmount(),
					0) + NumbericHelper.getIntValue(rb.getMendAmount(), 0));
			this.setMendCount(NumbericHelper.getIntValue(this.getMendCount(), 0)
					+ NumbericHelper.getIntValue(rb.getMendCount(), 0));

			this.setPreCount(NumbericHelper.getIntValue(this.getPreCount(), 0)
					+ NumbericHelper.getIntValue(rb.getPreCount(), 0));
			this.setPreAmount(NumbericHelper.getIntValue(this.getPreAmount(), 0)
					+ NumbericHelper.getIntValue(rb.getPreAmount(), 0));
			this.setTotalCount(NumbericHelper.getIntValue(this.getTotalCount(),
					0) + NumbericHelper.getIntValue(rb.getTotalCount(), 0));
		}
	}

}
