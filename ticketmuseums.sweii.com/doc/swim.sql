/*
SQLyog Enterprise - MySQL GUI v5.25
Host - 5.0.22-community-nt : Database - swim
*********************************************************************
Server version : 5.0.22-community-nt
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

create database if not exists `swim`;

USE `swim`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `id` int(11) NOT NULL auto_increment COMMENT 'ID',
  `username` varchar(32) collate utf8_unicode_ci NOT NULL COMMENT '用户登陆账号',
  `password` varchar(32) collate utf8_unicode_ci default NULL COMMENT '用户密码',
  `name` varchar(32) collate utf8_unicode_ci default NULL COMMENT '员工姓名',
  `type` int(11) default '0' COMMENT '1表示普通管理员,2表示超级管理员,3表示售票员',
  `status` int(11) default NULL COMMENT '用户当前状态,0为已停用,1为正常',
  `create_time` datetime NOT NULL default '0000-00-00 00:00:00' COMMENT '创建时间',
  `delete_flag` int(11) default '0' COMMENT '删除标志0,正常,1已删除',
  `phone` varchar(255) collate utf8_unicode_ci default NULL,
  `remark` varchar(255) collate utf8_unicode_ci default NULL,
  `login_flag` int(11) NOT NULL default '1' COMMENT '登录状态',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='用户表';

/*Data for the table `admin` */

insert  into `admin`(`id`,`username`,`password`,`name`,`type`,`status`,`create_time`,`delete_flag`,`phone`,`remark`,`login_flag`) values (1,'admin','e10adc3949ba59abbe56e057f20f883e','admin',2,1,'2013-04-17 09:43:01',0,'','',1),(35,'hong','670b14728ad9902aecba32e22fa4f6bd','hong',3,1,'2013-04-17 09:43:01',1,'','',1),(36,'mionvnv','e10adc3949ba59abbe56e057f20f883e','mionvnv',3,1,'2013-04-17 09:43:01',1,'','',1),(37,'0003','e10adc3949ba59abbe56e057f20f883e','0003',3,1,'2013-04-17 09:43:01',1,'','',1),(38,'0004','e10adc3949ba59abbe56e057f20f883e','0004',3,1,'2013-04-29 09:11:12',1,'','',1);

/*Table structure for table `admin_function` */

DROP TABLE IF EXISTS `admin_function`;

CREATE TABLE `admin_function` (
  `id` int(11) NOT NULL auto_increment COMMENT 'ID号',
  `admin_id` int(11) NOT NULL default '0' COMMENT '管理员ID',
  `function_id` int(11) NOT NULL default '0' COMMENT '权限ID',
  `create_time` datetime NOT NULL default '0000-00-00 00:00:00' COMMENT '创建时间',
  `right_type` int(11) NOT NULL default '0' COMMENT '权限类型:0:可访问，1:可授权',
  PRIMARY KEY  (`id`),
  KEY `FK_ADMIN_ADMIN_FUNCTION` (`admin_id`),
  KEY `FK_FUNCTION_ADMIN_FUNCTION` (`function_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `admin_function` */

/*Table structure for table `admin_role` */

DROP TABLE IF EXISTS `admin_role`;

CREATE TABLE `admin_role` (
  `id` int(11) NOT NULL auto_increment COMMENT 'ID号',
  `role_id` int(11) NOT NULL default '0' COMMENT '角色ID',
  `admin_id` int(11) NOT NULL default '0' COMMENT '用户ID',
  `create_time` datetime NOT NULL default '0000-00-00 00:00:00' COMMENT '创建时间',
  PRIMARY KEY  (`id`),
  KEY `FK_ADMIN_FK_ADMIN_ROLE` (`admin_id`),
  KEY `FK_ROLE_FK_ADMIN_ROLE` (`role_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `admin_role` */

insert  into `admin_role`(`id`,`role_id`,`admin_id`,`create_time`) values (1,2,35,'2013-04-17 10:55:04'),(2,2,37,'2013-04-22 01:41:59'),(3,2,36,'2013-04-22 01:43:18'),(4,2,38,'2013-04-29 09:11:20'),(5,3,38,'2013-04-29 09:11:20'),(6,3,36,'2013-04-29 09:11:25');

/*Table structure for table `bak_database` */

DROP TABLE IF EXISTS `bak_database`;

CREATE TABLE `bak_database` (
  `id` int(11) NOT NULL auto_increment COMMENT 'ID号',
  `bak_time` datetime NOT NULL COMMENT '备份时间',
  `file_name` varchar(255) NOT NULL COMMENT '文件名',
  `file_size` varchar(255) NOT NULL COMMENT '文件大小',
  `path` varchar(255) NOT NULL COMMENT '保存路径',
  `type` int(11) NOT NULL default '1' COMMENT '类型,1表示自动备份,2表示手动备份',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='数据库备注日志';

/*Data for the table `bak_database` */

/*Table structure for table `card_info` */

DROP TABLE IF EXISTS `card_info`;

CREATE TABLE `card_info` (
  `id` int(11) NOT NULL auto_increment COMMENT 'ID号',
  `number` varchar(128) collate utf8_unicode_ci NOT NULL default '' COMMENT '34位卡号',
  `card_number` varchar(32) collate utf8_unicode_ci NOT NULL COMMENT '26位卡号',
  `card` varchar(32) collate utf8_unicode_ci NOT NULL COMMENT '卡表面编号',
  `pk_number` varchar(128) collate utf8_unicode_ci default NULL COMMENT 'key',
  `create_time` datetime default NULL COMMENT '创建时间',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='卡信息对照表';

/*Data for the table `card_info` */

insert  into `card_info`(`id`,`number`,`card_number`,`card`,`pk_number`,`create_time`) values (1,'0014461471','0014461471','A000001',NULL,'2013-06-14 12:12:12'),(2,'0014488844','0014488844','A000002',NULL,'2013-06-14 12:12:12'),(3,'0001552155','0001552155','A000003',NULL,'2013-06-14 12:12:12'),(4,'0002210615','0002210615','A000004',NULL,'2013-06-14 12:12:12');

/*Table structure for table `code` */

DROP TABLE IF EXISTS `code`;

CREATE TABLE `code` (
  `id` int(11) NOT NULL auto_increment COMMENT 'ID号',
  `parent_id` int(11) default NULL COMMENT '父ID',
  `code_type` varchar(40) default NULL COMMENT '类型CODE',
  `code_name` varchar(100) default NULL COMMENT '名称',
  `code_value` varchar(100) default NULL COMMENT '代码值',
  `show_type` int(11) NOT NULL default '0' COMMENT '是否显示',
  `type` int(11) NOT NULL default '0' COMMENT '类型',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `code` */

insert  into `code`(`id`,`parent_id`,`code_type`,`code_name`,`code_value`,`show_type`,`type`) values (1,0,'ticketType','票种类型','0',0,0),(2,1,'ticketType','会员卡','1',0,0),(3,1,'ticketType','月票卡','2',0,0),(4,1,'ticketType','培训卡','3',0,0),(5,1,'ticketType','员工卡','4',0,0),(6,1,'ticketType','散客卡','5',0,0);

/*Table structure for table `equipment` */

DROP TABLE IF EXISTS `equipment`;

CREATE TABLE `equipment` (
  `id` int(11) NOT NULL auto_increment COMMENT 'ID号',
  `name` varchar(255) NOT NULL COMMENT '名称',
  `ip` varchar(255) NOT NULL COMMENT 'IP地址',
  `port` int(11) NOT NULL COMMENT '端口',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `flag` int(11) NOT NULL default '1' COMMENT '是否删除,1表示正常,0表示删除',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='设备';

/*Data for the table `equipment` */

insert  into `equipment`(`id`,`name`,`ip`,`port`,`create_time`,`flag`) values (1,'设备','192.168.1.100',1766,'2013-06-20 12:12:12',1);

/*Table structure for table `extend_ticket` */

DROP TABLE IF EXISTS `extend_ticket`;

CREATE TABLE `extend_ticket` (
  `id` int(11) NOT NULL auto_increment COMMENT 'ID号',
  `user_id` int(11) NOT NULL COMMENT '会员ID',
  `price` int(11) NOT NULL COMMENT '金额',
  `creator_id` int(11) NOT NULL COMMENT '创建人ID',
  `creator` varchar(32) NOT NULL COMMENT '创建人',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `extend_date` datetime NOT NULL COMMENT '续费日期',
  `old_end_time` datetime NOT NULL COMMENT '旧结束时间',
  `new_end_time` datetime NOT NULL COMMENT '新结束时间',
  PRIMARY KEY  (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='续费';

/*Data for the table `extend_ticket` */

insert  into `extend_ticket`(`id`,`user_id`,`price`,`creator_id`,`creator`,`create_time`,`extend_date`,`old_end_time`,`new_end_time`) values (1,2,250,1,'admin','2013-06-19 17:22:06','2013-06-19 00:00:00','2014-06-19 00:00:00','2015-06-18 00:00:00'),(2,2,250,1,'admin','2013-06-19 17:22:15','2013-06-19 00:00:00','2014-06-19 00:00:00','2015-06-18 00:00:00'),(3,2,250,1,'admin','2013-06-19 17:22:31','2013-06-19 00:00:00','2014-06-19 00:00:00','2015-06-18 00:00:00'),(4,2,250,1,'admin','2013-06-19 17:22:40','2013-06-19 00:00:00','2014-06-19 00:00:00','2015-06-18 00:00:00'),(5,2,250,1,'admin','2013-06-19 17:25:23','2013-06-19 00:00:00','2014-06-19 00:00:00','2015-06-18 00:00:00');

/*Table structure for table `function` */

DROP TABLE IF EXISTS `function`;

CREATE TABLE `function` (
  `id` int(11) NOT NULL auto_increment COMMENT 'ID号',
  `code` varchar(32) collate utf8_unicode_ci NOT NULL COMMENT '功能点编号',
  `name` varchar(32) collate utf8_unicode_ci NOT NULL COMMENT '功能点名称',
  `description` varchar(255) collate utf8_unicode_ci default NULL COMMENT '功能点描述',
  `module_id` int(11) NOT NULL default '0' COMMENT '模块ID',
  `permission` text collate utf8_unicode_ci COMMENT '功能权限XML',
  `create_time` datetime NOT NULL default '0000-00-00 00:00:00' COMMENT '创建时间',
  `order_index` int(11) default NULL COMMENT '序号',
  `important_flag` int(11) default '0' COMMENT '是否重要,1.为重要,0为一般',
  PRIMARY KEY  (`id`),
  KEY `FK_MODULE_FK_FUNCTION` (`module_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='菜单功能点';

/*Data for the table `function` */

insert  into `function`(`id`,`code`,`name`,`description`,`module_id`,`permission`,`create_time`,`order_index`,`important_flag`) values (1,'sale','售票','',606,'<permission><page><location></location></page></permission>','2013-04-17 10:52:28',0,0),(2,'ticketLog','售票信息','',610,'<permission><page><location></location></page></permission>','2013-04-17 10:52:57',0,0),(3,'returnTicket','退票','',612,'<permission><page><location></location></page></permission>','2013-04-17 13:27:57',0,0),(4,'returnLog','退票明细','',619,'<permission><page><location></location></page></permission>','2013-04-17 13:28:13',0,0),(5,'list','查看','',622,'<permission><page><location></location></page></permission>','2013-04-22 01:40:05',0,0),(9,'list','查看','',626,'<permission><page><location></location></page></permission>','2013-04-24 11:43:42',0,0),(15,'list','查看','',613,'<permission><page><location></location></page></permission>','2013-04-25 02:38:15',0,0),(16,'list','查看','',614,'<permission><page><location></location></page></permission>','2013-04-25 02:38:22',0,0),(17,'list','查看','',615,'<permission><page><location></location></page></permission>','2013-04-25 02:38:30',0,0),(18,'list','查看','',616,'<permission><page><location></location></page></permission>','2013-04-25 02:38:38',0,0),(19,'list','查看','',617,'<permission><page><location></location></page></permission>','2013-04-25 02:38:45',0,0),(20,'list','查看','',439,'<permission><page><location></location></page></permission>','2013-04-25 02:39:02',0,0),(21,'add','新建','',439,'<permission><page><location></location></page></permission>','2013-04-25 02:39:09',0,0),(22,'edit','修改','',439,'<permission><page><location></location></page></permission>','2013-04-25 02:39:17',0,0),(23,'del','删除','',439,'<permission><page><location></location></page></permission>','2013-04-25 02:39:24',0,0),(24,'list','查看','',451,'<permission><page><location></location></page></permission>','2013-04-25 02:39:48',0,0),(25,'add','新建','',451,'<permission><page><location></location></page></permission>','2013-04-25 02:39:54',0,0),(26,'edit','修改','',451,'<permission><page><location></location></page></permission>','2013-04-25 02:39:59',0,0),(27,'del','删除','',451,'<permission><page><location></location></page></permission>','2013-04-25 02:40:06',0,0),(32,'list','查看','',621,'<permission><page><location></location></page></permission>','2013-04-25 02:40:59',0,0),(33,'add','新建','',621,'<permission><page><location></location></page></permission>','2013-04-25 02:41:04',0,0),(34,'edit','修改','',621,'<permission><page><location></location></page></permission>','2013-04-25 02:41:10',0,0),(35,'del','删除','',621,'<permission><page><location></location></page></permission>','2013-04-25 02:41:17',0,0),(42,'add','新建','',632,'<permission><page><location></location></page></permission>','2013-05-10 09:31:34',0,0),(43,'edit','修改','',632,'<permission><page><location></location></page></permission>','2013-05-10 09:31:44',0,0),(44,'list','查看','',633,'<permission><page><location></location></page></permission>','2013-06-09 11:34:01',0,0),(45,'change','作废','',626,'<permission><page><location></location></page></permission>','2013-06-09 11:37:14',0,0);

/*Table structure for table `mend_ticket` */

DROP TABLE IF EXISTS `mend_ticket`;

CREATE TABLE `mend_ticket` (
  `id` int(11) NOT NULL auto_increment COMMENT 'ID号',
  `user_id` int(255) default NULL COMMENT '会员ID',
  `ticket_id` int(11) NOT NULL COMMENT '票种ID',
  `number` varchar(255) NOT NULL COMMENT '新卡号',
  `old_number` varchar(255) NOT NULL COMMENT '旧卡号',
  `price` int(11) NOT NULL default '0' COMMENT '补卡工本费',
  `pre_price` int(11) NOT NULL default '0' COMMENT '补卡押金',
  `creator_id` int(11) NOT NULL COMMENT '操作人ID',
  `creator` varchar(255) NOT NULL COMMENT '操作人',
  `create_time` datetime NOT NULL COMMENT '补卡时间',
  `mend_date` datetime NOT NULL COMMENT '补卡日期',
  PRIMARY KEY  (`id`),
  KEY `user_id` (`user_id`),
  KEY `ticket_id` (`ticket_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='补卡记录';

/*Data for the table `mend_ticket` */

insert  into `mend_ticket`(`id`,`user_id`,`ticket_id`,`number`,`old_number`,`price`,`pre_price`,`creator_id`,`creator`,`create_time`,`mend_date`) values (1,2,2,'A000004','A000002',10,0,1,'admin','2013-06-19 17:00:37','2013-06-19 00:00:00');

/*Table structure for table `menu` */

DROP TABLE IF EXISTS `menu`;

CREATE TABLE `menu` (
  `id` int(11) NOT NULL auto_increment COMMENT 'ID号',
  `type` varchar(32) collate utf8_unicode_ci NOT NULL COMMENT '菜单类型.ROOT根菜单,CATEGORY,分级菜单,LEAF子菜单',
  `name` varchar(64) collate utf8_unicode_ci NOT NULL COMMENT '菜单名称',
  `title` varchar(64) collate utf8_unicode_ci default NULL COMMENT '菜单标题',
  `description` varchar(255) collate utf8_unicode_ci default NULL COMMENT '菜单描述',
  `create_time` datetime NOT NULL default '0000-00-00 00:00:00' COMMENT '创建时间',
  `update_time` datetime default NULL COMMENT '更新时间',
  `parent_id` int(11) default '0' COMMENT '上级菜单ID',
  `module_id` int(11) default NULL COMMENT '模块ID',
  `category_id` int(11) default NULL COMMENT '根分类模板分类ID',
  `status` int(11) default '1' COMMENT '状态,1为显示,0为不显示',
  `order_index` int(11) default NULL COMMENT '菜单序号',
  `tree` varchar(64) collate utf8_unicode_ci default NULL COMMENT '菜单树形关系',
  `icon` varchar(255) collate utf8_unicode_ci default NULL COMMENT '菜单图标',
  `tree_level` int(11) default '0' COMMENT '树级数',
  PRIMARY KEY  (`id`),
  KEY `FK_MODULE_FK_MENU` (`module_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `menu` */

insert  into `menu`(`id`,`type`,`name`,`title`,`description`,`create_time`,`update_time`,`parent_id`,`module_id`,`category_id`,`status`,`order_index`,`tree`,`icon`,`tree_level`) values (1,'ROOT','售票管理&nbsp;&nbsp;','售票管理','售票管理','2011-08-15 15:25:10','2013-03-30 15:56:08',0,NULL,1,1,1,'0','image/Iconj.gif',0),(4,'ROOT','基本信息&nbsp;&nbsp;','基本信息','基本信息','2012-07-13 14:44:17','2012-11-02 10:19:27',0,NULL,7,1,95,'0','image/Iconp.gif',0),(5,'ROOT','统计报表&nbsp;&nbsp;','统计报表','统计报表','2012-07-13 14:44:26','2012-07-13 14:44:26',0,NULL,5,1,159,'0','image/Iconj.gif',0),(9,'ROOT','系统管理&nbsp;&nbsp;','系统管理','系统管理','2010-12-20 16:44:00','2010-12-20 16:44:00',0,NULL,9,1,298,'0','image/Iconj.gif',0),(105,'LEAF','用户管理','用户管理','用户管理','2010-12-20 17:22:04','2010-12-20 17:22:04',9,6,NULL,1,298,'0','/Icons/icon009a1.gif',0),(106,'LEAF','模块分类','模块分类','模块分类','2010-12-20 20:44:05','2010-12-20 20:44:05',9,7,NULL,1,298,'0','/Icons/icon009a1.gif',0),(107,'LEAF','模块管理','模块管理','模块管理','2010-12-20 20:44:47','2010-12-20 20:44:47',9,8,NULL,1,298,'0','/Icons/icon009a1.gif',0),(108,'LEAF','菜单管理','菜单管理','菜单管理','2010-12-20 20:45:19','2010-12-20 20:45:19',9,9,NULL,1,298,'0','/Icons/icon009a1.gif',0),(109,'LEAF','角色权限','角色权限','角色权限','2010-12-20 20:45:49','2012-08-02 10:17:14',9,10,NULL,1,298,'0','/Icons/icon009a1.gif',0),(749,'LEAF','售票统计表','售票统计表','售票统计表','2013-04-10 14:53:27','2013-04-10 14:53:27',5,613,NULL,1,160,'0,5','Icons/icon031a1.gif',1),(750,'LEAF','日售票统计表','日售票统计表','日售票统计表','2013-04-10 14:54:45','2013-04-25 01:52:09',5,614,NULL,1,161,'0,5','Icons/icon031a1.gif',1),(751,'LEAF','月售票统计表','月售票统计表','月售票统计表','2013-04-10 14:55:08','2013-04-10 14:55:08',5,615,NULL,1,162,'0,5','Icons/icon031a1.gif',1),(752,'LEAF','年售票统计表','年售票统计表','年售票统计表','2013-04-10 14:55:20','2013-04-10 14:55:28',5,616,NULL,1,163,'0,5','Icons/icon031a1.gif',1),(753,'LEAF','售票员交班表','售票员交班表','售票员交班表','2013-04-10 14:55:41','2013-04-10 14:55:41',5,617,NULL,1,164,'0,5','Icons/icon031a1.gif',1),(769,'LEAF','数据库备份','数据库备份','数据库备份','2013-04-28 19:14:00','2013-04-28 19:14:00',9,630,NULL,1,299,'0,9','Icons/icon009a1.gif',1),(773,'LEAF','散客售票','散客售票','散客售票','2013-06-13 10:50:51','2013-06-13 10:50:51',1,634,NULL,1,2,'0,1','Icons/icon023a1.gif',1),(774,'LEAF','会员售票','会员售票','会员售票','2013-06-13 10:51:05','2013-06-13 10:51:05',1,635,NULL,1,3,'0,1','Icons/icon023a1.gif',1),(775,'LEAF','退还押金','退还押金','退还押金','2013-06-13 10:51:34','2013-06-13 10:51:34',1,636,NULL,1,4,'0,1','Icons/icon023a1.gif',1),(776,'LEAF','会员补卡','会员补卡','会员补卡','2013-06-13 10:51:50','2013-06-13 10:51:50',1,637,NULL,1,5,'0,1','Icons/icon023a1.gif',1),(777,'LEAF','会员续费','会员续费','会员续费','2013-06-13 10:52:10','2013-06-13 10:52:10',1,638,NULL,1,6,'0,1','Icons/icon023a1.gif',1),(778,'LEAF','会员查询','会员查询','会员查询','2013-06-13 10:52:23','2013-06-13 10:52:23',1,639,NULL,1,7,'0,1','Icons/icon023a1.gif',1),(779,'LEAF','闸机管理','闸机管理','闸机管理','2013-06-13 10:52:50','2013-06-13 10:52:50',4,646,NULL,1,96,'0,4','Icons/icon023a1.gif',1),(780,'LEAF','显示屏设置','显示屏设置','显示屏设置','2013-06-13 10:53:12','2013-06-13 10:53:12',4,647,NULL,1,97,'0,4','Icons/icon023a1.gif',1),(781,'LEAF','票种定义','票种定义','票种定义','2013-06-13 10:53:29','2013-06-13 10:53:29',4,648,NULL,1,98,'0,4','Icons/icon023a1.gif',1),(782,'LEAF','会员信息报表','会员信息报表','会员信息报表','2013-06-13 10:54:05','2013-06-13 10:54:43',5,641,NULL,1,165,'0,5','Icons/icon031a1.gif',1),(783,'LEAF','散客票报表','散客票报表','散客票报表','2013-06-13 10:55:43','2013-06-13 10:55:52',5,640,NULL,1,166,'0,5','Icons/icon031a1.gif',1),(784,'LEAF','补卡报表','补卡报表','补卡报表','2013-06-13 10:56:12','2013-06-13 10:56:12',5,644,NULL,1,167,'0,5','Icons/icon031a1.gif',1),(785,'LEAF','退票报表','退票报表','退票报表','2013-06-13 10:56:28','2013-06-13 10:56:28',5,643,NULL,1,168,'0,5','Icons/icon031a1.gif',1),(786,'LEAF','续费报表','续费报表','续费报表','2013-06-13 10:56:48','2013-06-13 10:56:48',5,645,NULL,1,169,'0,5','Icons/icon031a1.gif',1),(787,'LEAF','进馆流量报表','进馆流量报表','进馆流量报表','2013-06-13 10:57:13','2013-06-13 10:57:13',5,642,NULL,1,170,'0,5','Icons/icon031a1.gif',1);

/*Table structure for table `module` */

DROP TABLE IF EXISTS `module`;

CREATE TABLE `module` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(32) collate utf8_unicode_ci NOT NULL COMMENT '模块名称',
  `description` varchar(255) collate utf8_unicode_ci default NULL COMMENT '模块描述',
  `status` int(11) default '1' COMMENT '状态,1可用,0不可用',
  `category_id` int(11) NOT NULL default '0' COMMENT '模块分类ID',
  `entry_url` varchar(255) collate utf8_unicode_ci default NULL COMMENT '进口URL',
  `create_time` datetime NOT NULL default '0000-00-00 00:00:00' COMMENT '创建时间',
  PRIMARY KEY  (`id`),
  KEY `FK_MODULE_CATEGORY_FK_MODULE` (`category_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `module` */

insert  into `module`(`id`,`name`,`description`,`status`,`category_id`,`entry_url`,`create_time`) values (6,'用户管理','用户管理',1,9,'/common/queryAdminAdmin.do?subHeight=100&admin.deleteFlag=0','2010-12-20 17:22:04'),(7,'模块分类','模块分类',1,9,'/admin/queryModuleCategory.do?subHeight=100','2010-12-20 20:44:05'),(8,'模块管理','模块管理',1,9,'/admin/queryModule.do?subHeight=100','2010-12-20 20:44:47'),(9,'菜单管理','菜单管理',1,9,'/admin/queryMenuPage.do?subHeight=100','2010-12-20 20:45:19'),(10,'角色管理','角色管理',1,9,'/common/queryBaseRole.do?subHeight=100','2010-12-20 20:45:49'),(613,'售票统计表','售票统计表',0,5,'report/reportSaleTicket.do','2013-04-10 14:53:16'),(614,'日售票统计表','日售票统计表',0,5,'report/reportTimeSaleTicket.do?type=1','2013-04-10 14:53:49'),(615,'月售票统计表','月售票统计表',0,5,'report/reportTimeSaleTicket.do?type=2','2013-04-10 14:54:00'),(616,'年售票统计表','年售票统计表',0,5,'report/reportTimeSaleTicket.do?type=3','2013-04-10 14:54:10'),(617,'售票员交班表','售票员交班表',0,5,'report/reportAdminTicket.do','2013-04-10 14:54:20'),(630,'数据库备份','数据库备份',0,9,'/common/viewSetting.do?id=1&jsp=/setting/DatabaseSetting.jsp','2013-04-28 19:11:57'),(634,'散客售票','散客售票',0,1,'/ticket/prepareCommonSaleTicket.do','2013-06-13 10:42:46'),(635,'会员售票','会员售票',0,1,'/ticket/prepareSaleUserTicket.do','2013-06-13 10:42:59'),(636,'退还押金','退还押金',0,1,'/ticket/ReturnPrice.jsp','2013-06-13 10:43:29'),(637,'会员补卡','会员补卡',0,1,'/ticket/prepareMendTicket.do','2013-06-13 10:43:53'),(638,'会员续费','会员续费',0,1,'/ticket/ExtendTicket.jsp','2013-06-13 10:44:07'),(639,'会员查询','会员查询',0,1,'/ticket/QueryUser.jsp','2013-06-13 10:44:18'),(640,'散客票报表','散客票报表',0,5,'#','2013-06-13 10:44:41'),(641,'会员信息表','会员信息表',0,5,'/common/queryExcelUser.do','2013-06-13 10:46:00'),(642,'进馆流量表','进馆流量表',0,5,'/common/queryExcelRecordLog.do','2013-06-13 10:47:30'),(643,'退票报表','退票报表',0,5,'/common/queryExcelReturnTicket.do','2013-06-13 10:48:10'),(644,'补卡报表','补卡报表',0,5,'/common/queryExcelMendTicket.do','2013-06-13 10:48:30'),(645,'续费报表','续费报表',0,5,'/common/queryExcelExtendTicket.do','2013-06-13 10:48:44'),(646,'闸机管理','闸机管理',0,7,'/common/queryBaseEquipment.do','2013-06-13 10:49:03'),(647,'显示屏设置','显示屏设置',0,7,'/common/queryBaseTip.do','2013-06-13 10:49:21'),(648,'票种定义','票种定义',0,7,'/common/queryBaseTicket.do','2013-06-13 10:49:35');

/*Table structure for table `module_category` */

DROP TABLE IF EXISTS `module_category`;

CREATE TABLE `module_category` (
  `id` int(11) NOT NULL auto_increment COMMENT 'ID号',
  `name` varchar(255) collate utf8_unicode_ci NOT NULL COMMENT '模块分类名称',
  `parent_id` int(11) default '0' COMMENT '上级分类ID',
  `description` varchar(255) collate utf8_unicode_ci default NULL COMMENT '描述信息',
  `create_time` datetime default NULL COMMENT '创建时间',
  `tree` varchar(255) collate utf8_unicode_ci default NULL COMMENT '树结构',
  `order_index` int(11) NOT NULL default '1' COMMENT '顺序',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `module_category` */

insert  into `module_category`(`id`,`name`,`parent_id`,`description`,`create_time`,`tree`,`order_index`) values (1,'售票管理',0,'陆公园售票','2012-07-13 14:10:53','',1),(5,'统计报表',0,'统计报表','2011-08-27 14:35:53','',5),(7,'基本配置',0,'基本配置','2012-07-13 14:10:38','',7),(9,'系统管理',0,'系统管理','2010-12-20 17:20:57','',8);

/*Table structure for table `qos` */

DROP TABLE IF EXISTS `qos`;

CREATE TABLE `qos` (
  `id` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=gbk;

/*Data for the table `qos` */

/*Table structure for table `record_log` */

DROP TABLE IF EXISTS `record_log`;

CREATE TABLE `record_log` (
  `id` int(11) NOT NULL auto_increment COMMENT 'ID号',
  `user_id` int(11) default NULL COMMENT '会员ID',
  `sale_ticket_id` int(11) default NULL COMMENT '散票ID',
  `ticket_id` int(11) NOT NULL COMMENT '票种ID',
  `type` int(11) NOT NULL default '1' COMMENT '票据类型,1表示会员卡,2表示月票卡,3表示培训卡,4表示员工卡,5表示临时卡',
  `number` varchar(255) NOT NULL COMMENT '卡号',
  `equip_id` int(11) NOT NULL COMMENT '设备ID',
  `status` int(11) NOT NULL default '1' COMMENT '状态，1表示未过闸，2表示已过闸',
  `create_time` datetime NOT NULL COMMENT '刷卡时间',
  `pass_time` datetime default NULL COMMENT '过闸时间',
  PRIMARY KEY  (`id`),
  KEY `user_id` (`user_id`),
  KEY `sale_ticket_id` (`sale_ticket_id`),
  KEY `ticket_id` (`ticket_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='刷卡记录';

/*Data for the table `record_log` */

/*Table structure for table `return_ticket` */

DROP TABLE IF EXISTS `return_ticket`;

CREATE TABLE `return_ticket` (
  `id` int(11) NOT NULL auto_increment COMMENT 'ID号',
  `user_id` int(11) NOT NULL COMMENT '会员ID',
  `pre_price` int(11) NOT NULL default '0' COMMENT '退还押金',
  `creator_id` int(11) NOT NULL COMMENT '创建人ID',
  `creator` varchar(255) NOT NULL COMMENT '创建人',
  `return_time` datetime NOT NULL COMMENT '退卡时间',
  `return_date` datetime NOT NULL COMMENT '退卡日期',
  PRIMARY KEY  (`id`),
  KEY `sale_ticket_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='退卡管理';

/*Data for the table `return_ticket` */

insert  into `return_ticket`(`id`,`user_id`,`pre_price`,`creator_id`,`creator`,`return_time`,`return_date`) values (1,1,10,1,'admin','2013-06-19 15:49:17','2013-06-19 00:00:00'),(2,5,10,1,'admin','2013-06-19 15:51:44','2013-06-19 00:00:00');

/*Table structure for table `role` */

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` int(11) NOT NULL auto_increment COMMENT 'ID号',
  `name` varchar(255) collate utf8_unicode_ci NOT NULL COMMENT '角色名称',
  `description` varchar(255) collate utf8_unicode_ci default NULL COMMENT '角色描述',
  `create_time` datetime NOT NULL default '0000-00-00 00:00:00' COMMENT '创建时间',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='角色';

/*Data for the table `role` */

insert  into `role`(`id`,`name`,`description`,`create_time`) values (2,'客服售票员','客服部','2012-12-07 16:35:37'),(3,'财务管理','财务管理','2013-04-29 09:09:46');

/*Table structure for table `role_function` */

DROP TABLE IF EXISTS `role_function`;

CREATE TABLE `role_function` (
  `id` int(11) NOT NULL auto_increment COMMENT 'ID号',
  `role_id` int(11) NOT NULL default '0' COMMENT '角色ID',
  `function_id` int(11) NOT NULL default '0' COMMENT '功能点ID',
  `right_type` int(11) NOT NULL default '0' COMMENT '权限类型(0:可访问，1:可授权）',
  `create_time` datetime NOT NULL default '0000-00-00 00:00:00' COMMENT '创建时间',
  PRIMARY KEY  (`id`),
  KEY `FK_FUNCTION_FK_ROLE_FUNCTION` (`function_id`),
  KEY `FK_ROLE_FK_ROLE_FUNCTION` (`role_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `role_function` */

insert  into `role_function`(`id`,`role_id`,`function_id`,`right_type`,`create_time`) values (1,2,1,1,'2013-05-10 18:25:26'),(2,2,2,1,'2013-05-10 18:25:27'),(3,2,5,1,'2013-05-10 18:25:29'),(4,2,9,1,'2013-05-10 18:25:29'),(5,2,44,1,'2013-06-09 13:28:19');

/*Table structure for table `sale_ticket` */

DROP TABLE IF EXISTS `sale_ticket`;

CREATE TABLE `sale_ticket` (
  `id` int(11) NOT NULL auto_increment COMMENT 'ID号',
  `number` varchar(255) NOT NULL COMMENT '34位卡号',
  `card_number` varchar(255) NOT NULL COMMENT '26位卡号',
  `card` varchar(255) NOT NULL COMMENT '表面卡号',
  `ticket_id` int(11) NOT NULL COMMENT '票种ID',
  `price` int(11) NOT NULL COMMENT '价格',
  `status` int(11) NOT NULL COMMENT '状态,1表示使用中，2表示已使用,3表示已过期',
  `sale_date` datetime NOT NULL COMMENT '售票日期',
  `end_time` datetime NOT NULL COMMENT '有效期至',
  `use_time` datetime default NULL COMMENT '使用时间',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `creator_id` int(11) NOT NULL COMMENT '创建人',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='售票明细表';

/*Data for the table `sale_ticket` */

/*Table structure for table `setting` */

DROP TABLE IF EXISTS `setting`;

CREATE TABLE `setting` (
  `id` int(11) NOT NULL COMMENT 'ID号',
  `auto_bak` int(11) NOT NULL default '1' COMMENT '是否自动备份数据库',
  `bak_path` varchar(500) default NULL COMMENT '备份路径',
  `days` int(11) default '1' COMMENT '每隔几天备份一次',
  `time1` varchar(377) default NULL,
  `time2` varchar(377) default NULL,
  `time3` varchar(377) default NULL,
  `time4` varchar(377) default NULL,
  `time5` varchar(377) default NULL,
  `time6` varchar(377) default NULL,
  `time7` varchar(377) default NULL,
  `time8` varchar(377) default NULL,
  `time9` varchar(377) default NULL,
  `time10` varchar(377) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

/*Data for the table `setting` */

insert  into `setting`(`id`,`auto_bak`,`bak_path`,`days`,`time1`,`time2`,`time3`,`time4`,`time5`,`time6`,`time7`,`time8`,`time9`,`time10`) values (1,1,'D:\\Program Files\\mysql数据库备份',1,'23:59','09:00','18:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,2,NULL,1,'21:59',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

/*Table structure for table `ticket` */

DROP TABLE IF EXISTS `ticket`;

CREATE TABLE `ticket` (
  `id` int(11) NOT NULL auto_increment COMMENT 'ID号',
  `name` varchar(255) NOT NULL COMMENT '名称',
  `type` int(11) NOT NULL COMMENT '票据类型,1表示会员卡,2表示月票卡,3表示培训卡,4表示员工卡,5表示临时卡',
  `price` int(11) NOT NULL default '0' COMMENT '票价',
  `pre_price` int(11) default '0' COMMENT '押金',
  `remark` varchar(255) default NULL COMMENT '备注',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `size` int(11) NOT NULL default '1' COMMENT '次数',
  `limit_hours` int(11) NOT NULL default '0' COMMENT '0表示无限制,大于0表示限制每隔小时数',
  `flag` int(11) NOT NULL default '1' COMMENT '是否删除,1表示正常,0表示删除',
  PRIMARY KEY  (`id`),
  KEY `type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='票种类型';

/*Data for the table `ticket` */

insert  into `ticket`(`id`,`name`,`type`,`price`,`pre_price`,`remark`,`create_time`,`size`,`limit_hours`,`flag`) values (1,'会员卡',1,0,0,NULL,'2013-04-04 00:00:00',1,0,1),(2,'月票卡(成人)',2,250,10,NULL,'2013-04-04 00:00:00',1,3,1),(3,'月票卡(儿童)',2,150,10,NULL,'2013-04-04 00:00:00',1,3,1),(4,'培训卡(成人)',3,500,10,NULL,'2013-04-04 00:00:00',20,3,1),(5,'培训卡(儿童)',3,250,10,NULL,'2013-04-04 00:00:00',20,3,1),(6,'员工卡',4,0,0,NULL,'2013-04-04 00:00:00',1,0,1),(7,'门票卡(成人)',5,15,0,NULL,'2013-04-04 00:00:00',1,0,1),(8,'门票卡(儿童)',5,12,0,NULL,'2013-04-04 00:00:00',1,0,1);

/*Table structure for table `tip` */

DROP TABLE IF EXISTS `tip`;

CREATE TABLE `tip` (
  `id` int(11) NOT NULL auto_increment COMMENT 'ID号',
  `name` varchar(255) NOT NULL COMMENT '模块功能',
  `fun_name` varchar(255) NOT NULL COMMENT '功能名称',
  `code` varchar(255) NOT NULL COMMENT '代码',
  `message` varchar(255) NOT NULL COMMENT '内容',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tip` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL auto_increment COMMENT 'ID号',
  `number` varchar(255) NOT NULL COMMENT '卡号,34位',
  `card_number` varchar(255) NOT NULL COMMENT '卡号,26位',
  `card` varchar(255) NOT NULL COMMENT '表面',
  `name` varchar(255) NOT NULL COMMENT '姓名',
  `sex` varchar(10) NOT NULL COMMENT '性别',
  `price` int(11) NOT NULL default '0' COMMENT '售票价格',
  `pre_price` int(11) NOT NULL default '0' COMMENT '押金金额',
  `phone` varchar(255) default NULL COMMENT '电话',
  `person_no` varchar(255) default NULL COMMENT '证件号',
  `start_time` datetime NOT NULL COMMENT '开始日期',
  `end_time` datetime NOT NULL COMMENT '结束日期',
  `photo` varchar(255) default NULL COMMENT '照片',
  `ticket_id` int(11) default NULL COMMENT '票据ID',
  `times` int(11) NOT NULL default '0' COMMENT '使用次数',
  `size` int(11) NOT NULL default '0' COMMENT '剩余次数',
  `extend_times` int(11) NOT NULL default '0' COMMENT '续期次数',
  `mend_times` int(11) NOT NULL default '0' COMMENT '补卡次数',
  `last_time` datetime default NULL COMMENT '最后使用时间',
  `creator_id` int(11) NOT NULL COMMENT '创建人ID',
  `creator` varchar(255) NOT NULL COMMENT '创建人',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `status` int(11) NOT NULL default '1' COMMENT '1表示未退押金,2表示已退押金',
  `flag` int(11) NOT NULL default '1' COMMENT '删除标识,1表示正常,2表示删除',
  `remark` varchar(255) default NULL,
  PRIMARY KEY  (`id`),
  KEY `number` (`number`),
  KEY `ticket_id` (`ticket_id`),
  KEY `price` (`price`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='会员';

/*Data for the table `user` */

insert  into `user`(`id`,`number`,`card_number`,`card`,`name`,`sex`,`price`,`pre_price`,`phone`,`person_no`,`start_time`,`end_time`,`photo`,`ticket_id`,`times`,`size`,`extend_times`,`mend_times`,`last_time`,`creator_id`,`creator`,`create_time`,`status`,`flag`,`remark`) values (1,'0002210615','0002210615','A000004','张三','男',250,10,'','','2013-06-17 00:00:00','2014-06-17 00:00:00','',2,0,0,0,0,NULL,1,'admin','2013-06-17 11:46:19',2,1,NULL),(2,'0002210615','0002210615','A000004','李四','男',250,10,'','','2013-06-19 00:00:00','2015-06-18 00:00:00','',2,0,5,5,2,NULL,1,'admin','2013-06-19 15:19:49',1,1,NULL),(3,'0014461471','0014461471','A000001','王五','男',150,10,'','','2013-06-19 00:00:00','2014-06-19 00:00:00','',3,0,0,0,0,NULL,1,'admin','2013-06-19 15:20:07',1,1,NULL),(4,'0001552155','0001552155','A000003','李宁','男',250,10,'','','2013-06-19 00:00:00','2014-06-19 00:00:00','',5,0,0,0,0,NULL,1,'admin','2013-06-19 15:20:24',1,1,NULL),(5,'0002210615','0002210615','A000004','王五','男',150,10,'','','2013-06-19 00:00:00','2014-06-19 00:00:00','',3,0,0,0,0,NULL,1,'admin','2013-06-19 15:51:39',2,1,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
