shardingsphere分表

添加依赖：

```xml
<shardingsphere-jdbc.version>5.5.1</shardingsphere-jdbc.version>

<dependency>
    <groupId>org.apache.shardingsphere</groupId>
    <artifactId>shardingsphere-jdbc</artifactId>
    <version>${shardingsphere-jdbc.version}</version>
</dependency>
```



ShardingConfig

```java
package com.hxsy.platform.log.core.config;

import com.alibaba.druid.pool.DruidDataSource;
import com.hxsy.component.common.util.ExceptionUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.shardingsphere.driver.api.ShardingSphereDataSourceFactory;
import org.apache.shardingsphere.infra.algorithm.core.config.AlgorithmConfiguration;
import org.apache.shardingsphere.infra.config.rule.RuleConfiguration;
import org.apache.shardingsphere.sharding.api.config.ShardingRuleConfiguration;
import org.apache.shardingsphere.sharding.api.config.rule.ShardingTableRuleConfiguration;
import org.apache.shardingsphere.sharding.api.config.strategy.sharding.NoneShardingStrategyConfiguration;
import org.apache.shardingsphere.sharding.api.config.strategy.sharding.ShardingStrategyConfiguration;
import org.apache.shardingsphere.sharding.api.config.strategy.sharding.StandardShardingStrategyConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.*;

/**
 * @author <a href="https://fengwenyi.com">Erwin Feng</a>
 * @since 2024-11-13
 */
@Slf4j
@Configuration
@RequiredArgsConstructor
public class ShardingConfig {

    private final HxsyDatasourceConfig hxsyDatasourceConfig;

    @Bean
    public DataSource shardingDataSource() {
        try {
            log.info("shardingConfig: {}", hxsyDatasourceConfig.toString());
            Properties properties = new Properties();
            Map<String, String> props = hxsyDatasourceConfig.getProps();
            if (!CollectionUtils.isEmpty(props)) {
                properties.putAll(props);
            }
            ShardingRuleConfiguration shardingRuleConfig = buildShardingRuleConfig(hxsyDatasourceConfig.getSharding());
            List<RuleConfiguration> ruleConfigList = List.of(shardingRuleConfig);
            return ShardingSphereDataSourceFactory.createDataSource(
                    createDataSourceMap(),
                    ruleConfigList,
                    properties
            );
        } catch (SQLException e) {
            log.error("shardingConfig, exception: {}", ExceptionUtils.getStackTrace(e));
            throw new RuntimeException(e);
        }
    }

    private ShardingRuleConfiguration buildShardingRuleConfig(HxsyDatasourceConfig.Sharding hxsySharding) {
        ShardingRuleConfiguration shardingRuleConfiguration = new ShardingRuleConfiguration();
        shardingRuleConfiguration.setDefaultTableShardingStrategy(buildDefaultShardingStrategy(hxsySharding.getDefaultTableStrategy()));
        shardingRuleConfiguration.setTables(buildShardingTableRuleConfig(hxsySharding.getTables()));
        shardingRuleConfiguration.setShardingAlgorithms(buildAlgorithmConfigurationMap(hxsySharding.getAlgorithm()));
        return shardingRuleConfiguration;
    }

    private Map<String, AlgorithmConfiguration> buildAlgorithmConfigurationMap(Map<String, HxsyDatasourceConfig.Algorithm> algorithmMap) {
        if (CollectionUtils.isEmpty(algorithmMap)) {
            return Collections.emptyMap();
        }
        Map<String, AlgorithmConfiguration> algorithmConfigMap = new HashMap<>();
        for (Map.Entry<String, HxsyDatasourceConfig.Algorithm> algorithmEntry : algorithmMap.entrySet()) {
            HxsyDatasourceConfig.Algorithm algorithmEntryValue = algorithmEntry.getValue();
            AlgorithmConfiguration algorithmConfiguration = new AlgorithmConfiguration(algorithmEntryValue.getType(), algorithmEntryValue.getProps());
            algorithmConfigMap.put(algorithmEntry.getKey(), algorithmConfiguration);
        }
        return algorithmConfigMap;
    }

    private ShardingStrategyConfiguration buildDefaultShardingStrategy(HxsyDatasourceConfig.ShardingStrategyConfig defaultTableStrategyConfig) {
        ShardingStrategyConfiguration shardingStrategyConfiguration = null;
        if ("none".equalsIgnoreCase(defaultTableStrategyConfig.getType())) {
            shardingStrategyConfiguration = new NoneShardingStrategyConfiguration();
        }
        return shardingStrategyConfiguration;
    }

    private List<ShardingTableRuleConfiguration> buildShardingTableRuleConfig(Map<String, HxsyDatasourceConfig.Table> tableMap) {

        List<ShardingTableRuleConfiguration> shardingTableRuleConfigurationList = new ArrayList<>();

        for (Map.Entry<String, HxsyDatasourceConfig.Table> entry : tableMap.entrySet()) {
            HxsyDatasourceConfig.Table value = entry.getValue();
            ShardingTableRuleConfiguration table = new ShardingTableRuleConfiguration(entry.getKey(), value.getActualDataNodes());
            if (StringUtils.hasText(value.getColumn()) && StringUtils.hasText(value.getAlgorithmName())) {
                table.setTableShardingStrategy(new StandardShardingStrategyConfiguration(value.getColumn(), value.getAlgorithmName()));
            }
            shardingTableRuleConfigurationList.add(table);
        }
        return shardingTableRuleConfigurationList;
    }

    private Map<String, DataSource> createDataSourceMap() {

        Map<String, HxsyDatasourceConfig.DataSource> dataSourceConfigMap = hxsyDatasourceConfig.getDataSource();
        if (CollectionUtils.isEmpty(dataSourceConfigMap)) {
            return null;
        }

        Map<String, DataSource> dataSourceMap = new HashMap<>();

        for (Map.Entry<String, HxsyDatasourceConfig.DataSource> entry : dataSourceConfigMap.entrySet()) {
            DruidDataSource dataSource = new DruidDataSource();
//            dataSource.setDriverClassName(entry.getValue().getDriverClassName());
            dataSource.setUrl(entry.getValue().getUrl());
            dataSource.setUsername(entry.getValue().getUsername());
            dataSource.setPassword(entry.getValue().getPassword());
            dataSource.setValidationQuery("SELECT 1");//用来检测连接是否有效
            dataSource.setTestOnBorrow(false);//借用连接时执行validationQuery检测连接是否有效，做了这个配置会降低性能
            dataSource.setTestOnReturn(false);//归还连接时执行validationQuery检测连接是否有效，做了这个配置会降低性能
            //连接空闲时检测，如果连接空闲时间大于timeBetweenEvictionRunsMillis指定的毫秒，执行validationQuery指定的SQL来检测连接是否有效
            dataSource.setTestWhileIdle(true);//如果检测失败，则连接将被从池中去除
            dataSource.setTimeBetweenEvictionRunsMillis(60000);//1分钟
            dataSource.setMaxActive(20);
            dataSource.setInitialSize(5);

            dataSourceMap.put(entry.getKey(), dataSource);
        }

        return dataSourceMap;
    }

}
```



HxsyDatasourceConfig

```java
package com.hxsy.platform.log.core.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.Map;
import java.util.Properties;

/**
 * @author <a href="https://fengwenyi.com">Erwin Feng</a>
 * @since 2024-11-13
 */
@Data
@ConfigurationProperties(prefix = "hxsy")
@Configuration
public class HxsyDatasourceConfig {

    private Map<String, DataSource> dataSource;

    private Map<String, String> props;

    private Sharding sharding;

    private Map<String, Map<String, Properties>> modeConfig;

    @Data
    public static class DataSource {

        private String type;

        private String driverClassName;

        private String url;

        private String username;

        private String password;

    }

    @Data
    public static class Sharding {
        private Map<String, Table> tables;
        private ShardingStrategyConfig defaultTableStrategy;
        private Map<String, Algorithm> algorithm;
    }

    @Data
    public static class Table {
        private String actualDataNodes;
        private String column;
        private String algorithmName;
    }

    @Data
    public static class Algorithm {
        private String type;
        private Properties props;
    }

    @Data
    public static class ShardingStrategyConfig {
        private String type;
        private String name;
    }
}
```



yaml

```yaml
hxsy:
  data-source:
    ds_0:
      type: com.alibaba.druid.pool.DruidDataSource
      driver-class-name: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://obproxy:2883/platform_log?useUnicode=true&characterEncoding=UTF-8&useSSL=false&trackSessionState=true
      username: log
      password: 123456
  sharding:
    tables:
      t_his_request_log:
        actual-data-nodes: "ds_0.t_his_request_log_${202411..202512}"
        column: log_date_time
        algorithm-name: sharding_by_month
      t_his_sync_log:
        actual-data-nodes: "ds_0.t_his_sync_log_${202411..202512}"
        column: log_date_time
        algorithm-name: sharding_by_month
      t_appoint_log:
        actual-data-nodes: "ds_0.t_appoint_log_${202411..202512}"
        column: log_date_time
        algorithm-name: sharding_by_month
      t_medical_log:
        actual-data-nodes: "ds_0.t_medical_log_${202411..202512}"
        column: log_date_time
        algorithm-name: sharding_by_month
      t_patient_card_log:
        actual-data-nodes: "ds_0.t_patient_card_log_${202411..202512}"
        column: log_date_time
        algorithm-name: sharding_by_month
      t_operation_log:
        actual-data-nodes: "ds_0.t_operation_log_${2024..2025}"
        column: log_date_time
        algorithm-name: sharding_by_year
      t_log:
        actual-data-nodes: "ds_0.t_log_${202411..202512}"
        column: log_date_time
        algorithm-name: sharding_by_month
      hc_config:
        actual-data-nodes: "ds_0.hc_config"
    default-table-strategy:
      type: none 
    algorithm:
      sharding_by_month:
        type: INTERVAL
        props:
          "datetime-pattern": "yyyy-MM-dd HH:mm:ss"
          "datetime-lower": "2024-11-01 00:00:00"
          "datetime-upper": "2025-12-31 23:59:59"
          "sharding-suffix-pattern": "yyyyMM"
          "datetime-interval-amount": "1"
          "datetime-interval-unit": "MONTHS"
      sharding_by_year:
        type: INTERVAL
        props:
          datetime-pattern: "yyyy"
          datetime-lower: "2024"
          datetime-upper: "2025"
          sharding-suffix-pattern: "yyyy"
          datetime-interval-amount: 1
          datetime-interval-unit: "YEARS"
```



显示 SQL

```yaml
hxsy:
  props:
    sql-show: true
```

