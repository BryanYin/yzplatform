package com.yanzong.domain;

import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Grade.
 */
@Entity
@Table(name = "cdb_grade")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Grade implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 公司名称
     */
    @ApiModelProperty(value = "公司名称")
    @Column(name = "name")
    private String name;

    /**
     * 市场地位
     */
    @ApiModelProperty(value = "市场地位")
    @Column(name = "scdw")
    private Double scdw;

    /**
     * 杠杆比率
     */
    @ApiModelProperty(value = "杠杆比率")
    @Column(name = "ggbl")
    private Double ggbl;

    /**
     * 利率因素
     */
    @ApiModelProperty(value = "利率因素")
    @Column(name = "llys")
    private Double llys;

    /**
     * 现金流动性
     */
    @ApiModelProperty(value = "现金流动性")
    @Column(name = "xjldx")
    private Double xjldx;

    /**
     * 创收能力
     */
    @ApiModelProperty(value = "创收能力")
    @Column(name = "csnl")
    private Double csnl;

    /**
     * 盈利能力
     */
    @ApiModelProperty(value = "盈利能力")
    @Column(name = "ylnl")
    private Double ylnl;

    /**
     * 客户评级
     */
    @ApiModelProperty(value = "客户评级")
    @Column(name = "khpj")
    private Double khpj;

    /**
     * 所属国家
     */
    @ApiModelProperty(value = "所属国家")
    @Column(name = "country")
    private String country;

    /**
     * 填报时间
     */
    @ApiModelProperty(value = "填报时间")
    @Column(name = "event_time")
    private String eventTime;

    /**
     * db time
     */
    @ApiModelProperty(value = "db time")
    @Column(name = "db_time")
    private ZonedDateTime dbTime;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Grade name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getScdw() {
        return scdw;
    }

    public Grade scdw(Double scdw) {
        this.scdw = scdw;
        return this;
    }

    public void setScdw(Double scdw) {
        this.scdw = scdw;
    }

    public Double getGgbl() {
        return ggbl;
    }

    public Grade ggbl(Double ggbl) {
        this.ggbl = ggbl;
        return this;
    }

    public void setGgbl(Double ggbl) {
        this.ggbl = ggbl;
    }

    public Double getLlys() {
        return llys;
    }

    public Grade llys(Double llys) {
        this.llys = llys;
        return this;
    }

    public void setLlys(Double llys) {
        this.llys = llys;
    }

    public Double getXjldx() {
        return xjldx;
    }

    public Grade xjldx(Double xjldx) {
        this.xjldx = xjldx;
        return this;
    }

    public void setXjldx(Double xjldx) {
        this.xjldx = xjldx;
    }

    public Double getCsnl() {
        return csnl;
    }

    public Grade csnl(Double csnl) {
        this.csnl = csnl;
        return this;
    }

    public void setCsnl(Double csnl) {
        this.csnl = csnl;
    }

    public Double getYlnl() {
        return ylnl;
    }

    public Grade ylnl(Double ylnl) {
        this.ylnl = ylnl;
        return this;
    }

    public void setYlnl(Double ylnl) {
        this.ylnl = ylnl;
    }

    public Double getKhpj() {
        return khpj;
    }

    public Grade khpj(Double khpj) {
        this.khpj = khpj;
        return this;
    }

    public void setKhpj(Double khpj) {
        this.khpj = khpj;
    }

    public String getCountry() {
        return country;
    }

    public Grade country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getEventTime() {
        return eventTime;
    }

    public Grade eventTime(String eventTime) {
        this.eventTime = eventTime;
        return this;
    }

    public void setEventTime(String eventTime) {
        this.eventTime = eventTime;
    }

    public ZonedDateTime getDbTime() {
        return dbTime;
    }

    public Grade dbTime(ZonedDateTime dbTime) {
        this.dbTime = dbTime;
        return this;
    }

    public void setDbTime(ZonedDateTime dbTime) {
        this.dbTime = dbTime;
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
        Grade grade = (Grade) o;
        if (grade.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), grade.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Grade{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", scdw=" + getScdw() +
            ", ggbl=" + getGgbl() +
            ", llys=" + getLlys() +
            ", xjldx=" + getXjldx() +
            ", csnl=" + getCsnl() +
            ", ylnl=" + getYlnl() +
            ", khpj=" + getKhpj() +
            ", country='" + getCountry() + "'" +
            ", eventTime='" + getEventTime() + "'" +
            ", dbTime='" + getDbTime() + "'" +
            "}";
    }
}
