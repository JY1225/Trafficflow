package com.sweii.service;
import java.util.List;

import com.sweii.util.PageUtil;
import com.sweii.vo.Code;
import com.sweii.vo.Setting;
/**
 * 通用接口
 * @author duncan
 * @createTime 2009-11-24
 * @version 1.0
 */
public interface CommonService {
    /**
     * 不分页查询所有实体
     * @param entity
     * @param orderField
     * @param order
     * @return
     * @author kfz
     * @createTime 2011-4-1
     */
    public List queryEntityList(Object entity, String orderField, String order);
    /**
     * 分页查询
     * @author duncan
     * @createTime 2011-1-28
     * @version 1.0
     */
    public PageUtil queryEntityPage(Object entity, String orderField, String order, int pageNo, int pageSize) throws Throwable;
    /**
     * 新建保存实体
     * @author duncan
     * @createTime 2011-1-28
     * @version 1.0
     */
    public void addEntity(Object entity) throws Throwable;
    /**
     * 新建保存实体，一对多关系
     * @author duncan
     * @createTime 2011-2-14
     * @version 1.0
     */
    public void moreAddEntity(Object entity, List list) throws Throwable;
    /**
     * 修改实体信息
     * @param Object entity 实体类
     * @param fields 需要更新的属性名
     * @author duncan
     * @createTime 2011-1-28
     * @version 1.0
     */
    public void editEntity(Object entity, List<String> fields) throws Throwable;
    /**
     * 修改实体
     * @author duncan
     * @createTime 2011-2-16
     * @version 1.0
     */
    public void moreEditEntity(Object entity, List list, List<String> fields, String joinFields) throws Throwable;
    /**
     * 删除
     * @param String entity 实体名称
     * @param String joinEntity 级联删除的实体名称
     * @param ids 删除记录
     * @author duncan
     * @createTime 2011-1-28
     * @version 1.0
     */
    public void deleteEntity(String entity, String joinEntity, List<Integer> ids) throws Throwable;
    /**
     * @param String entity 实体名称
     * @param String joinEntity 级联的实体名称
     * @param ids 记录
     * @author duncan
     * @createTime 2011-1-28
     * @version 1.0
     */
    public void confirmEntity(String entity, List<Integer> ids) throws Throwable;
    /**
     * 修改列内容
     * @author duncan
     * @createTime 2011-2-22
     * @version 1.0
     */
    public void changeEntity(String entity, List<String> fields, List<String> values, List<Integer> ids) throws Throwable;
    /**
     * 通过ID查询实体
     * @author duncan
     * @createTime 2011-2-16
     * @version 1.0
     */
    public Object queryEntityById(String entity, Integer id);
    /**
     * 通过ID查询关联实体列表
     * @author duncan
     * @createTime 2011-2-16
     * @version 1.0
     */
    public List queryJoinEntityList(String entity, String joinEntity, Integer id);
    /**
     * 重新更新内存数据字典
     * @author duncan
     * @createTime 2009-11-24
     * @version 1.0
     * @return void
     */
    public void reloadCode();
    /**
     * 通过数据字典父类代码CodeType查询子字典列表
     * @param String codeType 数据字典父类代码
     * @author duncan
     * @createTime 2009-11-25
     * @version 1.0
     * @return List<Code> 返回子列表,用于动态下位菜单选择数据
     */
    public List<Code> queryCodeList(String codeType);
    /**
     * 通过数据字典父类代码CodeType查询子字典列表
     * @param String codeType 数据字典父类代码
     * @author duncan
     * @createTime 2009-11-25
     * @version 1.0
     * @return List<Code> 返回子列表,用于动态下位菜单选择数据
     */
    public List<Code> queryCodeList(String codeType, Integer type);
    /**
     * 通过类型和值,查询数据字典名称
     * @author duncan
     * @createTime 2010-1-1
     * @version 1.0
     * @return String
     */
    public String queryCodeName(String codeType, String value);
    /**
     * 查询代码列表
     * @author duncan
     * @createTime 2010-1-1
     * @version 1.0
     * @return PageUtil<Code>
     */
    public PageUtil<Code> queryCodePage(Integer parentId, String searchKey, int pageNo, int pageSize);
    /**
     *添加代码
     * @author duncan
     * @createTime 2010-1-1
     * @version 1.0
     * @return void
     */
    public void doAddCode(Code vo);
    /**
     * 修改代码
     * @author duncan
     * @createTime 2010-1-1
     * @version 1.0
     * @return void
     */
    public void doEditCode(Code vo);
    /**
     * 删除代码,如果是父类,则删除所有子类
     * @author duncan
     * @createTime 2010-1-1
     * @version 1.0
     * @return void
     */
    public void doDeleteCode(Integer[] ids);
    /**
     * 删除
     * @author duncan
     * @createTime 2010-6-2
     * @version 1.0
     * @return void
     */
    public void deleteHoliday(Integer id);
    /**
     * 
     * @author duncan
     * @createTime 2010-8-22
     * @version 1.0
     */
    public void editEntity(Integer id, String entity, String field, String value, String javaType, String type, String format)throws Throwable;
    /**
     * 
     * @author duncan
     * @createTime 2011-2-16
     * @version 1.0
     */
    public String queryBranchName(Integer branchId);
    /**
     * 查询某类型对应某些值的列表,values 用逗号分隔
     * @param codeType
     * @param values
     * @return
     * @author kfz
     * @createTime 2010-12-28
     */
    public List<Code> queryCodeListByValue(String codeType, String values);
    /**
     * 确认实体，更改status状态为1
     * @param obj
     * @param fs
     * @author kfz
     * @createTime 2011-2-18
     */
    public void confirmEntity(Object obj, List<Integer> ids);
    public Setting getSetting();
    /**
     * 备份数据库
     * @author duncan
     * @createTime 2011-11-8
     * @version 1.0
     */
    public boolean backup(Integer type) throws Exception ;
}
