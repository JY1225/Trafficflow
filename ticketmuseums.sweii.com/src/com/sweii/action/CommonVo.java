package com.sweii.action;

import com.erican.auth.vo.Admin;
import com.erican.auth.vo.ModuleCategory;
import com.erican.auth.vo.Role;
import com.sweii.vo.BakDatabase;
import com.sweii.vo.CardInfo;
import com.sweii.vo.Category;
import com.sweii.vo.Code;
import com.sweii.vo.Equipment;
import com.sweii.vo.Setting;
import com.sweii.vo.Ticket;
import com.sweii.vo.User;

/**
 * @author duncan
 * @createTime 2011-1-28
 * @version 1.0
 * 
 */
public class CommonVo extends BaseAction {
	private ModuleCategory moduleCategory = new ModuleCategory();
	private Code code = new Code();
	private Setting setting = new Setting();
	private BakDatabase bakDatabase = new BakDatabase();
	private Role role = new Role();
	private Admin admin = new Admin();
	private Ticket ticket = new Ticket();
	private Category category = new Category();
	private Equipment equipment=new Equipment();
	private User user=new User();
	private CardInfo cardInfo=new CardInfo();
	

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Ticket getTicket() {
		return ticket;
	}

	public void setTicket(Ticket ticket) {
		this.ticket = ticket;
	}


	public Admin getAdmin() {
		return admin;
	}

	public void setAdmin(Admin admin) {
		this.admin = admin;
	}

	public ModuleCategory getModuleCategory() {
		return moduleCategory;
	}

	public void setModuleCategory(ModuleCategory moduleCategory) {
		this.moduleCategory = moduleCategory;
	}

	public Code getCode() {
		return code;
	}

	public void setCode(Code code) {
		this.code = code;
	}

	public Setting getSetting() {
		return setting;
	}

	public void setSetting(Setting setting) {
		this.setting = setting;
	}

	public BakDatabase getBakDatabase() {
		return bakDatabase;
	}

	public void setBakDatabase(BakDatabase bakDatabase) {
		this.bakDatabase = bakDatabase;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}


	public Equipment getEquipment() {
		return equipment;
	}

	public void setEquipment(Equipment equipment) {
		this.equipment = equipment;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public CardInfo getCardInfo() {
		return cardInfo;
	}

	public void setCardInfo(CardInfo cardInfo) {
		this.cardInfo = cardInfo;
	}
	
}
