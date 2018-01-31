package com.yanzong.service;

import com.yanzong.config.Constants;
import com.yanzong.repository.GradeRepository;
import com.yanzong.repository.UserRepository;
import com.yanzong.repository.YzSchemaTableRepository;
import com.yanzong.repository.YzTableStructRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class SmartReportEntityService {
    private final Logger log = LoggerFactory.getLogger(SmartReportEntityService.class);

    @Autowired
    private YzTableStructRepository yzTableStructRepository;
    @Autowired
    private YzSchemaTableRepository yzSchemaTableRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GradeRepository gradeRepository;

    @Transactional(readOnly = true)
    public List<Object> queryDataByTableName(String tableName) {
        if (tableName == null){
            return null;
        }

        String tn = tableName.trim();
        if (tn.contains(" ")) {
            log.warn("Table name [{}] contains space which is not allowed ", tn);
            return null;
        }

        JpaRepository<?, Long> repo = null;

        switch (tableName) {
            case Constants.TB_YZ_SCHEMA_TABLE:
                repo = yzSchemaTableRepository;
                break;
            case Constants.TB_YZ_TABLE_STRUCT:
                repo = yzTableStructRepository;
                break;
            case Constants.TB_JHI_USER:
                repo = userRepository;
                break;
            case Constants.TB_CDB_GRADE:
                repo = gradeRepository;
                break;
            default:
                break;
        }

        if (repo == null) {
            log.warn("No repository found for {}", tableName);
            return null;
        } else {
            return new ArrayList<>(repo.findAll());
        }
    }
}
