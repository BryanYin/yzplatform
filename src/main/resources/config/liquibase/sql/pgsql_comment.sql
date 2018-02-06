--liquibase formatted sql

--changeset yz_comment:1
COMMENT ON COLUMN CDB_GRADE.name       IS '企业名称';
COMMENT ON COLUMN CDB_GRADE.scdw       IS '市场地位';
COMMENT ON COLUMN CDB_GRADE.ggbl       IS '杠杆比率';
COMMENT ON COLUMN CDB_GRADE.llys       IS '利率因素';
COMMENT ON COLUMN CDB_GRADE.xjldx      IS '现金流动性';
COMMENT ON COLUMN CDB_GRADE.csnl       IS '创收能力';
COMMENT ON COLUMN CDB_GRADE.ylnl       IS '盈利能力';
COMMENT ON COLUMN CDB_GRADE.khpj       IS '客户评级';
COMMENT ON COLUMN CDB_GRADE.country    IS '国家';
COMMENT ON COLUMN CDB_GRADE.event_time IS '填报时间';
COMMENT ON COLUMN CDB_GRADE.db_time    IS '入库时间';
