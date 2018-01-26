package com.yanzong.config;

/**
 * Application constants.
 */
public final class Constants {

    // Regex for acceptable logins
    public static final String LOGIN_REGEX = "^[_'.@A-Za-z0-9-]*$";

    public static final String SYSTEM_ACCOUNT = "system";
    public static final String ANONYMOUS_USER = "anonymoususer";
    public static final String DEFAULT_LANGUAGE = "en";

    public static final String TB_YZ_SCHEMA_TABLE = "yz_schema_table";
    public static final String TB_YZ_TABLE_STRUCT = "yz_table_struct";
    public static final String TB_JHI_USER = "jhi_user";

    private Constants() {
    }
}
