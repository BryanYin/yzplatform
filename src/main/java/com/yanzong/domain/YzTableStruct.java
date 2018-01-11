package com.yanzong.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A YzTableStruct.
 */
@Entity
@Table(name = "yz_table_struct")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class YzTableStruct implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "table_schema")
    private String tableSchema;

    @Column(name = "table_name")
    private String tableName;

    @Column(name = "ordinal_position")
    private Integer ordinalPosition;

    @Column(name = "column_name")
    private String columnName;

    @Column(name = "data_type")
    private String dataType;

    @Column(name = "character_max_length")
    private Integer characterMaxLength;

    @Column(name = "numeric_precision")
    private Integer numericPrecision;

    @Column(name = "numeric_scale")
    private Integer numericScale;

    @Column(name = "nullable")
    private Boolean nullable;

    @Column(name = "column_default")
    private String columnDefault;

    @Column(name = "description")
    private String description;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTableSchema() {
        return tableSchema;
    }

    public YzTableStruct tableSchema(String tableSchema) {
        this.tableSchema = tableSchema;
        return this;
    }

    public void setTableSchema(String tableSchema) {
        this.tableSchema = tableSchema;
    }

    public String getTableName() {
        return tableName;
    }

    public YzTableStruct tableName(String tableName) {
        this.tableName = tableName;
        return this;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public Integer getOrdinalPosition() {
        return ordinalPosition;
    }

    public YzTableStruct ordinalPosition(Integer ordinalPosition) {
        this.ordinalPosition = ordinalPosition;
        return this;
    }

    public void setOrdinalPosition(Integer ordinalPosition) {
        this.ordinalPosition = ordinalPosition;
    }

    public String getColumnName() {
        return columnName;
    }

    public YzTableStruct columnName(String columnName) {
        this.columnName = columnName;
        return this;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public String getDataType() {
        return dataType;
    }

    public YzTableStruct dataType(String dataType) {
        this.dataType = dataType;
        return this;
    }

    public void setDataType(String dataType) {
        this.dataType = dataType;
    }

    public Integer getCharacterMaxLength() {
        return characterMaxLength;
    }

    public YzTableStruct characterMaxLength(Integer characterMaxLength) {
        this.characterMaxLength = characterMaxLength;
        return this;
    }

    public void setCharacterMaxLength(Integer characterMaxLength) {
        this.characterMaxLength = characterMaxLength;
    }

    public Integer getNumericPrecision() {
        return numericPrecision;
    }

    public YzTableStruct numericPrecision(Integer numericPrecision) {
        this.numericPrecision = numericPrecision;
        return this;
    }

    public void setNumericPrecision(Integer numericPrecision) {
        this.numericPrecision = numericPrecision;
    }

    public Integer getNumericScale() {
        return numericScale;
    }

    public YzTableStruct numericScale(Integer numericScale) {
        this.numericScale = numericScale;
        return this;
    }

    public void setNumericScale(Integer numericScale) {
        this.numericScale = numericScale;
    }

    public Boolean isNullable() {
        return nullable;
    }

    public YzTableStruct nullable(Boolean nullable) {
        this.nullable = nullable;
        return this;
    }

    public void setNullable(Boolean nullable) {
        this.nullable = nullable;
    }

    public String getColumnDefault() {
        return columnDefault;
    }

    public YzTableStruct columnDefault(String columnDefault) {
        this.columnDefault = columnDefault;
        return this;
    }

    public void setColumnDefault(String columnDefault) {
        this.columnDefault = columnDefault;
    }

    public String getDescription() {
        return description;
    }

    public YzTableStruct description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        YzTableStruct yzTableStruct = (YzTableStruct) o;
        if (yzTableStruct.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), yzTableStruct.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "YzTableStruct{" +
            "id=" + getId() +
            ", tableSchema='" + getTableSchema() + "'" +
            ", tableName='" + getTableName() + "'" +
            ", ordinalPosition=" + getOrdinalPosition() +
            ", columnName='" + getColumnName() + "'" +
            ", dataType='" + getDataType() + "'" +
            ", characterMaxLength=" + getCharacterMaxLength() +
            ", numericPrecision=" + getNumericPrecision() +
            ", numericScale=" + getNumericScale() +
            ", nullable='" + isNullable() + "'" +
            ", columnDefault='" + getColumnDefault() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
