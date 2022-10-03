# Test 123


```mermaid
erDiagram
    CLASS{
        int    id PK
        string class_name
        string class_code
    }

    STUDENT_TO_CLASS{
        int id PK
        int class_id FK
        int student_id FK 
        int year_id FK
    }

    STUDENT {
        int id PK
        int class_id FK
        string first_name
        string last_name
        date date_of_birth
        string parent_name
        bool gender
    }

    FEES {
        int id PK
        int student_id FK
        int year_id FK
        int total
        int first_installment
        date first_due
        int second_installment
        date second_due
        int third_installment
        date third_due
    }

    SCHOOL_YEAR {
        int id PK
        int sequence_id FK
    }

    SEQUENCE {
        int id PK
        int year_id FK
    }

    SUBJECT {
        int id PK
        int class_id FK
        string name
        string code
    }

    MARK {
        int id PK
        int sequence_id
        int student_id
    }

    ATTENDANCE {
        int id PK
        int class_id FK
        int student_to_class_id FK
        date date
        bool did_attend
        string notes
    }

    TEACHER {
        int id PK
        int subject_id FK
        int class_id FK
        string name
        bool gender
        string phone
    }

    TEACHER_TO_SUBJECT {
        int id PK
        int teacher_id FK
        int subject_id FK
        int class_id FK
        int year_id FK
    }

    
    TEACHER_TO_SUBJECT ||--|| TEACHER : is_taught
    TEACHER_TO_SUBJECT ||--|| SUBJECT : teaches
    TEACHER_TO_SUBJECT ||--|| CLASS : teaches
    TEACHER_TO_SUBJECT ||--|| SCHOOL_YEAR : taught_in
    STUDENT_TO_CLASS ||--|| SCHOOL_YEAR : belongs
    STUDENT_TO_CLASS ||--|| CLASS : belong
    STUDENT ||--|| FEES : pays
    FEES ||--|| SCHOOL_YEAR : belong
    STUDENT ||--|| STUDENT_TO_CLASS : b
    SEQUENCE ||--|| SCHOOL_YEAR : is_part
    SUBJECT ||--|| CLASS : is_taught
    MARK ||--|| STUDENT_TO_CLASS : is_given
    MARK ||--|| SUBJECT : is_given
    MARK ||--|| SEQUENCE : is_given
    ATTENDANCE ||--|| CLASS : belongs
    ATTENDANCE ||--|| STUDENT_TO_CLASS : is_given
```

