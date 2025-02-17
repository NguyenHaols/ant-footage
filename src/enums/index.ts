export enum DATE_FORMAT {
    DATE_ONLY = 'DD/MM/YYYY',
    FULL = 'HH:mm:ss DD/MM/YYYY',
    DATE_MINUTE = 'HH:mm DD/MM/YYYY',
    MONTH_YEAR = 'MM/YYYY',
    YEAR = 'YYYY',
    DATE_ONLY_REVERSE = 'YYYY/MM/DD',
    MYSQL_TYPE_DATE = 'YYYY-MM-DD',
    REPORT = 'MMMM DD, YYYY',
    DATE_MONTH = 'DD/MM',
    HOUR_MINUTE = 'HH:mm:ss',
}
export enum LOCALE {
    EN = 'en',
    VI = 'vi',
}

export enum ORDER {
    DESC = 'DESC',
    ASC = 'ASC',
}

export enum TYPE_MODAL_USER {
    UPDATE = 'UPDATE',
    CREATE = 'CREATE',
}

export enum TYPE_ACTION {
    CREATE = 'Create',
    UPDATE = 'Update',
}

export enum ENTITY_TYPE {
    ORDER = 'order',
    USER = 'user',
}

export enum SCREEN {
    SM = 576,
    MD = 768,
    LG = 992,
    XL = 1200,
    XXL = 1400,
    XXXL = 1600,
}
